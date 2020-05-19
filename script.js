const URL = 'http://www.omdbapi.com/?apikey=dca61bcc&s=avengers';

document.addEventListener('DOMContentLoaded', fetchData);

async function fetchData() {
	try {
		const res = await fetch(URL);
		const result = await res.json();
		if(result.Response === 'False') {
			throw new Error(result.Error)
		}
		console.log(result)
		let cards = '';
		result.Search.map(movie => {
			cards += `<div class="col-md-4 my-3">
									<div class="card">
										<img src=${movie.Poster} alt="" class="card-img-top">
										<div class="card-body">
											<h5 class="card-title">${movie.Title}</h5>
											<h6 class="card-subtitle mb-2 text-muted">${movie.Year}</h6>
											<a href="#" class="btn btn-dark modal-detail-button" data-toggle="modal" data-target="#movieModalDetail" data-imdbid="${movie.imdbID}">Show Detail</a>
										</div>
									</div>
								</div>`
		})

		document.querySelector('.movie-container').innerHTML = cards;
		const modalDetailButton = document.querySelectorAll('.modal-detail-button');
		modalDetailButton.forEach(btn => {
			btn.addEventListener('click', async function() {
				const imdbId = this.dataset.imdbid
				try {
					const res = await fetch(`http://www.omdbapi.com/?apikey=dca61bcc&i=${imdbId}`);
					const result = await res.json();
					if(result.Response === 'False') {
						throw new Error(result.Error);
					}
					const movieDetail = showMovieDetail(result);
					const modalBody = document.querySelector('.modal-body');
					modalBody.innerHTML = movieDetail;
				} catch (err) {
					alert(err);
				}
			})
		})
	} catch (err) {
		alert(err)
	}
}

function showMovieDetail(result) {
	return `<div class="container-fluid">
		<div class="row">
			<div class="col-md-3">
				<img src=${result.Poster} alt="" class="img-fluid" />
			</div>
			<div class="col-md">
				<ul class="list-group">
					<li class="list-group-item"><h4>${result.Title} ${result.Year}</h4></li>
  				<li class="list-group-item"><strong>Director : </strong>${result.Director}</li>
  				<li class="list-group-item"><strong>Actors : </strong>${result.Actors}</li>
  				<li class="list-group-item"><strong>Writer : </strong>${result.Writer}</li>
  				<li class="list-group-item"><strong>Plot : </strong><br>${result.Plot}</li>
				</ul>
			</div>
		</div>
	</div>`
}
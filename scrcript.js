// const input = document.querySelector(".search-button");
// const Data = document.querySelector(".input");
// input.addEventListener("click", () => {
//   function getData(url, succes, error) {
//     let xhr = new XMLHttpRequest();
//     xhr.onreadystatechange = function () {
//       if (xhr.readyState === 4) {
//         if (xhr.status === 200) {
//           succes(xhr.response);
//         } else if (xhr.status === 404) {
//           error();
//         }
//       }
//     };
//     xhr.open("GET", url);
//     xhr.send();
//   }
//   getData(
//     "http://www.omdbapi.com/?apikey=7df368ab&s=" + Data.value,
//     (result) => {
//       const movie = JSON.parse(result).Search;
//       let cards = "";
//       movie.forEach((el) => {
//         cards += showCard(el);
//       });

//       const container = document.querySelector(".f");
//       $(container).html(cards);
//       // ketika tombol di click
//       $(".button-modal").on("click", function () {
//         getData(
//           "http://www.omdbapi.com/?apikey=7df368ab&i=" + $(this).data("imdbid"),

//           (m) => {
//             console.log(m);
//             const movie = JSON.parse(m);
//             const movieDetail = showModal(movie);
//             const modalBody = document.querySelector(".modal-body");
//             modalBody.innerHTML = movieDetail;
//           },
//           (error) => console.log(error)
//         );
//       });
//     },
//     (error) => make("error")
//   );
// });

// fetch
// const input = document.querySelector(".input");
// const button = document.querySelector(".search-button");
// button.addEventListener("click", function () {
//   fetch("http://www.omdbapi.com/?apikey=7df368ab&s=" + input.value)
//     .then((resolve) => resolve.json())
//     .then((resolve) => {
//       const movies = resolve.Search;
//       console.log(movies);
//       const containerCards = document.querySelector(".f");
//       let cards = "";
//       movies.forEach((el) => {
//         cards += showCard(el);
//       });

//       containerCards.innerHTML = cards;
//       const buttonModal = document.querySelectorAll(".button-modal");

//       buttonModal.forEach((b) => {
//         b.addEventListener("click", function () {
//           const id = this.dataset.imdbid;
//           fetch("http://www.omdbapi.com/?apikey=7df368ab&i=" + id)
//             .then((response) => response.json())
//             .then((el) => {
//               const movieDetail = showModal(el);
//               const modalBody = document.querySelector(".modal-body");
//               modalBody.innerHTML = movieDetail;
//             });
//         });
//       });
//     });
// });

const button = document.querySelector(".search-button");

button.addEventListener("click", async function () {
  try {
    const input = document.querySelector(".input");
    const movies = await getMovies(input.value);
    updateUi(movies);
  } catch (err) {
    alert(err);
  }
});

function updateUi(movies) {
  let cards = "";
  movies.forEach((el) => {
    cards += showCard(el);
  });
  const container = document.querySelector(".f");
  container.innerHTML = cards;
}

function getMovies(input) {
  return fetch("http://www.omdbapi.com/?apikey=7df368ab&s=" + input)
    .then((m) => {
      if (!m.ok) {
        throw new Error(m.statusText);
      }
      return m.json();
    })
    .then((m) => {
      if (m.Response === "False") {
        throw new Error(m.Error);
      }
      return m.Search;
    });
}

// modal box ////////////////////////////////
document.addEventListener("click", async function (e) {
  if (e.target.classList.contains("button-modal")) {
    const id = e.target.dataset.imdbid;
    const movie = await getModal(id);
    updateModal(movie);
  }
});
function updateModal(movie) {
  const modal = showModal(movie);
  const modalBody = document.querySelector(".modal-body");
  modalBody.innerHTML = modal;
}
function getModal(id) {
  return fetch("http://www.omdbapi.com/?apikey=7df368ab&i=" + id)
    .then((movie) => movie.json())
    .then((movie) => movie);
}

function showCard(el) {
  return `<div class="col-md-4 my-5">
<div class="card">
  <img src="${el.Poster}" class="card-img-top" />
  <div class="card-body">
    <h5 class="card-title">${el.Title}</h5>
    <h6 class="card-subtitle mb-2 text-muted">${el.Year}</h6>
    <a href="#" class="btn btn-primary button-modal" data-bs-toggle="modal" data-bs-target="#movieDetailModal" data-imdbid="${el.imdbID}">show details</a>
  </div>
</div>
</div>`;
}

function showModal(movie) {
  return `<div class="container-fluid">
          <div class="row">
            <div class="col-md-3">
              <img src="${movie.Poster}" alt="" class="img-fluid" />
            </div>
            <div class="col-md">
              <ul class="list-group">
                <li class="list-group-item"><h4>${movie.Title}</h4></li>
                <li class="list-group-item"><strong>Director : ${movie.Director}</strong></li>
                <li class="list-group-item"><strong>Actors :</strong> ${movie.Actors}</li>
                <li class="list-group-item"><strong>Writer</strong> ${movie.Writer}</li>
                <li class="list-group-item">
                  <strong>Plot :</strong> <br /> ${movie.Plot}
                </li>
              </ul>
            </div>
          </div> 
        </div>`;
}

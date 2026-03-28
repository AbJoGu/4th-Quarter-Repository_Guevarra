const ratingElement = [
    document.getElementById("star1"),
    document.getElementById("star2"),
    document.getElementById("star3"),
    document.getElementById("star4"),
    document.getElementById("star5")
];

const movieListElement = document.getElementById("movieList");
let rating = 0;

function updateStars() {
    for (let i = 0; i < 5; i++) {
        ratingElement[i].querySelector("p").textContent = i < rating ? "⭐" : "✩";
    }
}

function setRating(value) {
    rating = value;
    updateStars();
}

function rateMovie1() { setRating(1); }
function rateMovie2() { setRating(2); }
function rateMovie3() { setRating(3); }
function rateMovie4() { setRating(4); }
function rateMovie5() { setRating(5); }

function addMovieToList(movie) {
    const movieEntry = document.createElement("div");
    movieEntry.className = "movie-entry";
    const stars = '⭐'.repeat(movie.rating) + '✩'.repeat(5 - movie.rating);
    movieEntry.textContent = `${movie.title} (${movie.year}) - ${stars}`;
    movieListElement.appendChild(movieEntry);
}

function renderMovieList() {
    movieListElement.innerHTML = "";
    const movies = JSON.parse(localStorage.getItem("movies")) || [];
    movies.forEach(addMovieToList);
}

function savePrint(event) {
    event.preventDefault();
    const title = document.getElementById("title").value.trim();
    const year = document.getElementById("year").value;
    const genre = document.getElementById("genre").value;
    if (!title || !year || !genre || rating === 0) {
        alert("Please fill all fields and select a rating.");
        return;
    }
    const movie = {
        title: title,
        year: parseInt(year),
        genre: genre,
        rating: rating
    };
    const movies = JSON.parse(localStorage.getItem("movies")) || [];
    movies.push(movie);
    localStorage.setItem("movies", JSON.stringify(movies));
    addMovieToList(movie);
    alert("Movie rated and saved!");

    document.getElementById("title").value = "";
    document.getElementById("year").value = "";
    document.getElementById("genre").value = "action";
    rating = 0;
    updateStars();
}

window.addEventListener("DOMContentLoaded", () => {
    updateStars();
    renderMovieList();
});

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
        ratingElement[i].querySelector("p").textContent =
            i < rating ? "⭐" : "✩";
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

function addMovieToList(movie, index) {
    const movieEntry = document.createElement("div");
    movieEntry.className = "movie-entry";

    const avgRating = (movie.totalRating / movie.ratingCount).toFixed(1);
    const stars =
        "⭐".repeat(Math.round(avgRating)) +
        "✩".repeat(5 - Math.round(avgRating));

    movieEntry.innerHTML = `
        ${movie.title} (${movie.year}) - ${movie.genre},
        Rating: ${stars}
        <button onclick="deleteMovie(${index})">Delete</button>
    `;

    movieListElement.appendChild(movieEntry);
}

function renderMovieList() {
    movieListElement.innerHTML = "";
    const movies = JSON.parse(localStorage.getItem("movies")) || [];

    movies.forEach((movie, index) => {
        addMovieToList(movie, index);
    });
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

    const movies = JSON.parse(localStorage.getItem("movies")) || [];


    const existingMovie = movies.find(
        movie => movie.title.toLowerCase() === title.toLowerCase()
    );

    if (existingMovie) {
        existingMovie.totalRating += rating;
        existingMovie.ratingCount += 1;
    } else {
        // ADD NEW MOVIE
        movies.push({
            title: title,
            year: parseInt(year),
            genre: genre,
            totalRating: rating,
            ratingCount: 1
        });
    }

    localStorage.setItem("movies", JSON.stringify(movies));
    renderMovieList();

    alert("Movie rated and saved!");

    document.getElementById("title").value = "";
    document.getElementById("year").value = "";
    document.getElementById("genre").value = "action";
    rating = 0;
    updateStars();
}


function deleteMovie(index) {
    const confirmDelete = confirm("Are you sure you want to delete?");
    if (confirmDelete) {
        const movies = JSON.parse(localStorage.getItem("movies")) || [];
        movies.splice(index, 1);   // removes ONE movie
        localStorage.setItem("movies", JSON.stringify(movies));
        renderMovieList();
    }
}
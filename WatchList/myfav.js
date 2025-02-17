// Open and hide side menu
var sideOption = document.getElementById("side");
function showMenu() {
  sideOption.style.left = "0";
}
function hideMenu() {
  sideOption.style.left = "-300px";
}

// API details
const API_KEY = "api_key=fa3281c3198c2cbc12dd79f84b17bf07";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";
const BASE_URL = "https://api.themoviedb.org/3";

// Get favorite movies from localStorage
var storageData = localStorage.getItem("MovieArray");
var favMovieArray = JSON.parse(storageData) || [];

// Fetch and display each favorite movie
favMovieArray.forEach(async (id) => {
  let link = `/movie/${id}?language=en-US&`;
  let url = BASE_URL + link + API_KEY;
  await apiCall(url, id);
});

// API call function
function apiCall(url, id) {
  const x = new XMLHttpRequest();
  x.open("get", url);
  x.send();
  x.onload = function () {
    var jsonRes = JSON.parse(x.response);
    favMovieData(jsonRes, id);
  };
}

// Function to display favorite movies with review section
function favMovieData(jsonResp, id) {
    var eachListItem = document.createElement('div');
    eachListItem.classList.add('list-item');
    
    // Get stored reviews
    let storedReviews = JSON.parse(localStorage.getItem('reviews')) || {};
    let movieReview = storedReviews[id] || "";

    eachListItem.innerHTML = `
        <div class="movie-details">
            <div class="thumbnail">
                <a href="../MoviePage/moviePage.html?id=${id}">
                    <img id="movieimg" src="${IMAGE_URL + jsonResp.poster_path}" alt="Thumbnail">
                </a>
            </div>
            <div id="details">
                <div class="title">
                    <a href="moviePage.html?id=${id}">${jsonResp.title}</a>
                </div>
                <div class="remove-movie" id="${id}" onclick="deleteMovie(${id})">
                    <i id="removeicon" class="far fa-trash-alt"></i>
                </div>
            </div>

            <!-- Review Section -->
            <div class="review-section">
                <textarea id="review-${id}" class="review-input" placeholder="Add your review..." style="${movieReview ? 'display: none;' : 'display: block;'}">${movieReview}</textarea>
                <button id="review-btn-${id}" class="review-btn" onclick="saveReview(${id})" style="${movieReview ? 'display: none;' : 'display: block;'}">Submit</button>
                <p class="review-text" id="display-review-${id}">${movieReview ? "Your Review: " + movieReview : ""}</p>
            </div>
        </div>
    `;

    document.getElementById('list-container').appendChild(eachListItem);
}


// Function to save review to localStorage
function saveReview(id) {
  let reviewText = document.getElementById(`review-${id}`).value;
  let reviews = JSON.parse(localStorage.getItem("reviews")) || {};
  reviews[id] = reviewText;
  localStorage.setItem("reviews", JSON.stringify(reviews));

  // Hide text area and button, show the review text
  document.getElementById(`review-${id}`).style.display = "none";
  document.getElementById(`review-btn-${id}`).style.display = "none";
  document.getElementById(`display-review-${id}`).innerText =
    "Your Review: " + reviewText;
}

// Clear all favorite movies and reviews
document
  .getElementById("clear-whole-list")
  .addEventListener("click", function () {
    if (window.confirm("Clear All Favorite Movie List")) {
      localStorage.removeItem("MovieArray");
      localStorage.removeItem("reviews");
      window.location.reload();
    }
  });

// Delete single movie from favorites
async function deleteMovie(id) {
  if (window.confirm("Delete this Movie from Favorite List")) {
    var temp = JSON.parse(localStorage.getItem("MovieArray"));
    var i = temp.indexOf(id.toString());
    temp.splice(i, 1);
    localStorage.setItem("MovieArray", JSON.stringify(temp));

    // Remove review from localStorage
    let reviews = JSON.parse(localStorage.getItem("reviews")) || {};
    delete reviews[id];
    localStorage.setItem("reviews", JSON.stringify(reviews));

    window.location.reload();
  }
}

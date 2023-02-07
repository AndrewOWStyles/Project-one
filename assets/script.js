let searchBtn = document.querySelector("#search-button")
let searchInput = document.getElementById("search-text");
const searchBox = document.getElementById("imgText");
let searchTerm = searchBox.value;
let jobsArea = document.getElementById("princeColor");
const url = "https://pixabay.com/api/?key=";
const apiKey = "33299072-c6d09cbcb29cf3d5fcf4e9d15&q=";
let apiKeyJobs = "99a4e0e7&app_key=854849cfbeff94c09ce8edea5ae2ea2a";
const imageType = "&image_type=photo";
const imageDiv = document.querySelector("#imageArea");
let images = document.querySelector("#images");
let index = 0;
let imageTimeout;

// function linked to HTML button. on click take input value in searchTerm and calls fetchImage().
function imgSearch() {
  searchTerm = searchBox.value;
  index = 0;
  fetchImage();
  // carousel buttons load into the page as display: none, this targets the buttons through a loop and sets the to visible.
  let caraBtn = document.getElementsByClassName("carouselBtn");
  for (var i = 0; i < caraBtn.length; i++) {
    caraBtn[i].style.display = "inline-block";
  }

}

// image fetch functions, makes a request to the api by combining the 4 variables to make the url and passes the response to the createImage function.
function fetchImage() {
  let queryURL = url + apiKey + searchTerm + imageType;
  fetch(queryURL)
    .then((response) => response.json())
    .then((data) => {
      console.log(queryURL);
      console.log(data);
      createImage(data.hits);
    });
}

// uses data from the promise to display the image from the api. 
function createImage(hits) {
  images.innerHTML = "";
  let img = document.createElement("img");
  // first image is the first one from the returned array.
  img.src = hits[index].webformatURL;
  // img class added to the generated image and images appended to the imageDiv.
  img.classList.add("img");
  images.appendChild(img);
  imageDiv.append(images);

  // button to go to the next item in an array. clears timeout using imageTimeout.
  document.querySelector("#next").addEventListener("click", function () {
    clearTimeout(imageTimeout);
    // if the index is equal to the last item in the array it resets the array to the first item, if not it goes to the next item.
    if (index === hits.length - 1) {
      index = 0;
    } else {
      index++;
    }
    imageTimeout = setTimeout(() => createImage(hits), 500);
  });
}

// button to go to a previous item in an array. clears timeout using imageTimeout.
document.querySelector("#prev").addEventListener("click", function () {
  clearTimeout(imageTimeout);
  // if the index is 0 it sets the current item to the last of the array, if not it goes to the previous item.
  if (index === 0) {
    index = hits.length - 1;
  } else {
    index--;
  }
  imageTimeout = setTimeout(() => createImage(hits), 500);
});

//Prince's code
let searchQuerryUrl = "https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=36e59f90&app_key=70ad6f78f2c44754114265af2caed74f";
let myJobResult = fetch(searchQuerryUrl)
  .then((response) => response.json())
  .then(jobResult => {
    console.log(jobResult.results[0])

    let companyName = jobResult.results[0].company.display_name
    console.log(companyName)
    let { display_name } = jobResult.results[0].location;
    console.log(display_name)


    let resultElement = document.createElement("div");
    resultElement.textContent = JSON.stringify(jobResult.results[0].company.display_name);

    document.getElementById("princeColor").append(resultElement);


  })


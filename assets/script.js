
let searchBtn = document.querySelector("#search-button")
let searchInput = document.getElementById("search-text");
let jobsArea = document.getElementById("princeColor");
const url = "https://pixabay.com/api/?key=";
const apiKey = "33299072-c6d09cbcb29cf3d5fcf4e9d15&q=";
let apiKeyJobs = "99a4e0e7&app_key=854849cfbeff94c09ce8edea5ae2ea2a";
const imageType = "&image_type=photo";
const imageDiv = document.querySelector("#imageArea");
let imgInput = document.querySelector("#imgInput");
const imgBtn = document.querySelector("#imgBtn");
let images = document.querySelector("#images");
let index = 0;
let imageTimeout;
let nextBtn = document.querySelector("#next");
let prevBtn = document.querySelector("#prev");
let displayCardsArr = [];

// function linked to HTML button. on click take input value in searchTerm and calls fetchImage().
function imgSearch() {
  searchTerm = searchInput.value;
  index = 0;
  fetchImage();
  let imgDiv = document.querySelector("#imgDiv")
  imgDiv.style.visibility = "visible";
  // carousel buttons load into the page as display: none, this targets the buttons through a loop and sets the to visible. 
  let caraBtn = document.getElementsByClassName("carouselBtn");
  for (var i = 0; i < caraBtn.length; i++) {
    caraBtn[i].style.visibility = "visible";
  }
}
  
function secondImgSearch() {
  searchTerm = imgInput.value;
  index = 0;
  fetchImage();
  imgInput.value = ""
}

// image fetch functions, makes a request to the api by combining the 4 variables to make the url and passes the response to the createImage function.
function fetchImage() {
  let queryURL = url + apiKey + searchTerm + imageType;
  fetch(queryURL)
  .then((response) => response.json())
  .then((data) => {
    // console.log(queryURL);
    // console.log(data);
    hits = data.hits
    createImage(hits);
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
      nextBtn.addEventListener("click", function () {
        clearTimeout(imageTimeout);
        // if the index is equal to the last item in the array it resets the array to the first item, if not it goes to the next item.
        if (index === hits.length - 1) {
          index = 0;
        } else {
          index++;
        }
        imageTimeout = setTimeout(() => createImage(hits), 500);
      });
      
      // button to go to a previous item in an array. clears timeout using imageTimeout.
      prevBtn.addEventListener("click", function () {
        clearTimeout(imageTimeout);
        // if the index is 0 it sets the current item to the last of the array, if not it goes to the previous item.
        if (index === 0) {
          index = hits.length - 1;
        } else {
          index--;
        }
    imageTimeout = setTimeout(() => createImage(hits), 500);
  });
}
  
  //Display company name from the first object of the search results
  let searchQuerryUrl = "https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=36e59f90&app_key=70ad6f78f2c44754114265af2caed74f";
  let myJobResult = fetch(searchQuerryUrl)
  .then((response) => response.json())
  .then(jobResult => {
    // console.log(jobResult.results[0])
    
    let companyName = jobResult.results[0].company.display_name
    // console.log(companyName)
    let { display_name } = jobResult.results[0].location;
    // console.log(display_name)
    
    
    let resultElement = document.createElement("div");
    resultElement.textContent = JSON.stringify(jobResult.results[0].company.display_name);
    
    document.getElementById("princeColor").append(resultElement);

  })

//Funtion to search the api for jobs
function fetchResults() {

  //Function to generate random page numbers
  function randomPageNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
  }

  //Variable for using page number generator
  let pageNumber = randomPageNumber(1, 10);

  // console.log(pageNumber);

  //Build the url for the job search api
  let searchQuerryUrl = "https://api.adzuna.com/v1/api/jobs/gb/search/"
    + pageNumber
    + "?app_id="
    + apiKeyJobs
    + "&results_per_page=10"
    + "&what="
    + searchTerm

  //Fetch the job search results 
  fetch(searchQuerryUrl)
    .then((response) => response.json())
    .then(jobResult => {

      // console.log(jobResult.results)

      //Loop through the results array to retrieve the information for display 
      const searchResults = jobResult.results;
      (searchResults);

      //Retrieve the required properties for display
      for (let i = 0; i < searchResults.length; i++) {
        const element = searchResults[i];
        const { label } = element.category;
        const { display_name } = element.company;
        const { contract_time, contract_type, title, salary_min, salary_max, description, created } = element;
        const { area } = element.location;

        // console.log(title, label, display_name, contract_time, contract_type, salary_min, salary_max, description, created, area);

        //Object to be used for sorting the array prior to display
        // let obj = {
        //   title,
        //   label,
        //   display_name,
        //   salary_min,
        //   area,
        //   description,
        //   contract_time,
        //   contract_type

        // }
        // // console.log(obj)

        // displayCardsArr.push(obj)

        //For loop to be used for sorting
        // for (let i = 0; i < displayCardsArr.length; i++) {
        //   console.log(displayCardsArr[i])

        //Use this area to control how the job results are displayed on the webpage
        //New div element to hold each result
        let resultElement = document.createElement("div");
        //job-search class added to new div
        resultElement.className = "job-search";
        //Job search result properties are placed in paragraphs 
        resultElement.innerHTML =
          `<p>${title} ${label} ${display_name}</p>
          <p>${contract_time} ${contract_type}</p>
          <p>£${salary_min}</p> 
          <p>${area}</p>
          <p>${description}</p>`

        //Append the newly created divs with the job search results into the princeColor area 
        jobsArea.append(resultElement);

        // }

      }
    })
};

//
// console.log(displayCardsArr);
// let result = test.results
let jobSeach = document.querySelectorAll(".job-search")
let filterBtns = document.querySelector("#filter")

//Event listener for sort buttons
filterBtns.addEventListener("click", (event) => {
  event.preventDefault();

  console.log(event.target)
  if (event.target.textContent === "Salary") {
    console.log("yes")
    let cardsArr = document.querySelectorAll(".job-search")
    console.log(cardsArr)
    // dump out the innerhtml

  }
})

// Function to reset search criteria
function clearSearch() {
  jobsArea.innerHTML = "";
}

//Create an event listener for the search button
searchBtn.addEventListener("click", function (event) {
  event.preventDefault();
  //Clear the webpage
  clearSearch()
  // Retrieve the text from the job search input 
  search = searchInput.value
  //Run the image search function
  imgSearch();
  //Retrieve job search results
  fetchResults();
  //Clear the user input on submit
  searchInput.value = '';
})

//Create an event listener for the enter key
searchInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    clearSearch()
    //Uses the job search button to submit user input
    searchBtn.click();
    searchInput.value = '';
  }

})

const searchBox = document.getElementById("imgText")
const url = "https://pixabay.com/api/?key=";
const apiKey = "33299072-c6d09cbcb29cf3d5fcf4e9d15&q=";
let searchTerm = searchBox.value;
const imageDiv = document.querySelector("#imageArea");
let images = document.querySelector("#images")


document.querySelector("#imgButton").addEventListener("click", function (event) {
    event.preventDefault();
    searchTerm = searchBox.value
    console.log(searchTerm);
    fetchImage();
})

function fetchImage() {
    let queryURL = url + apiKey + searchTerm
    fetch(queryURL)
        .then(response => response.json())
        .then(data => {
            console.log(queryURL)
            console.log(data)
            console.log(data.hits[0].largeImageURL)
            imageDiv.innerHTML = ""
            images.innerHTML = `
        <div>
        <img class="img" src="${data.hits[0].largeImageURL}">
        </div>
        `
            imageDiv.append(images)
        })
}




// function fetchJobs() {

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
// }



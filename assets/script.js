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



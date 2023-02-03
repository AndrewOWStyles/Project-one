


let searchQuerryUrl="https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=36e59f90&app_key=70ad6f78f2c44754114265af2caed74f";
let myJobResult=fetch(searchQuerryUrl)
.then((response) => response.json())
.then(jobResult => {console.log(jobResult.results[0])

let companyName=jobResult.results[0].company.display_name
console.log(companyName)
let {display_name}=jobResult.results[0].location;
console.log(display_name)


let resultElement = document.createElement("div");
resultElement.textContent=JSON.stringify(jobResult.results[0].company.display_name);

document.getElementById("princeColor").append(resultElement);


})



const catFactButton = document.getElementById('button');
const catFactsList = document.getElementById('unordered-list');
catFactButton.onclick = function () { getCatFactOnClick(); };
async function getCatFactOnClick() {
    const paragraph = document.getElementById("list-paragraph");
    paragraph.style.visibility = "visible";
    // create a new list element, which will hold the retrieved cat fact
    const catFact = document.createElement('li');
    // fetch json data from the API
    const response = await fetch('https://catfact.ninja/fact');
    const jsonData = await response.json();
    // set the text of the list element to be the retrieved json data
    catFact.textContent = jsonData.fact;
    catFactsList.appendChild(catFact);
}

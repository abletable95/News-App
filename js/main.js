fetch(
        'https://content.guardianapis.com/search?q=trending&show-tags=all&page-size=20&show-fields=all&order-by=relevance&api-key=5ef33414-1934-47dc-9892-5d09ab7c00da'
    )
    .then(response => response.json())
    .then(response => console.log(response));

/* let input = document.getElementsByClassName('searchBar')[0];
console.log(input);
input.addEventListener("input", (e) => {

    console.log(e.inputType)
}) */

/* const dropper = document.getElementsByClassName('dropperBtn')[0];
const menu = document.getElementsByClassName('menu')[0];
dropper.addEventListener('mouseover', () => menu.style.display = 'block') */
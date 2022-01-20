const input = document.getElementsByClassName('searchBar')[0];
const searchBtn = document.getElementsByClassName('searchBtn')[0];
const searchResultsBox = document.getElementsByClassName('searchResults')[0];
const navBar = document.getElementById('navBar');
const burger = document.getElementById('burger');
const article = document.getElementsByClassName('articleHold')[0];
// const articlesBox = document.getElementsByClassName('articlesBox')[0];
const year = document.getElementsByClassName('year')[0];
const scrollTopBtn = document.getElementsByClassName('scrollTopBtn')[0];
const actualYear = new Date().getFullYear();
const body = document.querySelector('body');
const loader = document.getElementsByClassName('loader')[0];
const menu = document.getElementsByClassName('menu')[0];
year.innerHTML = actualYear;

//link handle

let articleLink = window.location.search.substring(1);

// Menu handling

burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    navBar.classList.toggle('active')
})

// request news
function requestNews() {
    loaderSpinner()
    fetch(
            `https://content.guardianapis.com/${articleLink}?show-fields=all&api-key=5ef33414-1934-47dc-9892-5d09ab7c00da`
        )
        .then(response => response.json())
        .then(response => {
            console.log(response.response)
            createMainArticle(response.response.content)
            loaderSpinner()
        });
}
requestNews()



function createMainArticle(item) {
    article.innerHTML = `<div class="mainImage">
    <img src="${item.fields.thumbnail}" alt="image">
</div>
<div class="articleText">
    <div class="title">
        <h1>${item.fields.headline}</h1>
        <span>Written by ${item.fields.byline}</span>
        <span>${getDays(item.webPublicationDate)} days ago</span>
    </div>
    <div class="text">${item.fields.body}</div>
</div>`

}

function getDays(inputDate) {
    inputDate = Date.parse(inputDate);
    let actualDate = new Date();
    let days = actualDate.getTime() - inputDate;
    return Math.floor(days / 1000 / 60 / 60 / 24)
}

//Scroll to top
let scrollInProcess = 0;
window.addEventListener("scroll", () => {
    if (window.pageYOffset > body.clientHeight - window.innerHeight - 40 && !scrollInProcess) {
        scrollTopBtn.classList.add("activeScroll");
    } else if (!scrollInProcess) {
        scrollTopBtn.classList.remove("activeScroll");
    } else if (!window.pageYOffset) {
        scrollInProcess = 0;
        scrollTopBtn.classList.remove("activeScroll")
    }
})

scrollTopBtn.addEventListener('click', () => {
    scrollInProcess = 1;
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
})

//search



input.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
        submitSearch()
    }
});

searchBtn.addEventListener('click', submitSearch);
input.addEventListener('search', (e) => {
    if (input.value == '') {
        searchResultsBox.innerHTML = '';
        let marks = document.getElementsByClassName('count');
        console.log(marks)
        for (let i = 0; i < marks.length; i++) {
            marks[i].classList.add('killMark')
            console.log(5)
        }
    }
});


function submitSearch() {
    let counter = 0;
    let searchText = input.value.trim();
    let textToSearchIn = document.querySelectorAll('p');
    for (let i = 0; i < textToSearchIn.length; i++) {
        if (input.value !== '') {
            let regExp = new RegExp(searchText, 'gi');
            textToSearchIn[i].innerHTML = (textToSearchIn[i].textContent).replace(regExp, '<mark class="count">$&</mark>');
        }
    }
    let count = document.querySelectorAll('.count').length;
    counter = count;
    searchResultsBox.innerHTML = `<span>Совпадений:${counter}</span>`
}



//Loader#######
function loaderSpinner() {
    loader.classList.toggle('loading');
}
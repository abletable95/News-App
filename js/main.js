const input = document.getElementsByClassName('searchBar')[0];
const searchBtn = document.getElementsByClassName('searchBtn')[0];
const searchResultsBox = document.getElementsByClassName('searchResults')[0];
const navBar = document.getElementById('navBar');
const burger = document.getElementById('burger');
const mainArticle = document.getElementsByClassName('mainArticle')[0];
const articlesBox = document.getElementsByClassName('articlesBox')[0];
const year = document.getElementsByClassName('year')[0];
const scrollTopBtn = document.getElementsByClassName('scrollTopBtn')[0];
const actualYear = new Date().getFullYear();
const body = document.querySelector('body');
const loader = document.getElementsByClassName('loader')[0];
const menu = document.getElementsByClassName('menu')[0];
const trendingBtn = document.getElementsByClassName('trendingBtn')[0];
year.innerHTML = actualYear;

// Menu handling

burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    navBar.classList.toggle('active')
})

// request news
function requestNews(category, action, amount) {
    loaderSpinner()
    fetch(
            `https://content.guardianapis.com/search?q=${category}&show-tags=all&page-size=${amount}&show-fields=all&order-by=relevance&api-key=5ef33414-1934-47dc-9892-5d09ab7c00da`
        )
        .then(response => response.json())
        .then(response => {
            sortByDate(response.response.results);
            action(response.response.results)
            loaderSpinner()
        });
}
requestNews('trending', createArticles, 19)

function sortByDate(newsArr) {
    newsArr.sort((a, b) => {
        return Date.parse(b.webPublicationDate) - Date.parse(a.webPublicationDate)
    })
}

function createArticles(news) {
    createMainArticle(news[0])
    articlesBox.innerHTML = '';
    restNews = news.filter(item => {
        if (item != news[0]) return item
    });
    restNews.map(item => {
        let box = document.createElement('article');
        box.classList.add('article');
        box.innerHTML =
            `<a href="article.html?${item.id}" class="articleImage">
            <img src="${item.fields.thumbnail}" alt="Image">
        </a>
        <div class="articleText">
            <a href="article.html?${item.id}" class="articleTitle  linkReset">
                <h3>${item.fields.headline}</h3>
            </a>
            <p>${item.fields.trailText}...</p>
            <div class="articleFooter">
                <span>${getDays(item.webPublicationDate)} days ago</span>
                <a href="article.html?${item.id}" class="linkReset">Read more</a>
            </div>
        </div>`;
        articlesBox.appendChild(box)
    })

}

function createMainArticle(item) {
    mainArticle.innerHTML =
        `<article class="mainText">
        <a href="article.html?${item.id}" class="mainTitle linkReset">
            <h2>${item.fields.headline}</h2>
        </a>
        <p>${item.fields.trailText}...</p>
        <div class="articleFooter">
            <span>${getDays(item.webPublicationDate)} days ago</span>
            <a href="article.html?${item.id}" class="linkReset">Read more</a>
        </div>
    </article>
    <a href="article.html?${item.id}" class="mainImage">
        <img src="${item.fields.thumbnail}" alt="Image">
    </a>`;

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
        searchResultsBox.innerHTML = ''
    }
});

function submitSearch() {
    let searchText = input.value.trim().replace(/ /ig, '%20');
    if (input.value !== '') {
        requestNews(`"${searchText}"`, handleSearhResults, 10)
    }
}

function handleSearhResults(results) {

    if (results.length) {
        searchResultsBox.innerHTML = '';
        results.map(item => {
            let link = document.createElement('li')
            link.innerHTML =
                `<a href="article.html?${item.id}" class="linkReset">
                <h4>${item.fields.headline}</h4>
                <span>${item.fields.trailText}...</span>
            </a>`
            searchResultsBox.appendChild(link)
        })
    } else {
        searchResultsBox.innerHTML = '<li>No exact matches found</li>';
    }
}

//Loader#######
function loaderSpinner() {
    loader.classList.toggle('loading');
}
//menu in header

menu.addEventListener('click', (e) => {
    let category = e.target.innerText.trim().toLowerCase();
    requestNews(category, createArticles, 19)
})

trendingBtn.addEventListener('click', () => {

    requestNews('trending', createArticles, 19)
})
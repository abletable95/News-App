/* let input = document.getElementsByClassName('searchBar')[0];
console.log(input);
input.addEventListener("input", (e) => {

    console.log(e.inputType)
}) */
let category = '';
let navBar = document.getElementById('navBar');
let burger = document.getElementById('burger');
const mainArticle = document.getElementsByClassName('mainArticle')[0];
const articlesBox = document.getElementsByClassName('articlesBox')[0];
const year = document.getElementsByClassName('year')[0];
const actualYear = new Date().getFullYear();
year.innerHTML = actualYear;
// Menu handling
burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    navBar.classList.toggle('active')
})

// request news
function requestNews(category) {
    fetch(
            `https://content.guardianapis.com/search?q=${category}&show-tags=all&page-size=20&show-fields=all&order-by=relevance&api-key=5ef33414-1934-47dc-9892-5d09ab7c00da`
        )
        .then(response => response.json())
        .then(response => {
            sortByDate(response.response.results);
            createArticles(response.response.results)
        });
}
requestNews('sport')

function sortByDate(newsArr) {
    newsArr.sort((a, b) => {
        return Date.parse(b.webPublicationDate) - Date.parse(a.webPublicationDate)
    })
}

function createArticles(news) {
    createMainArticle(news[0])
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
            <a href="article.html?${item.id}" class="articleTitle">
                <h3>${item.fields.headline}</h3>
            </a>
            <p></p>
            <div class="articleFooter">
                <span>${getDays(item.webPublicationDate)} days ago</span>
                <a href="article.html?${item.id}">Read more</a>
            </div>
        </div>`;
        articlesBox.appendChild(box)
    })

}

function createMainArticle(item) {
    console.log(item);
    mainArticle.innerHTML =
        `<article class="mainText">
        <a href="article.html?${item.id}" class="mainTitle">
            <h2>${item.fields.headline}</h2>
        </a>
        <p>${item.fields.trailText}</p>
        <div class="articleFooter">
            <span>${getDays(item.webPublicationDate)} days ago</span>
            <a href="article.html?${item.id}">Read more</a>
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
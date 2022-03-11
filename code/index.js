(function () {
let url = `https://api.spaceflightnewsapi.net/v3/articles?_limit=100`;
let rootElmUl = document.querySelector(`.rootElm-ul`);
let selectOptions = document.querySelector(`#select`);
let erorMesage = document.querySelector(`.error-message`);
let main = document.querySelector(`.main`);


function displayNewsUI(allNews){
    rootElmUl.innerHTML = "";
    allNews.forEach((news) => {
        let li = document.createElement(`li`);
        let imgDiv = document.createElement(`div`);
        imgDiv.classList.add(`img-sec`);
        let img = document.createElement(`img`);
        img.src = news.imageUrl;
        img.alt = news.title;
        imgDiv.append(img);
        let txtDiv = document.createElement(`div`);
        txtDiv.classList.add(`text-sec`);
        let span = document.createElement(`span`);
        let p = document.createElement(`p`);
        let button = document.createElement(`button`);
        let a = document.createElement(`a`);
        span.innerText = news.newsSite;
        p.innerText = news.title;
        a.href = news.url;
        a.innerText = `Read More`;
        button.append(a);
        txtDiv.append(span,p,button);
        li.append(imgDiv,txtDiv);
        rootElmUl.append(li);
    })
}

function handleSpinner (status = false){
    if(status){
        rootElmUl.innerHTML = `<div class="donut"></div>`;
    }
}

function handleErorMessage(message = `Something went wrong`) {
    main.style.display =  "none";
    erorMesage.style.display = "block";
    erorMesage.innerText = message;
}

function displayOptionsUI(optionsData) {
    optionsData.forEach(site => {
        let option = document.createElement(`option`);
        option.value = site;
        option.innerText = site;
        selectOptions.append(option);
    })
};


function init(){
handleSpinner(true);
fetch(url)
  .then((res) => {
    if(res.ok){
        return res.json();
    }else{
        throw new Error (`Response is not ok !!!`)
    }
  })
  .then((newsData) => {
    handleSpinner();
    let filteredNewsData = Array.from(new Set(newsData.map((news) => news.newsSite)));
    displayOptionsUI(filteredNewsData);

    selectOptions.addEventListener(`change`, (event) => {
        let value = event.target.value;
        let arr = newsData;
        arr = arr.filter(news => news.newsSite === value);
        if(value){
            displayNewsUI(arr)
        }else{
            displayNewsUI(newsData);
        }
    })
    displayNewsUI(newsData);
  })
  .catch(error => handleErorMessage(error))
  .finally(() => {
    handleSpinner();
  })
}

if(navigator.onLine){
    init();
}else{
    handleErorMessage(`Check your internet connection!`);
}
})();
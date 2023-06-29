const quoteContainer = document.getElementById('quotecard');
const quoteContent = document.getElementById('quote');
const nameContent = document.getElementById('name');
const twitterTrigger = document.getElementById('twitter');
const instagramTrigger = document.getElementById('instagram');
const refreshQuote = document.getElementById('new');

let quoteApi = [];

//Generate new random quote
function newQuote() {
    const quote = quoteApi[Math.floor(Math.random() * quoteApi.length)];
    
    //Set to 'Unknown' if name field is blank
    if(!quote.author) {
        nameContent.textContent = 'Unknown';
    }

    else{
        nameContent.textContent = quote.author;
    }



    quoteContent.textContent = quote.text;
}
//Fetching quotes from an API
async  function fetchQuotes() {
    const apiUrl = 'https://type.fit/api/quotes'
    //error handling in the event the fetcing fails
//Await ensures that the variable response reamins empty until the data is fetched from the api
try {
    const response = await fetch(apiUrl);
    quoteApi = await response.json();
    newQuote();
} catch (error) {
    console.log('Sorry, our bad!')
}
}

//Tweeting
function tweetQuote() {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${quoteContent.textContent} - ${nameContent.textContent}`;
    window.open(tweetUrl, '_blank');
}

function instaQuote() {
    const caption = `${quoteContent.textContent} - ${nameContent.textContent}`;
    const imageUrl = 'http://news.sponli.com/en/wp-content/uploads/2015/05/09.05.jpg';
    
    const instagramUrl = `https://www.instagram.com/create/post/?caption=${encodeURIComponent(caption)}&url=${encodeURIComponent(imageUrl)}`;
    window.open(instagramUrl, '_blank');
  }
  

//Buttons functionality
refreshQuote.addEventListener('click', newQuote);
twitterTrigger.addEventListener('click', tweetQuote);
instagramTrigger.addEventListener('click', instaQuote);


//Executes when the page finish to load, restricted by async
fetchQuotes();
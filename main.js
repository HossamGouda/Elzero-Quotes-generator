// Select DOM elements
const generateBtn = document.querySelector(".generate"); // Button to generate a quote
const autoBtn = document.querySelector(".auto"); // Button to start auto play
const stopBtn = document.querySelector(".stop"); // Button to stop auto play
const quoteDiv = document.querySelector(".quote-display"); // Div to display the quote
const quoteId = document.querySelector(".quote-id"); // Div to display the quote ID
const autoStatus = document.querySelector(".auto-status"); // Div to display auto play status
const cite = document.querySelector("cite");
let intervalId; // Interval ID for auto play

const apiCat = "random";
const api = `https://api.quotable.io/${apiCat}`;

// Fetch quotes from JSON file
async function getQuotes() {
  try {
    let response = await fetch(api);
    // response = false;
    if (response.ok) {
      // console.log(data);
      // console.log(data.content);
      // console.log(data.author);
      const data = await response.json();
      return data;
    } else {
      quoteDiv.innerHTML = "We are sorry we encounter an error , try later";
    }
  } catch (error) {
    console.error("Error fetching quotes:", error);
    throw error;
  }
}

// Generate a random quote
async function generateQuote() {
  try {
    const quotes = await getQuotes();
    // console.log("DATA from generat func:::: -=> ", quotes);
    // const quote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteDiv.innerHTML = quotes.content;
    const id = parseInt(quotes.length);
    cite.innerHTML = `Author :
     ${quotes.author}`;
    // console.log(id);
    quoteId.innerHTML = id;
  } catch (error) {
    console.error("Error generating quote:", error);
    throw error;
  }
}

// Start auto play
function startAutoPlay() {
  try {
    intervalId = setInterval(generateQuote, 2000);
    autoStatus.innerHTML = "Auto: ON";
  } catch (error) {
    console.error("Error starting auto play:", error);
    throw error;
  }
}

// Stop auto play
function stopAutoPlay() {
  try {
    clearInterval(intervalId);
    autoStatus.innerHTML = "";
  } catch (error) {
    console.error("Error stopping auto play:", error);
    throw error;
  }
}

//Assign event handlers to buttons
generateBtn.addEventListener("click", generateQuote);
autoBtn.addEventListener("click", startAutoPlay);
stopBtn.addEventListener("click", stopAutoPlay);

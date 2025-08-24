// const quote = document.getElementById('quote');
// const author = document.getElementById('author');
// const api_url = `https://api.quotable.io/random`;  // 👈 use random endpoint

// async function getquote(url) {
//   const response = await fetch(url);
//   const data = await response.json();
//   console.log(data);

//   // set content and author
//   quote.innerHTML = `"${data.content}"`;
//   author.innerHTML = `— ${data.author}`;
// }

// getquote(api_url);

// function tweet() {
//   window.open(
//     "https://twitter.com/intent/tweet?text=" + quote.innerHTML + " " + author.innerHTML,
//     "Tweet Window",
//     "width=600, height=300"
//   );
// }



const quote = document.getElementById('quote');
const author = document.getElementById('author');

// ✅ API options
const quotable_api = "https://api.quotable.io/random";
const zenquotes_api = "https://zenquotes.io/api/random";

// ✅ Select which API to use (change here)
const api_url = zenquotes_api;  // 👈 abhi ZenQuotes use kar raha hai

async function getquote(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log("API Response:", data);

    // ✅ Handle different APIs
    if (url.includes("zenquotes")) {
      quote.innerHTML = `"${data[0].q}"`;
      author.innerHTML = `— ${data[0].a}`;
    } else if (url.includes("quotable")) {
      quote.innerHTML = `"${data.content}"`;
      author.innerHTML = `— ${data.author}`;
    }
  } catch (error) {
    console.error("Error fetching quote:", error);
    quote.innerHTML = "Failed to load quote 😢";
    author.innerHTML = "";
  }
}

// Page load pe call
getquote(api_url);

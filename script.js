const jokeButton = document.getElementById("button");
const jokeCategory = document.getElementById("joke_category");
const jokeText = document.getElementById("joke_text");
const jokeContainer = document.getElementById("joke_container");
const footer = document.getElementById("footer");

let currDate = new Date();
let currYear = currDate.getFullYear();

footer.innerHTML = `Coded & Designed by &copy; Anoop ${currYear}<br>The joke content is being retrieved from the <a href="https://sv443.net/jokeapi/v2/">Random Joke API</a>`;

function getTheJoke() {
  fetch("https://sv443.net/jokeapi/v2/joke/Any")
    .then((res) => res.json())
    .then((res) => {
      if (res.type === "single") {
        jokeCategory.innerHTML = res.category;
        jokeText.innerText = res.joke;
      } else if (res.type === "twopart") {
        jokeCategory.innerHTML = res.category;
        jokeText.innerHTML = `<u>Person 1</u> : ${res.setup}<br><br><u>Person 2</u> : ${res.delivery}`;
      }
    })
    .then(() => {
      jokeContainer.style.display = "block";
    })
    .catch(() => {
      jokeContainer.style.display = "block";
      jokeCategory.innerText = "Error ⚠";
      jokeText.innerText = "Problem in Retreiving 🙁 Try again !!";
    });
}

jokeButton.addEventListener("click", getTheJoke);

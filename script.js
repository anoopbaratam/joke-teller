const jokeButton = document.getElementById("button");
const jokeCategory = document.getElementById("joke_category");
const jokeText = document.getElementById("joke_text");
const jokeContainer = document.getElementById("joke_container");

const footer = document.getElementById("footer");
let currDate = new Date();
let currYear = currDate.getFullYear();

footer.innerHTML = `Coded & Designed by &copy; Anoop ${currYear}<br>The joke content is being retrieved from the <a href="https://sv443.net/jokeapi/v2/">Random Joke API</a><br>It is to be that the content being retrieved was entirely out of my control and I request you to ignore anything which you feel was not funny or lame`;

const programmingBox = document.getElementById("programming");
const miscBox = document.getElementById("miscellaneous");
const darkBox = document.getElementById("dark");
const punBox = document.getElementById("pun");

const boxes = [programmingBox, miscBox, darkBox, punBox];

function getTheJoke() {
  const values = [];

  let initialURL = "https://sv443.net/jokeapi/v2/joke/";

  function updateValues() {
    for (let box of boxes) {
      if (box.checked) {
        values.push(box.value);
      }
    }
  }

  updateValues();

  let stringOfValues = values.join(",");

  var finalURL = `${initialURL}${stringOfValues}`;

  fetch(finalURL)
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
      jokeText.innerText =
        "Problem in Retreiving 🙁 Ckeck atleast one of the boxes and Try again !!";
    });
}

jokeButton.addEventListener("click", getTheJoke);

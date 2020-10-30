const inputContainer = document.getElementById("input-container");
const countdownForm = document.getElementById("countdownForm");
const dateEl = document.getElementById("date-picker");

let countdownTitle = "";
let countdownDate = "";

// Set date input min with Today's date
const todaysDate = new Date().toISOString().split("T")[0];
dateEl.setAttribute("min", todaysDate);

// Take values from Form input
function updateCountdown(e) {
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    console.log(countdownTitle);
    console.log(countdownDate);
}

// Event listeners
countdownForm.addEventListener("submit", updateCountdown);
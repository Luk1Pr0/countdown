const inputContainer = document.getElementById("input-container");
const countdownForm = document.getElementById("countdownForm");
const dateEl = document.getElementById("date-picker");
const countdownEl = document.getElementById("countdown");
const countdownElTitle = document.getElementById("countdown-title");
const countdownBtn = document.getElementById("date-picker");
const timeElements = document.querySelectorAll("span");

let countdownTitle = "";
let countdownDate = "";
let countdownValue = Date;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Set date input min with Today's date
const todaysDate = new Date().toISOString().split("T")[0];
dateEl.setAttribute("min", todaysDate);

// Populate countdown / Complete UI
function updateDom() {
    const now = new Date().getTime();
    const distance = countdownValue - now;

    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);

    // Populate countdown
    countdownElTitle.textContent = `${countdownTitle}`;
    timeElements[1].textContent = `${days}`;
    timeElements[2].textContent = `${hours}`;
    timeElements[3].textContent = `${minutes}`;
    timeElements[4].textContent = `${seconds}`;

    // Hide input and show countdown
    inputContainer.hidden = true;
    countdownEl.hidden = false;
}

// Take values from Form input
function updateCountdown(e) {
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    // Get number version of current date, update DOM
    countdownValue = new Date(countdownDate).getTime();
    updateDom();
}

// Event listeners
countdownForm.addEventListener("submit", updateCountdown);
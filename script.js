const inputContainer = document.getElementById("input-container");
const countdownForm = document.getElementById("countdownForm");
const dateEl = document.getElementById("date-picker");
const countdownEl = document.getElementById("countdown");
const countdownElTitle = document.getElementById("countdown-title");
const countdownBtn = document.getElementById("countdown-button");
const timeElements = document.querySelectorAll("span");
const completeEl = document.getElementById("complete");
const completeElInfo = document.getElementById("complete-info");
const completeBtn = document.getElementById("complete-button");

let countdownTitle = "";
let countdownDate = "";
let countdownValue = new Date;
let countdownActive;
let savedCountdown = {};

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Set date input min with Today's date
const todaysDate = new Date().toISOString().split("T")[0];
dateEl.setAttribute("min", todaysDate);

// Populate countdown / Complete UI
function updateDom() {
    countdownActive = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownValue - now;

        const days = Math.floor(distance / day);
        const hours = Math.floor((distance % day) / hour);
        const minutes = Math.floor((distance % hour) / minute);
        const seconds = Math.floor((distance % minute) / second);

        // Hide input
        inputContainer.hidden = true;

        // If countdown ended then show complete
        if (distance < 0) {
            countdownEl.hidden = true;
            clearInterval(countdownActive);
            completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
            completeEl.hidden = false;
        } else {
            // Show countdown in progress
            countdownElTitle.textContent = `${countdownTitle}`;
            timeElements[1].textContent = `${days}`;
            timeElements[2].textContent = `${hours}`;
            timeElements[3].textContent = `${minutes}`;
            timeElements[4].textContent = `${seconds}`;
            completeEl.hidden = true;
            countdownEl.hidden = true;
            // Hide input and show countdown
            inputContainer.hidden = true;
            countdownEl.hidden = false;
        }
    }, second)
}

// Take values from Form input
function updateCountdown(e) {
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    savedCountdown = {
        title: countdownTitle,
        date: countdownDate
    };
    localStorage.setItem("countdown", JSON.stringify(savedCountdown));
    // Check for valid date
    if (countdownDate === "") {
        alert("Please select a date");
    } else {
        // Get number version of current date, update DOM
        countdownValue = new Date(countdownDate).getTime();
        updateDom();
    }
}

// Reset all values
function reset() {
    // Hide countdown and display input
    countdownEl.hidden = true;
    completeEl.hidden = true;
    inputContainer.hidden = false;
    // Stop countdown
    clearInterval(countdownActive);
    // Reset countdown values
    countdownTitle = "";
    countdownDate = "";
    localStorage.removeItem("countdown");
}

function restorePreviousCountdown() {
    // Get countdown from local storage
    if (localStorage.getItem("countdown")) {
        inputContainer.hidden = true;
        savedCountdown = JSON.parse(localStorage.getItem("countdown"));
        countdownTitle = savedCountdown.title;
        countdownDate = savedCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDom();
    }
}

// Event listeners
countdownForm.addEventListener("submit", updateCountdown);
countdownBtn.addEventListener("click", reset);
completeBtn.addEventListener("click", reset);
// window.addEventListener("load", restorePreviousCountdown);
restorePreviousCountdown();
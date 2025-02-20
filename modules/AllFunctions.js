// This file will hold all the common function that this application needed 

import { toastEl } from "./Controller.js";


// This is the function that will show the error to the user
function errorModal(value = "Something went wrong", delay = 3) {
    toastEl.querySelector(`.toastText`).textContent = value;
    // To show the toast, use the 'show' method
    toastEl.classList.add('show');
    // After 3 seconds, remove the'show' class to hide the toast
    setTimeout(() => {
        toastEl.classList.remove('show');
    }, delay * 1000);
}

// Get the url after ? mark 
function getURLQuery() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    return params;
}

export {
    errorModal, getURLQuery
};


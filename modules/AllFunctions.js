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



// This function will tack Tue Feb 10 2025 09:00:00 GMT+0530 and give us a date/month/year
function formattedDateHandler(dateString) {
    const dateObj = new Date(dateString);

    const day = dateObj.getDate().toString().padStart(2, '0');  // Get day (DD)
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // Get month (MM)
    const year = dateObj.getFullYear(); // Get year (YYYY)

    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
}


export {
    errorModal, getURLQuery, formattedDateHandler
};


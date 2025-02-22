// This the starting point of this application every thing will start from this file only.
import { Navigation, pageNavigation } from "./Navigation.js";
import { applicationHandler } from "./ProductInfo.js";


const toastEl = document.querySelector(".listToast");
// Info of the user is login in right now
let loginInUser;
// This is the function that will set login value of this application and also do logout
function loginInUserHandler(user) {
    loginInUser = user;
    const logMessage = user ? `${user["user_id"]} is logged in to the application.` : `User logout`;
    console.log(logMessage)
}
// Application state when window is loaded
function init() {
    // Initialize the application with products data
    applicationHandler();

    // This function will check for any event that is happening
    Navigation();

    // Show the page as per the URL scheme
    pageNavigation();
}
window.addEventListener("load", init);


export {
    loginInUser,
    loginInUserHandler, toastEl
};


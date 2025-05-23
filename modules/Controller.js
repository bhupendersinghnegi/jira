// This the starting point of this application every thing will start from this file only.
import { addTaskModalHandler, addTaskSubmitHandler } from "./FormsHandler.js";
import { Navigation, pageNavigation } from "./Navigation.js";
import { calendarInitHandler } from "./Plugins/fromToDate.js";
import { applicationHandler } from "./ProductInfo.js";


const toastEl = document.querySelector(".listToast");
// Info of the user is login in right now
let LOGIN_USER;
// Set the minimum length for search to work
const MIN_SEARCH_LENGTH = 3;
// This is the function that will set login value of this application and also do logout
function loginUserHandler(user) {
    LOGIN_USER = user;
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

    // This is the function that will laod the calender for this application
    calendarInitHandler({
        tag: ".fromToDate",
    });


    // All the from handler start from here
    // Fill the input in the add task module
    addTaskModalHandler();
    const addTaskForm = document.querySelector(".addTaskForm");
    addTaskForm.addEventListener("submit", addTaskSubmitHandler);
}
window.addEventListener("load", init);


export {
    LOGIN_USER,
    loginUserHandler, MIN_SEARCH_LENGTH, toastEl
};


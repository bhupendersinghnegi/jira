// This the starting point of this application every thing will start from this file only.
import { Navigation, pageNavigation } from "./Navigation.js";
import { applicationHandler } from "./PorductInfo.js";


const toastEl = document.querySelector(".listToast");
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


export { toastEl };


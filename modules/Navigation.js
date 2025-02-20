// THis the navigator of the site it will decide which page to show  

import { getURLQuery } from "./AllFunctions.js";
import { pageLoader } from "./ApplicationStructure.js";

// This url is used to track of the last url user have visited
// If user have not visited any page goToHomePage function will send user to home page 
let lastURL = "";
function urlWriting(URL) { 
    const currentURL = "?" + window.location.href.split("?")[1];
    if (URL !== currentURL) {
        const updateURL = URL.toLocaleLowerCase().replace(/\s+/g, " ").replaceAll(" ", "-").replace(/-+/g, '-');
        const setNewUrl = window.location.href.split('?')[0] + `${updateURL}`;
        lastURL = setNewUrl;
        console.log("URL changed:- " + setNewUrl)
        window.history.pushState({ path: setNewUrl }, '', setNewUrl);
    }
}
// URL change by browser This function will be called 
window.addEventListener('popstate', function () {
    pageNavigation(1);
});

// This is the function from all the Event will be handled
async function Navigation() {
    document.addEventListener('click', async function (Event) {
        // Get info from the url and setup the display container
        let URLSetup = getURLQuery();

        const targetElement = Event.target; 
        if (targetElement.closest(".d")) {
        }
    }) 
}

// This function is used to move page from 1 to other page 
function pageNavigation(targetElement) {
    // Window wil start with the top always
    window.scrollTo(0, 0);
    // Get info from the url and setup the display container
    let URLSetup = getURLQuery(); 

    if (Object.keys(URLSetup).length) {
        if (URLSetup.hasOwnProperty("user")) {

        }
    } else {
        pageLoader({ page: "INDEXPAGE" });
    }
}

export {
    Navigation, pageNavigation, urlWriting
};


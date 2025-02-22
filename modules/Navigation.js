// THis the navigator of the site it will decide which page to show  

import { getURLQuery } from "./AllFunctions.js";
import { pageLoader, URL_MAPPING, userIsActiveHandler } from "./ApplicationStructure.js";
import { loginInUser } from "./Controller.js";
import { APPLICATION_DB } from "./ProductInfo.js";

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
        if (targetElement.closest(".navigationLink")) {
            const navigationComponent = targetElement.closest(".navigationComponent");
            const activeLink = navigationComponent.querySelector(".active--link");
            activeLink?.classList.remove("active--link");
            const currentLink = targetElement.closest(".navigationLink");
            currentLink.classList.add("active--link");
            const dataURL = currentLink.dataset.url;
            urlWriting(`?${dataURL}`);
            pageNavigation(targetElement);
        }
    })
}

// This function is used to move page from 1 to other page 
function pageNavigation(targetElement) {
    // Window wil start with the top always
    window.scrollTo(0, 0);

    // Get info from the url and setup the display container
    let URLSetup = getURLQuery();

    // Check if if user is login or not
    // Redirect to the login page is user is not login
    if (!loginInUser || !Object.keys(loginInUser).length) {
        // GO back to the login page
        urlWriting(``)
        pageLoader({ page: "LOGIN_PAGE" });
        return null;
    }

    const rightPage = Object.entries(URL_MAPPING).some(([key, value]) => {
        const { PAGE } = value;
        if (URLSetup.hasOwnProperty(key)) {
            userIsActiveHandler({ user: key });
            pageLoader({ page: PAGE });
            return true;
        }
        return false;
    });

    // If we do not have any page to show the user just go to dashboard
    if (!rightPage) {
        // If user is logged in but trying to go to login page
        userIsActiveHandler({ user: "dashboard" });
        urlWriting(`?dashboard`)
        pageLoader({ page: "DASHBOARD_PAGE" });
        return true;
    }
}

export {
    Navigation, pageNavigation, urlWriting
};


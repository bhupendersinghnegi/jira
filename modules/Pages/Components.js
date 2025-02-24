// All the components that are common in the application

import { URL_MAPPING } from "../ApplicationStructure.js";
import { LOGIN_USER } from "../Controller.js";

// This function will render all the pages that are available
window.navigationHandler = function navigationHandler() {
    return Object.entries(URL_MAPPING).map(([key, value]) => {
        const { SVG_IMAGE, IMAGE_ALT, IS_ACTIVE, PAGE } = value;
        return `<li class="navigation--link navigationLink ${IS_ACTIVE ? `active--link` : ""}" data-page="${PAGE}" data-url="${key}">
            ${SVG_IMAGE}
        </li>`
    }).join("");
}
// This function will render the current user that is loged in right now
window.currentUserHandler = function currentUserHandler() {
    if (!LOGIN_USER) {
        console.log("currentUserHandler:: Please check the user")
        return null;
    }
    return `<div class="loggedInUser">
                    <img src="${browsePath}${LOGIN_USER["profile_picture"]}" alt="${LOGIN_USER["name"]}" width="55" height="55" />
                    <div class="user--details">
                        <h2 class="user--name">${LOGIN_USER["name"]}</h2>
                        <p class="user--role">${LOGIN_USER["role"]}</p>
                    </div>
                </div>`;
}

window.notificationButtonHandler = function notificationButtonHandler() {
    return `<h1>testing</h1>`
}
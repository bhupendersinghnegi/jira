// All the components that are common in the application

import { URL_MAPPING } from "../ApplicationStructure.js";
import { LOGIN_USER } from "../Controller.js";

// This function will render all the pages that are available
window.navigationHandler = function navigationHandler() {
    return Object.entries(URL_MAPPING).map(([key, value]) => {
        const { SVG_IMAGE, TASK_NAME, IS_ACTIVE, PAGE } = value;
        return `<li class="navigation--link navigationLink ${IS_ACTIVE ? `active--link` : ""}" title="${TASK_NAME}" data-page="${PAGE}" data-url="${key}">
            ${SVG_IMAGE}
        </li>`
    }).join("");
}

// Add task option
window.addTaskHandler = function addTaskHandler() {

    if (!LOGIN_USER) {
        console.log("addTaskHandler:: Please check the user")
        return null;
    }
    return `<li class="navigation--link addTask" title="Add Tasks">
                        <img src="${browsePath}add-more.svg" class="img-fluid" alt="${LOGIN_USER["name"]}" width="50" height="50"/>
                    </li>`;
}
// This function will render the current user that is loged in right now
window.currentUserHandler = function currentUserHandler() {
    if (!LOGIN_USER) {
        console.log("currentUserHandler:: Please check the user")
        return null;
    }
    return `<div class="dorpdown">
                <div class="loggedInUser dorpdownHeading">
                    <img src="${browsePath}${LOGIN_USER["profile_picture"]}" alt="${LOGIN_USER["name"]}" width="55" height="55" />
                    <div class="user--details">
                        <h2 class="user--name">${LOGIN_USER["name"]}</h2>
                        <p class="user--role">${LOGIN_USER["role"]}</p>
                    </div>
                </div>
                <div class="dorpdown--menu user">
                    <div class="user--info">
                        <div class="user--profile"> 
                            <img src="${browsePath}${LOGIN_USER["profile_picture"]}" alt="${LOGIN_USER["name"]}" class="user--profile__pic img-fluid" />
                            <div class="editUser btn-primary">
                                <img src="${browsePath}edit-profile.svg" alt="edit user info" class="img-fluid"/>
                            </div>
                        </div>
                        <h2>Hi, ${LOGIN_USER["name"]}</h2>
                    </div>
                    <ul class="application--info list-unset">
                        <li class="policyButton">Privacy Policy</li>
                        <li class="policyButton">Terms of Service</li>
                    </ul>

                    <button class="btn btn-primary userLognout">
                            <img src="${browsePath}logout.svg" alt="edit user info" width="18" height="18" />
                            Longout
                    </button>
                </div>
            </div>`;
}

window.notificationButtonHandler = function notificationButtonHandler() {
    return `<h1>testing</h1>`
}
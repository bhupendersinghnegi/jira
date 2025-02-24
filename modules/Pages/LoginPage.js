import { errorModal } from "../AllFunctions.js";
import { loginUserHandler } from "../Controller.js";
import { pageNavigation, urlWriting } from "../Navigation.js";
import { APPLICATION_DB, APPLICATION_MAPPING, LOGGED_IN_USER } from "../ProductInfo.js";


// This function is used to render current year dynamically
window.currentYearHandler = function currentYearHandler() {
    return new Date().getFullYear();
}
// All the functions are in this page is for login page
window.loginHandler = function loginHandler() {
    const loginForm = document.querySelector(".loginForm");
    if (!loginForm) {
        console.log("LoginForm not found!")
        return null;
    }
    loginForm.removeEventListener("submit", loginSubmitHandler);
    loginForm.addEventListener("submit", loginSubmitHandler);
}
// This is the function that will handle all the error before sending to the next page
function loginSubmitHandler(event) {
    event.preventDefault();
    const userId = document.querySelector(".userId");
    const userIdValue = userId.value ? userId.value : "";
    const userPassword = document.querySelector(".userPassword");
    const userPasswordValue = userPassword.value ? userPassword.value : "";
    if (!userIdValue) {
        return errorModal("User Id can not be empty.");
    }
    if (!userPasswordValue) {
        return errorModal("User password can not be empty.");
    }

    const isUserName = APPLICATION_MAPPING["user_name"].hasOwnProperty(userIdValue);
    const isUserEmail = APPLICATION_MAPPING["user_email"].hasOwnProperty(userIdValue);
    const userKey = isUserEmail ? APPLICATION_MAPPING["user_email"][userIdValue] : APPLICATION_MAPPING["user_name"][userIdValue];
    const isUserPassword = APPLICATION_DB["USERS"].hasOwnProperty(userKey) ? APPLICATION_DB["USERS"][userKey]["password"] : null;
    if ((isUserName || isUserEmail) && isUserPassword === userPasswordValue) {
        // Login the user to the application
        localStorage.setItem(LOGGED_IN_USER, JSON.stringify(userKey));
        loginUserHandler(APPLICATION_DB["USERS"][userKey]);

        // Move to the next page
        urlWriting(`?dashboard`);
        pageNavigation(event.target);
        // pageNavigation, 
        return true;
    }

    return errorModal("Invalid username or password. Please try again.");
}
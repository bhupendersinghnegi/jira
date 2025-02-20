import { errorModal } from "../AllFunctions.js";
import { APPLICATION_DB, APPLICATION_MAPPING } from "../PorductInfo.js";

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
// This is the function that will hendle all the error before sending to the next page
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
        // Move to the next page
        return true;
    }

    return errorModal("Invalid username or password. Please try again.");
}
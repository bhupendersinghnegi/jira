// This is a object based file that will have all the HTML structure of the application

const ContainerSection = document.querySelector(".ContainerSection");

// Key rules
// CLASSSTATUS:true, // true means add, false means remove
// CLASS: ["classesName"] // All classes must be given as array of strings
// FUNCTIONS // Array of functions to load the page that is needed to load
const ApplicationStructure = {
    HEADER: {
        CODE: ``
    },
    INDEXPAGE: {
        CODE: `<section class="login">
                    <form class="loginForm">
                        <h2 class="login--heading">Login</h2>
                        <p class="login--title">Welcome back!</p>
                        <input type="text" class="userId" placeholder="Please enter your name or email address.">
                        <input type="password" class="userPassword" placeholder="Please enter your password">
                        <p class="login--forgot">Forgot Password?</p>
                        <button type="submit" class="btn btn-primary">
                            login now
                            <img src="./images/login-arrow.svg" alt="login arrow" width="30" />
                        </button>
                        <p class="login--copyright">Copyright 2025.  Terms and Conditions Apply</p>
                    </form>
                </section>`,
        CLASSES: [
            {
                SELECTOR: "body",
                CLASSSTATUS: true, // true means add, false means remove
                CLASS: ["login"]
            }
        ],
        FUNCTIONS: [
            "loginHandler" // Do something not handled dynamically
        ]
    },
}

// This function will handle the add or remove class to any element
function classesHandler({ updateClasses }) {
    if (!updateClasses) { return null; }
    updateClasses.forEach(({ SELECTOR, CLASSSTATUS, CLASS }) => {
        const tag = document.querySelector(SELECTOR);
        if (CLASSSTATUS) {
            tag.classList.add(...CLASS);
        } else {
            tag.classList.remove(...CLASS);
        }
    });
}

// This is tha page that is needed to perform the task that are needed to done
function callFunctionsHandler({ callFunctions }) {
    if (!callFunctions) { return null; }
    callFunctions.forEach(functionName => {
        const functionToCall = window[functionName];
        if (typeof functionToCall === "function") {
            functionToCall();
        } else {
            console.log(`${functionName} is not a function`)
        }
    });
}

// This function will handle the HTML structure of the application
function HTMLHandler({ page }) {
    let HTML = ApplicationStructure[page]["CODE"];
    const updateClasses = ApplicationStructure[page]["CLASSES"];
    updateClasses && classesHandler({ updateClasses });
    // Regular expression to match #$<TEXT>#$ pattern
    const regex = /#\$.*?\#\$/g;

    // Extract all matches
    const matches = HTML.match(regex);
    matches && matches.forEach(match => {


        if (match === "#$NOTAVAILABLE#$") {
            document.body.classList.add("page-not-available");
        } else {
            document.body.classList?.remove("page-not-available");
        }

        const key = match.replace("#$", "").replace("#$", "");
        const value = ApplicationStructure[key]["CODE"];
        HTML = HTML.replace(match, value);
    });

    return HTML;
}

// THis is the function that will load the page as per the HTML document
function pageLoader({ page }) {
    // Clean the code before loading new page
    const elements = ContainerSection.children;
    Array.from(elements).forEach(tag => tag.remove());


    const HTML = HTMLHandler({ page });

    ContainerSection.insertAdjacentHTML("afterbegin", HTML);

    const callFunctions = ApplicationStructure[page]["FUNCTIONS"];
    callFunctions && callFunctionsHandler({ callFunctions });
}

export { ApplicationStructure, pageLoader };


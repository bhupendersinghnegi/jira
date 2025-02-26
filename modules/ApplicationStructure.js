// This is a object based file that will have all the HTML structure of the application

import { dashboardIcon, folderIcon, meetingDateIcon, notificationIcon, policyIcon, settingsIcons, taskIcon, teamsIcon } from "./ApplicationIcons.js";



const ContainerSection = document.querySelector(".ContainerSection");

// This is a url mapping for render pages(ApplicationStructure) user there URL
const URL_MAPPING = {
    dashboard: {
        SVG_IMAGE: dashboardIcon,
        TASK_NAME: "Dashboard Page",
        IS_ACTIVE: false, // true || false
        PAGE: "DASHBOARD_PAGE"
    },
    tasks: {
        SVG_IMAGE: taskIcon,
        TASK_NAME: "Tasks Page",
        IS_ACTIVE: false, // true || false
        PAGE: "TASKS_PAGE"
    },
    meetings: {
        SVG_IMAGE: meetingDateIcon,
        TASK_NAME: "Meeting Details Page",
        IS_ACTIVE: false, // true || false
        PAGE: "MEETINGS_PAGE"
    },
    files: {
        SVG_IMAGE: folderIcon,
        TASK_NAME: "Assets Page",
        IS_ACTIVE: false, // true || false
        PAGE: "FILES_PAGE"
    },
    teams: {
        SVG_IMAGE: teamsIcon,
        TASK_NAME: "Teams Info Page",
        IS_ACTIVE: false, // true || false
        PAGE: "TEAMS_PAGE"
    },
}

function userIsActiveHandler({ user }) {
    Object.entries(URL_MAPPING).forEach(([key, _]) => {
        URL_MAPPING[key]["IS_ACTIVE"] = URL_MAPPING.hasOwnProperty(user) && user === key ? true : false;
    })
}

// Key rules
// CLASS_STATUS:true, // true means add, false means remove
// CLASS: ["CLASS_NAME"] // All classes must be given as array of strings
// FUNCTIONS // Array of functions to load the page that is needed to load
// Adding any components #$COMPONENT_NAME#$
// Adding any output of the function $$$FUNCTION_NAME$$$
const ApplicationStructure = {

    //  These are the all the components of the application
    COMING_SOON_COMPONENT: {
        CODE: `<section class="comingSoon">
                <div>
                    <h2>Coming Soon</h2>
                    <p>We’re working hard to bring you something amazing! Our website is currently under construction, but we’ll be launching soon. Stay tuned for updates, and thank you for your patience! 🚀</p>
                </div>       
            </section>`
    },
    HEADER_COMPONENT: {
        CODE: `
            <header>
                <ul class="list-unset userInfo">
                    <li class="dorpdown">
                        <div class="dorpdownHeading info--options notificationButton">
                            ${notificationIcon}
                        </div>
                        <div class="dorpdown--menu">
                            $$$notificationButtonHandler$$$
                        </div>
                    </li>
                    <li>
                        <div class="info--options policyButton">
                            ${policyIcon}
                        </div>
                    </li>
                    <li class="dorpdown ">
                        <div class="dorpdownHeading info--options settingsButton">
                            ${settingsIcons}
                        </div>
                        <div class="dorpdown--menu">
                            <h1>testing</h1>
                        </div>
                    </li>
                </ul>

                $$$currentUserHandler$$$
            </header>
        `
    },
    NAVIGATION_COMPONENT: {
        CODE: `
            <aside class="navigation navigationComponent">
                <img src="${browsePath}application-logo.svg" class="navigation--logo" alt="application logo" width="60" height="60" />
                <ul class="navigation--list list-unset">
                    $$$navigationHandler$$$
                    $$$addTaskHandler$$$
                    
                </ul>
            </aside>
        `
    },
    //  These are the all the pages of the application
    DASHBOARD_PAGE: {
        CODE: `
            <section class="container dashboardPage">
                #$NAVIGATION_COMPONENT#$
                <div class="mainSection">
                    #$HEADER_COMPONENT#$
                    $$dashboardTasks$$ 
                </div>
            </section>
        `,
        CLASSES: [
            {
                SELECTOR: "body",
                CLASS_STATUS: false, // true means add, false means remove
                CLASS: ["login"]
            }
        ],
    },
    TASKS_PAGE: {
        CODE: `<section class="container dashboardPage">
                #$NAVIGATION_COMPONENT#$
                <div class="mainSection">
                    <div class="header--gap">
                        #$HEADER_COMPONENT#$
                        $$taskFilterHandler$$
                    </div>
                    $$taskHandler$$
                </div>
            </section>`,
        FUNCTIONS: [
            "taskPageHandler" // Do something not handled dynamically
        ]
    },
    TASK_PAGE: {
        CODE: `<section class="container taskDetailsPage">
                #$NAVIGATION_COMPONENT#$
                <div class="mainSection">
                    #$HEADER_COMPONENT#$
                    $$taskDetailsHandler$$
                </div>
            </section>`,
    },
    MEETINGS_PAGE: {
        CODE: `
            <section class="container dashboardPage">
                #$NAVIGATION_COMPONENT#$
                <div class="mainSection">
                    #$HEADER_COMPONENT#$ 
                    #$COMING_SOON_COMPONENT#$ 
                </div>
            </section>
        `
    },
    FILES_PAGE: {
        CODE: `
            <section class="container dashboardPage">
                #$NAVIGATION_COMPONENT#$
                <div class="mainSection">
                    #$HEADER_COMPONENT#$ 
                    #$COMING_SOON_COMPONENT#$
                </div>
            </section>
        `
    },
    TEAMS_PAGE: {
        CODE: `
            <section class="container dashboardPage">
                #$NAVIGATION_COMPONENT#$
                <div class="mainSection">
                    #$HEADER_COMPONENT#$ 
                    #$COMING_SOON_COMPONENT#$
                </div>
            </section>
        `
    },
    LOGIN_PAGE: {
        CODE: `<section class="login">
                    <form class="loginForm">
                        <h2 class="login--heading">Login</h2>
                        <p class="login--title">Welcome back!</p>
                        <input type="text" class="userId" placeholder="Please enter your name or email address.">
                        <input type="password" class="userPassword" placeholder="Please enter your password">
                        <p class="login--forgot">Forgot Password?</p>
                        <button type="submit" class="btn btn-primary">
                            login now
                            <img src="${browsePath}login-arrow.svg" alt="login arrow" width="30" />
                        </button>
                        <p class="login--copyright">Copyright $$currentYearHandler$$.  Terms and Conditions Apply</p>
                    </form>
                </section>`,
        CLASSES: [
            {
                SELECTOR: "body",
                CLASS_STATUS: true, // true means add, false means remove
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
    updateClasses.forEach(({ SELECTOR, CLASS_STATUS, CLASS }) => {
        const tag = document.querySelector(SELECTOR);
        if (CLASS_STATUS) {
            tag.classList.add(...CLASS);
        } else {
            tag.classList.remove(...CLASS);
        }
    });
}

// This is tha page that is needed to perform the task that are needed to done
function callFunctionsHandler({ callFunctions }) {
    if (!callFunctions) { return null; }
    let functionOutput = null;
    callFunctions.forEach(functionName => {
        const functionToCall = window[functionName];
        if (typeof functionToCall === "function") {
            functionOutput = functionToCall();
        } else {
            console.log(`${functionName} is not a function`)
        }
    });
    return functionOutput;
}
// This is a sort hand for function match handler
function functionsMatchesHandler(HTML) {
    // Regular expression to match $$<TEXT>$$ pattern
    const functionsRegex = /\$\$(.*?)\$\$/g;

    const functionsMatches = HTML.match(functionsRegex);

    functionsMatches && functionsMatches.forEach(match => {
        const key = match.replaceAll("$$", "");
        const value = callFunctionsHandler({ callFunctions: [key] });
        HTML = HTML.replace(match, value ? value : "");
    });
    return HTML;
}

// This function will handle the HTML structure of the application
function HTMLHandler({ page }) {
    let HTML = ApplicationStructure[page]["CODE"];
    const updateClasses = ApplicationStructure[page]["CLASSES"];
    updateClasses && classesHandler({ updateClasses });
    // Regular expression to match #$<TEXT>#$ pattern
    const componentsRegex = /#\$.*?\#\$/g;

    // Extract all matches
    // This will call the function and insert the output to the pages
    HTML = functionsMatchesHandler(HTML);
    // This is for inserting components the the ApplicationStructure
    const componentsMatches = HTML.match(componentsRegex);
    componentsMatches && componentsMatches.forEach(match => {
        const key = match.replaceAll("#$", "");
        const value = ApplicationStructure[key]["CODE"];
        HTML = HTML.replace(match, value);
        // This will call the function and insert the output to the pages
        HTML = functionsMatchesHandler(HTML);
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

export { ApplicationStructure, pageLoader, URL_MAPPING, userIsActiveHandler };


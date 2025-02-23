// This file will preform(Render all the UI needed to dashboards)

import { formattedDateHandler } from "../AllFunctions.js";
import { filterSearch, finishedIcon, inProgessIcon, taskIcon, totalIcon, yetToStartIcon } from "../ApplicationIcons.js"
import { loginInUser } from "../Controller.js";
import { APPLICATION_DB, ENTERPRISE, TASKSTATUS } from "../ProductInfo.js";

// This function will render all the infomation need for any user dashboard task section
window.tarskHandler = function tarskHandler() {
    let totalTaskCount = 0;

    // Check all tasks 
    Object.entries(loginInUser["assigned_tasks"]).forEach(([key, _]) => {
        if (!APPLICATION_DB["TASKS"].hasOwnProperty(key)) {
            return null; // If task not found
        }
        totalTaskCount++;
        TASKSTATUS[APPLICATION_DB["TASKS"][key]["status"]]++;
    })
    return `<section class="row allTasks">
            <div class="total--task col--task">
                 ${totalIcon}
                <div class="task--details">
                    <h2 class="task--name">Total Task Count</h2>
                    <p class="task--role">${totalTaskCount}</p>
                </div>
            </div>
            <div class="yetToStart--task col--task">
                 ${yetToStartIcon}
                <div class="task--details">
                    <h2 class="task--name">Tasks Yet to Start</h2>
                    <p class="task--role">${TASKSTATUS["Pending"]}</p>
                </div>
            </div>
            <div class="inProgess--task col--task">
                 ${inProgessIcon}
                <div class="task--details">
                    <h2 class="task--name">In-Progress Tasks</h2>
                    <p class="task--role">${TASKSTATUS["Working"]}</p>
                </div>
            </div>
            <div class="finished--task col--task">
                 ${finishedIcon}
                <div class="task--details">
                    <h2 class="task--name">Finished Tasks</h2>
                    <p class="task--role">${TASKSTATUS["Completed"]}</p>
                </div>
            </div>
        </section>
    `
}

// This the function that will print all tha enterprise in this application
function enterpriseHandler() {
    return Object.entries(ENTERPRISE).map(([key, value]) => {
        const { name, assigned_to } = value;
        if (!assigned_to.hasOwnProperty(loginInUser["user_id"])) { return null }
        return `<option value="${key}">${name}</option>`
    }).join("");
}
// This the function that will print all tha task type in this application
function taskTypeHandler() {
    return Object.entries(TASKSTATUS).map(([key, _]) => {
        return `<option value="${key}">${key}</option>`
    }).join("");
}


// This function is used for render filter section in task page
window.taskFilterHandler = function taskFilterHandler() {
    const enterprise = enterpriseHandler();
    const task = taskTypeHandler();

    // <lable class="select">
    //     <select class="taskTypeHandler">
    //         <option>-- Task Type --</option>
    //         ${task}
    //     </select>
    // </lable>
    return `<section class="tasks--filter">
            <div class="filter--seletors">
                <lable class="select">
                    <select class="enterpriseHandler">
                        <option>-- Enterprise Type --</option>
                        ${enterprise}
                    </select>
                </lable>
            </div>
            <div class="filter--search">
                <input type="text" class="filterSearch" placeholder="Search tasks"/>
                ${filterSearch}
            </div>
        </section>`;
}
// This function will render all the the task assgin to the user
window.taskHandler = function taskHandler(enterpriseHandler) {
    try {
        // Print task as per the user login
        const TASKSTATUS = {
            Pending: "",
            Working: "",
            Completed: "",
        }

        Object.entries(loginInUser["assigned_tasks"]).forEach(([key, value]) => {
            // Check of task
            if (!APPLICATION_DB["TASKS"].hasOwnProperty(key)) {
                console.log("Check the tasks:: " + key)
                return null
            }
            const { title, description, assigned_to, enterprise, dueDate } = APPLICATION_DB["TASKS"][key];
            if (!ENTERPRISE.hasOwnProperty(enterprise)) {
                console.log("Check the enterprise:: " + enterprise)
                return null
            }
            // Check of the deparment 
            if (enterpriseHandler && enterpriseHandler !== enterprise) {
                console.log("enterprise filted these:: " + enterprise)
                return null;
            }


            const userName = APPLICATION_DB["USERS"][assigned_to]["name"]
            const { image_url, name } = ENTERPRISE[enterprise];
            const taskDueDate = formattedDateHandler(dueDate);
            const enterpriseName = name.replaceAll(" ", "").toLowerCase();

            TASKSTATUS[APPLICATION_DB["TASKS"][key]["status"]] += `<div class="tasks--cart tasksCart" data-task="${key}" data-enterprise="${enterpriseName}">
                <div class="cart--head" >
                    <img src="${browsePath}enterprise/${image_url}" alt="${name}" class="img-fluid enterpriseImage" width="550" height="98"/>
                </div>
                <div class="cart--body">
                    <h2 class="cart--heading">${title}</h2>
                    <p class="cart--discription">${description}</p>
                    <div class="assign--task">
                        <p>Assigned To: ${userName}</p>
                        <div class="task--duedate">
                            <img src="${browsePath}deadline-time.svg" alt="deadline time" width="24" height="24"/>
                            <span>${taskDueDate}</span>
                        </div>
                    </div>
                </div>
            </div>`
        })

        const notTaskFound = `
            <section class="taskno--found">
                <h2>No task found</h2>
                <p>It looks like there are no tasks assigned or available at the moment.</p>
            </section>
        `;

        return `<section class="tasks">
        <div class="tasks--type">
            <h2 class="tasks--heading">To Do Tasks</h2>
            ${TASKSTATUS["Pending"] ? TASKSTATUS["Pending"] : notTaskFound}
        </div>
        <div class="tasks--type">
            <h2 class="tasks--heading">Working Tasks</h2>
            ${TASKSTATUS["Working"] ? TASKSTATUS["Working"] : notTaskFound}
        </div>
        <div class="tasks--type">
            <h2 class="tasks--heading">Done Tasks</h2>
            ${TASKSTATUS["Completed"] ? TASKSTATUS["Completed"] : notTaskFound}
        </div>
    </section>`
    } catch (error) {
        console.log("error::: " + error)
    }
}

window.taskPageHandler = function taskPageHandler() {

    const enterpriseHandler = document.querySelector(".enterpriseHandler");
    const filterSearch = document.querySelector(".filterSearch");
    const mainSection = document.querySelector(".dashboardPage .mainSection");
    enterpriseHandler.addEventListener('change', (Event) => {
        const taskSection = document.querySelector(".dashboardPage .tasks");
        const value = Event.target.value;
        const HTML = taskHandler(value);
        taskSection?.remove();
        mainSection.insertAdjacentHTML("beforeend", HTML);
    });
}
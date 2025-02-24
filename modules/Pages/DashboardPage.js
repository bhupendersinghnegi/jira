// This file will preform(Render all the UI needed to dashboards)

import { finishedIcon, inProgressIcon, totalIcon, yetToStartIcon } from "../ApplicationIcons.js";
import { LOGIN_USER } from "../Controller.js";
import { APPLICATION_DB, TASK_STATUS } from "../ProductInfo.js";

// This function will render all the information need for any user dashboard task section
window.dashboardTasks = function dashboardTasks() {
    let totalTaskCount = 0;

    // Check all tasks 
    Object.entries(LOGIN_USER["assigned_tasks"]).forEach(([key, _]) => {
        if (!APPLICATION_DB["TASKS"].hasOwnProperty(key)) {
            return null; // If task not found
        }
        totalTaskCount++;
        TASK_STATUS[APPLICATION_DB["TASKS"][key]["status"]]++;
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
                    <p class="task--role">${TASK_STATUS["Pending"]}</p>
                </div>
            </div>
            <div class="inProgress--task col--task">
                 ${inProgressIcon}
                <div class="task--details">
                    <h2 class="task--name">In-Progress Tasks</h2>
                    <p class="task--role">${TASK_STATUS["Working"]}</p>
                </div>
            </div>
            <div class="finished--task col--task">
                 ${finishedIcon}
                <div class="task--details">
                    <h2 class="task--name">Finished Tasks</h2>
                    <p class="task--role">${TASK_STATUS["Completed"]}</p>
                </div>
            </div>
        </section>
    `
}
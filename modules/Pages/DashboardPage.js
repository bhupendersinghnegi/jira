// This file will preform(Render all the UI needed to dashboards)

import { finishedIcon, inProgessIcon, taskIcon, totalIcon, yetToStartIcon } from "../ApplicationIcons.js"

// This function will render all the infomation need for any user dashboard task section
window.tarskHandler = function tarskHandler() {
    return `
        <section class="row allTasks">
            <div class="total--task col--task">
                 ${totalIcon}
                <div class="task--details">
                    <h2 class="task--name">Total Task Count</h2>
                    <p class="task--role">${10}</p>
                </div>
            </div>
            <div class="yetToStart--task col--task">
                 ${yetToStartIcon}
                <div class="task--details">
                    <h2 class="task--name">Tasks Yet to Start</h2>
                    <p class="task--role">${10}</p>
                </div>
            </div>
            <div class="inProgess--task col--task">
                 ${inProgessIcon}
                <div class="task--details">
                    <h2 class="task--name">In-Progress Tasks</h2>
                    <p class="task--role">${10}</p>
                </div>
            </div>
            <div class="finished--task col--task">
                 ${finishedIcon}
                <div class="task--details">
                    <h2 class="task--name">Finished Tasks</h2>
                    <p class="task--role">${10}</p>
                </div>
            </div>
        </section>
    `
}
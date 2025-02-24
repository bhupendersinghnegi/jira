import { debouncingHandler, formattedDateHandler } from "../AllFunctions.js";
import { filterSearch } from "../ApplicationIcons.js";
import { LOGIN_USER, MIN_SEARCH_LENGTH } from "../Controller.js";
import { APPLICATION_DB, ENTERPRISE, TASK_STATUS } from "../ProductInfo.js";
// The page is needed when we open task pages of application



// This the function that will print all tha enterprise in this application
function enterpriseHandler() {
    return Object.entries(ENTERPRISE).map(([key, value]) => {
        const { name, assigned_to } = value;
        // if (!assigned_to.hasOwnProperty(LOGIN_USER["user_id"])) { return null }
        return `<option value="${key}">${name}</option>`
    }).join("");
}
// This the function that will print all tha task type in this application
function taskTypeHandler() {
    return Object.entries(TASK_STATUS).map(([key, _]) => {
        return `<option value="${key}">${key}</option>`
    }).join("");
}


// This function is used for render filter section in task page
window.taskFilterHandler = function taskFilterHandler() {
    const enterprise = enterpriseHandler();
    const task = taskTypeHandler();

    // <label class="select">
    //     <select class="taskTypeHandler">
    //         <option value="">-- Task Type --</option>
    //         ${task}
    //     </select>
    // </label>
    return `<section class="tasks--filter">
            <div class="filter--selectors">
                <label class="select">
                    <select class="enterpriseHandler">
                        <option value="">-- Enterprise Type --</option>
                        ${enterprise}
                    </select>
                </label>
            </div>
            <div class="filter--search">
                <input type="text" class="filterSearch" placeholder="Search tasks"/>
                ${filterSearch}
            </div>
        </section>`;
}
// This function will render all the the task assign to the user
// window.taskHandler = function taskHandler(enterpriseHandler, searchKeyword="redesign social ") {
window.taskHandler = function taskHandler(enterpriseHandler, searchKeyword) {
    try {
        // Print task as per the user login
        const TASK_STATUS = {
            Pending: "",
            Working: "",
            Completed: "",
        }

        Object.entries(LOGIN_USER["assigned_tasks"]).forEach(([key, _]) => {
            // Check of task
            if (!APPLICATION_DB["TASKS"].hasOwnProperty(key)) {
                // console.log("Check the tasks:: " + key);
                return null
            }
            const { title, description, assigned_to, enterprise, dueDate } = APPLICATION_DB["TASKS"][key];
            if (!ENTERPRISE.hasOwnProperty(enterprise)) {
                // console.log("Check the enterprise:: " + enterprise);
                return null
            }
            // Check of the department 
            if (enterpriseHandler && enterpriseHandler !== enterprise) {
                // console.log("enterprise filtered these:: " + enterprise);
                return null;
            }


            const userName = APPLICATION_DB["USERS"][assigned_to]["name"]
            const { image_url, name } = ENTERPRISE[enterprise];
            const taskDueDate = formattedDateHandler(dueDate); 
            const enterprise_name = name.replaceAll(" ", "").toLowerCase();


            // Check for search tasks 
            const matchKeyword = key.toLowerCase().includes(searchKeyword);
            const matchTitle = title.toLowerCase().includes(searchKeyword);
            const enterpriseTitle = name.toLowerCase().includes(searchKeyword);
            if (searchKeyword && !matchKeyword && !matchTitle && !enterpriseTitle) {
                console.log(`Search keyword do not work with:: key ${key}, enterprise name ${name} title ${title}, keyword ${searchKeyword}`);
                return null;
            }

            TASK_STATUS[APPLICATION_DB["TASKS"][key]["status"]] += `<div class="tasks--cart tasksCart" data-task="${key}" data-enterprise_name="${enterprise_name}" data-enterprise_id="${enterprise}">
                <div class="cart--head" >
                    <img src="${browsePath}enterprise/${image_url}" alt="${name}" class="img-fluid enterpriseImage" width="550" height="98"/>
                </div>
                <div class="cart--body">
                    <h2 class="cart--heading">${title}</h2>
                    <p class="cart--description">${description}</p>
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
            ${TASK_STATUS["Pending"] ? TASK_STATUS["Pending"] : notTaskFound}
        </div>
        <div class="tasks--type">
            <h2 class="tasks--heading">Working Tasks</h2>
            ${TASK_STATUS["Working"] ? TASK_STATUS["Working"] : notTaskFound}
        </div>
        <div class="tasks--type">
            <h2 class="tasks--heading">Done Tasks</h2>
            ${TASK_STATUS["Completed"] ? TASK_STATUS["Completed"] : notTaskFound}
        </div>
    </section>`
    } catch (error) {
        console.log("error::: " + error)
    }
}



// This is the function that will reset the task section when filter input is changed
function resetTaskHandler() {
    console.log("resetTaskHandler working")
    const enterpriseTag = document.querySelector(".enterpriseHandler");
    const filterSearchTag = document.querySelector(".filterSearch");
    const mainSectionTag = document.querySelector(".dashboardPage .mainSection");


    const taskSection = document.querySelector(".dashboardPage .tasks");
    const enterpriseValue = enterpriseTag ? enterpriseTag.value.toLowerCase() : null;
    const filterSearchValue = filterSearchTag ? filterSearchTag.value.toLowerCase() : null;
    const HTML = taskHandler(enterpriseValue, filterSearchValue);
    taskSection?.remove();
    mainSectionTag.insertAdjacentHTML("beforeend", HTML);
}

window.taskPageHandler = function taskPageHandler() {

    const enterpriseTag = document.querySelector(".enterpriseHandler");
    const filterSearchTag = document.querySelector(".filterSearch");

    // Change enterprise with select box
    enterpriseTag.addEventListener('change', resetTaskHandler);

    // Change enterprise with search box
    const searchHandler = debouncingHandler(resetTaskHandler);
    filterSearchTag.addEventListener("input", (Event) => {
        const value = Event.target.value;
        if (value && value.length < MIN_SEARCH_LENGTH) {
            return null;
        }
        searchHandler();
    })
}

// Task details
window.taskDetailsHandler = function taskDetailsHandler({taskId, enterpriseId}) {
    debugger
}
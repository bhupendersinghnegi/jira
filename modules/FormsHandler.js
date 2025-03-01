// THis is the file that will handle all the events for form in this application

import { APPLICATION_DB, ENTERPRISE, TASK_STATUS } from "./ProductInfo.js";

// Insert a ask to the user
function addTaskSubmitHandler(event) {
    event.preventDefault();
    // Check if all inputs are not empty or right as per the need
    const allInputs = event.target.querySelectorAll("input,select,textarea");
    const isInputEmpty = Array.from(allInputs).map(tag => {
        console.log(tag)
        const isValidTag = tag.closest(".isValid");
        const isValid = tag.value ? true : false;


        isValidTag.dataset.valid = isValid;
        return isValid;
    });

    // Check for the date
    const isValid = isInputEmpty.every(valid => valid === true);
    if (!isValid) {
        return null;
    }
    debugger
}
// Add a task modal handler
function addTaskModalHandler() {
    const modal = document.querySelector(".modal.addTask");
    const clientname = modal.querySelector(`select[name="clientname"]`);
    const manager = modal.querySelector(`select[name="manager"]`);
    const status = modal.querySelector(`select[name="status"]`);



    const statusTags = Object.entries(TASK_STATUS).map(([key, _]) => {
        return `<option value="${key}">${key}</option>`
    });
    status.insertAdjacentHTML("beforeend", statusTags);
    const managerTags = Object.entries(APPLICATION_DB["DEPARTMENTS"]).map(([key, value]) => {
        const { department_id, name } = value;
        return `<option value="${department_id}">${name}</option>`
    });
    manager.insertAdjacentHTML("beforeend", managerTags);
    const clientnameTags = Object.entries(ENTERPRISE).map(([key, value]) => {
        const { enterprise_id, name } = value;
        return `<option value="${enterprise_id}">${name}</option>`
    }).join('');
    clientname.insertAdjacentHTML("beforeend", clientnameTags);
}
export { addTaskModalHandler, addTaskSubmitHandler };


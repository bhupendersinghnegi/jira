// This the file that contains all the application information all the structures will be based on this JSON provided by this file.
const DB_NAME = "APPLICATION_DB";
let APPLICATION_DB = {
    USERS: {
        user1: {
            user_id: "user1",
            name: "Bhupender",
            email: "Bhupender@gamil.com",
            password: "Bhupender",
            role: "Software engineer",
            department_id: "department1",
            team: {},
            profile_picture: "avatar.svg",
            assigned_tasks: [],
            can_create_tasks: "",
            can_add_users: "",
        },
        user2: {
            user_id: "user2",
            name: "Parul",
            email: "Parul@gamil.com",
            password: "Parul",
            role: "manager",
            department_id: "department1",
            team: {
                users: ["user1", "user3"]
            },
            profile_picture: "avatar.svg",
            assigned_tasks: [],
            can_create_tasks: "",
            can_add_users: "",
        },
        user3: {
            user_id: "user3",
            name: "Shivani",
            email: "Shivani@gamil.com",
            password: "Shivani",
            role: "Front end engineer",
            department_id: "department1",
            team: {},
            profile_picture: "avatar.svg",
            assigned_tasks: [],
            can_create_tasks: "",
            can_add_users: "",
        },
        user4: {
            user_id: "user4",
            name: "Piyush",
            email: "Piyush@gamil.com",
            password: "Piyush",
            role: "HOD",
            department_id: "department1",
            team: {
                departments: ["department1"],
                users: ["user1", "user2", "user3"]
            },
            profile_picture: "avatar.svg",
            assigned_tasks: [],
            can_create_tasks: "",
            can_add_users: "",
        },
        user5: {
            user_id: "user5",
            name: "Ansari",
            email: "Ansari@gamil.com",
            password: "Ansari",
            role: "VP",
            department_id: "department1",
            team: {
                departments: ["department1"],
                users: ["user1", "user2", "user3"]
            },
            profile_picture: "avatar.svg",
            assigned_tasks: [],
            can_create_tasks: "",
            can_add_users: "",
        },
        user6: {
            user_id: "user6",
            name: "Varsha",
            email: "Varsha@gamil.com",
            password: "Varsha",
            role: "Senior Manager",
            department_id: "department2",
            team: {
                departments: ["department2"],
                users: ["user7"]
            },
            profile_picture: "avatar.svg",
            assigned_tasks: [],
            can_create_tasks: "",
            can_add_users: "",
        },
        user7: {
            user_id: "user7",
            name: "Yogiya",
            email: "Yogiya@gamil.com",
            password: "Yogiya",
            role: "Manager",
            department_id: "department2",
            team: {},
            profile_picture: "avatar.svg",
            assigned_tasks: [],
            can_create_tasks: "",
            can_add_users: "",
        },
    }, POSITIONS: {
        department2: {
            positions_id: "department2",
            can_create_tasks: true,
            can_add_users: false,
        }
    }, TASKS: {
        "task1": {
            id: "task1",
            title: "Create a new application",
            description: "Design and implement a new web application using React",
            status: "Pending",
            assignedTo: "user2",
            dueDate: new Date(),
            department: "IT"
        },
        "task2": {
            id: "task2",
            title: "Finish the project report",
            description: "Write a report on the project progress",
            status: "Completed",
            assignedTo: "user1",
            dueDate: new Date(),
            department: "Project Management"
        }
    }, DEPARTMENTS: {
        department1: {
            department_id: "department1",
            name: "Technical Department",
            teams: ["user1", "user2", "user3", "user4", "user5"]
        },
        department2: {
            department_id: "department2",
            name: "Operational department",
            teams: ["user6", "user7"]
        },
        department3: {
            department_id: "department3",
            name: "Graphics department",
            teams: ["user8"]
        },
    }, ATTENDANTS: {
        "user1": ["task1", "task2"],
        "user2": ["task1"]
    }, NOTIFICATIONS: {
        "user1": {
            task1: {
                message: "Task 'Create a new application' is assigned to you",
                timestamp: new Date()
            },
            task2: {
                message: "Task 'Finish the project report' is due tomorrow",
                timestamp: new Date()
            }
        }
    }
};
// This is the indexing for all the use quikly search for somthing in the APPLICATION_DB
const APPLICATION_MAPPING = {
    user_name: {},
    user_email: {},
    user_tasks: {},
    user_departments: {},
}
// This function will be used to initialize the application with the provided JSON data.
// If data is same in user client then the application will start with that data
function applicationHandler() {
    const storedInLocal = localStorage.getItem(DB_NAME);
    // Check is localStorage do not have DB_NAME if not just add APPLICATION_DB
    if (!localStorage.getItem(DB_NAME)) {
        localStorage.setItem(DB_NAME, JSON.stringify(APPLICATION_DB));
        console.log("Application DB stored in local storage");
        applicationMappingHandler();
        return APPLICATION_DB;
    }
    // Else set the information client have
    APPLICATION_DB = JSON.parse(storedInLocal);
    applicationMappingHandler();
}

function applicationMappingHandler() {
    // Create mapping for users
    Object.entries(APPLICATION_DB["USERS"]).forEach(([key, value]) => {
        const { name, email } = value;
        APPLICATION_MAPPING["user_name"][name] = key;
        APPLICATION_MAPPING["user_email"][email] = key;
    })
    // Create mapping for tasks
    Object.entries(APPLICATION_DB["TASKS"]).forEach(([key, value]) => {
        const { title } = value;
        APPLICATION_MAPPING["user_tasks"][title.toLowerCase()] = key;
    })
    // Create mapping for departments
    Object.entries(APPLICATION_DB["DEPARTMENTS"]).forEach(([key, value]) => {
        const { name } = value;
        APPLICATION_MAPPING["user_departments"][name] = key;
    })
    console.log(APPLICATION_DB)
}

export { applicationHandler, APPLICATION_MAPPING, APPLICATION_DB };

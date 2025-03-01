import { loginUserHandler } from "./Controller.js";

// This the file that contains all the application information all the structures will be based on this JSON provided by this file.
const DB_NAME = "APPLICATION_DB";
const LOGGED_IN_USER = "USER_ID";
let APPLICATION_DB = {
    USERS: {
        user1: {
            user_id: "user1",
            name: "Bhupender",
            email: "Bhupender@gamil.com",
            password: "Bhupender",
            role: "Software engineer",
            department_id: "department1",
            manager_id: "user2",
            team: {},
            profile_picture: "avatar.svg",
            assigned_tasks: {
                "task1": 1,
                "task2": 2,
                "task3": 3,
                "task4": 4,
                "task5": 5,
                "task6": 6,
                "task7": 7,
                "task8": 8,
                "task9": 9,
                "task10": 10,
                // "task5": 5, "task6": 6, "task7": 7,
                // "task10": 10
            },
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
            manager_id: "user4",
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
            manager_id: "user2",
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
            manager_id: "NA",
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
            manager_id: "NA",
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
            manager_id: "NA",
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
            manager_id: "user6",
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
            "task_id": "task1",
            "title": "Develop AI-powered Chatbot",
            "description": "Build an AI-driven chatbot using NLP to enhance customer support services.",
            "status": "Pending",
            "assigned_to": "user2",
            "enterprise": "enterprise2",
            "tag_to": {
                "departments": ["IT", "Customer Service"],
                "users": ["user1", "user3", "user5"]
            },
            "startingDate": "Mon Mar 10 2025 09:00:00 GMT+0530",
            "dueDate": "Wed Jun 10 2025 18:00:00 GMT+0530",
            "department": "IT"
        },
        "task2": {
            "task_id": "task2",
            "title": "Launch New E-commerce Platform",
            "description": "Develop and deploy a scalable e-commerce platform to handle millions of transactions.",
            "status": "Working",
            "assigned_to": "user1",
            "enterprise": "enterprise2",
            "tag_to": {
                "departments": ["IT", "Marketing"],
                "users": ["user2", "user4", "user6"]
            },
            "startingDate": "Tue Apr 01 2025 10:00:00 GMT+0530",
            "dueDate": "Fri Aug 15 2025 17:00:00 GMT+0530",
            "department": "E-commerce"
        },
        "task3": {
            "task_id": "task3",
            "title": "Implement Cybersecurity Framework",
            "description": "Enhance security protocols to prevent data breaches and cyber threats.",
            "status": "Pending",
            "assigned_to": "user3",
            "enterprise": "enterprise2",
            "tag_to": {
                "departments": ["IT", "Security"],
                "users": ["user5", "user6", "user7"]
            },
            "startingDate": "Wed Mar 15 2025 08:30:00 GMT+0530",
            "dueDate": "Thu Jul 30 2025 18:30:00 GMT+0530",
            "department": "Cybersecurity"
        },
        "task4": {
            "task_id": "task4",
            "title": "Design Next-Gen Electric Vehicle",
            "description": "Research and develop a new electric vehicle with enhanced battery efficiency and performance.",
            "status": "Pending",
            "assigned_to": "user5",
            "enterprise": "enterprise6",
            "tag_to": {
                "departments": ["Engineering", "R&D"],
                "users": ["user3", "user7", "user7"]
            },
            "startingDate": "Fri May 01 2025 12:00:00 GMT+0530",
            "dueDate": "Sun Dec 20 2025 15:00:00 GMT+0530",
            "department": "Automobile"
        },
        "task5": {
            "task_id": "task5",
            "title": "Optimize iOS Performance",
            "description": "Enhance the iOS system performance for smoother user experience and battery efficiency.",
            "status": "Completed",
            "assigned_to": "user1",
            "enterprise": "enterprise7",
            "tag_to": {
                "departments": ["IT", "Product"],
                "users": ["user2", "user6", "user7"]
            },
            "startingDate": "Mon Jan 15 2025 11:00:00 GMT+0530",
            "dueDate": "Mon Apr 30 2025 17:30:00 GMT+0530",
            "department": "Software Development"
        },
        "task6": {
            "task_id": "task6",
            "title": "Redesign Social Media Algorithm",
            "description": "Enhance feed ranking algorithms to improve user engagement and content relevance.",
            "status": "Working",
            "assigned_to": "user1",
            "enterprise": "enterprise9",
            "tag_to": {
                "departments": ["IT", "AI"],
                "users": ["user3", "user5", "user7"]
            },
            "startingDate": "Thu Feb 01 2025 10:00:00 GMT+0530",
            "dueDate": "Thu Jul 01 2025 14:00:00 GMT+0530",
            "department": "Artificial Intelligence"
        },
        "task7": {
            "task_id": "task7",
            "title": "Develop 6G Wireless Technology",
            "description": "Research and prototype the next-generation 6G network technology for global connectivity.",
            "status": "Pending",
            "assigned_to": "user1",
            "enterprise": "enterprise1",
            "tag_to": {
                "departments": ["R&D", "Telecom"],
                "users": ["user1", "user4", "user1"]
            },
            "startingDate": "Tue Jun 15 2025 09:30:00 GMT+0530",
            "dueDate": "Sun Dec 15 2025 18:30:00 GMT+0530",
            "department": "Telecommunications"
        },
        "task8": {
            "task_id": "task8",
            "title": "Expand Video Streaming Content",
            "description": "Partner with global production houses to expand the library of exclusive content.",
            "status": "Working",
            "assigned_to": "user1",
            "enterprise": "enterprise17",
            "tag_to": {
                "departments": ["Marketing", "Content"],
                "users": ["user3", "user5", "user7"]
            },
            "startingDate": "Wed May 10 2025 11:00:00 GMT+0530",
            "dueDate": "Mon Sep 30 2025 16:00:00 GMT+0530",
            "department": "Entertainment"
        },
        "task9": {
            "task_id": "task9",
            "title": "Develop Sustainable Shoe Line",
            "description": "Create a new product line of eco-friendly and biodegradable footwear.",
            "status": "Pending",
            "assigned_to": "user6",
            "enterprise": "enterprise5",
            "tag_to": {
                "departments": ["Design", "Sustainability"],
                "users": ["user2", "user7", "user7"]
            },
            "startingDate": "Fri Mar 22 2025 08:30:00 GMT+0530",
            "dueDate": "Sat Nov 30 2025 17:30:00 GMT+0530",
            "department": "Sustainability"
        },
        "task10": {
            "task_id": "task10",
            "title": "Launch Global Travel Initiative",
            "description": "Enhance travel experiences with AI-based customer personalization and booking automation.",
            "status": "Completed",
            "assigned_to": "user1",
            "enterprise": "enterprise20",
            "tag_to": {
                "departments": ["Marketing", "IT"],
                "users": ["user4", "user6", "user1"]
            },
            "startingDate": "Tue Feb 10 2025 09:00:00 GMT+0530",
            "dueDate": "Sun Aug 20 2025 18:00:00 GMT+0530",
            "department": "Hospitality"
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
            teams: ["user7"]
        },
    }, ATTENDANTS: {
        user1: ["task1", "task2"],
        user2: ["task1"]
    }, NOTIFICATIONS: {
        user1: {
            task1: {
                message: "Task 'Create a new application' is assigned to you",
                timestamp: "Sun Feb 23 2025 11:54:35 GMT+0530 (India Standard Time)"
            },
            task2: {
                message: "Task 'Finish the project report' is due tomorrow",
                timestamp: "Sun Feb 23 2025 11:54:35 GMT+0530 (India Standard Time)"
            }
        }
    }
};
// All the enterprise that are in this application
const ENTERPRISE = {
    "enterprise1": {
        "enterprise_id": "enterprise1",
        "name": "HDFC BANK",
        "image_url": "hdfc-banner.svg",
        "assigned_to": {
            "user1": 1,
            "user2": 2,
            "user3": 3
        }
    },
    "enterprise2": {
        "enterprise_id": "enterprise2",
        "name": "Google",
        "image_url": "google-logo.svg",
        "assigned_to": {
            "user4": 4,
            "user5": 5
        }
    },
    "enterprise3": {
        "enterprise_id": "enterprise3",
        "name": "Amazon",
        "image_url": "amazon-banner.svg",
        "assigned_to": {
            "user6": 6,
            "user7": 7,
            "user7": 8
        }
    },
    "enterprise4": {
        "enterprise_id": "enterprise4",
        "name": "Reliance Industries",
        "image_url": "reliance-logo.svg",
        "assigned_to": {
            "user7": 9,
            "user1": 10
        }
    },
    "enterprise5": {
        "enterprise_id": "enterprise5",
        "name": "Microsoft",
        "image_url": "microsoft-banner.svg",
        "assigned_to": {
            "user1": 1,
            "user3": 3
        }
    },
    "enterprise6": {
        "enterprise_id": "enterprise6",
        "name": "Tesla",
        "image_url": "tesla-logo.svg",
        "assigned_to": {
            "user2": 2,
            "user4": 4,
            "user6": 6
        }
    },
    "enterprise7": {
        "enterprise_id": "enterprise7",
        "name": "Apple Inc.",
        "image_url": "apple-logo.svg",
        "assigned_to": {
            "user5": 5,
            "user7": 7
        }
    },
    "enterprise8": {
        "enterprise_id": "enterprise8",
        "name": "Tata Group",
        "image_url": "tata-banner.svg",
        "assigned_to": {
            "user7": 8,
            "user7": 9
        }
    },
    "enterprise9": {
        "enterprise_id": "enterprise9",
        "name": "Meta (Facebook)",
        "image_url": "meta-logo.svg",
        "assigned_to": {
            "user1": 10,
            "user1": 1
        }
    },
    "enterprise10": {
        "enterprise_id": "enterprise10",
        "name": "Infosys",
        "image_url": "infosys-logo.svg",
        "assigned_to": {
            "user2": 2,
            "user3": 3
        }
    },
    "enterprise11": {
        "enterprise_id": "enterprise11",
        "name": "Samsung",
        "image_url": "samsung-logo.svg",
        "assigned_to": {
            "user4": 4,
            "user6": 6
        }
    },
    "enterprise12": {
        "enterprise_id": "enterprise12",
        "name": "Walmart",
        "image_url": "walmart-banner.svg",
        "assigned_to": {
            "user5": 5,
            "user7": 8
        }
    },
    "enterprise13": {
        "enterprise_id": "enterprise13",
        "name": "Cisco Systems",
        "image_url": "cisco-logo.svg",
        "assigned_to": {
            "user7": 7,
            "user7": 9
        }
    },
    "enterprise14": {
        "enterprise_id": "enterprise14",
        "name": "Mahindra Group",
        "image_url": "mahindra-logo.svg",
        "assigned_to": {
            "user1": 10,
            "user2": 2
        }
    },
    "enterprise15": {
        "enterprise_id": "enterprise15",
        "name": "IBM",
        "image_url": "ibm-logo.svg",
        "assigned_to": {
            "user1": 1,
            "user3": 3
        }
    },
    "enterprise16": {
        "enterprise_id": "enterprise16",
        "name": "Netflix",
        "image_url": "netflix-banner.svg",
        "assigned_to": {
            "user4": 4,
            "user5": 5
        }
    },
    "enterprise17": {
        "enterprise_id": "enterprise17",
        "name": "Nike",
        "image_url": "nike-logo.svg",
        "assigned_to": {
            "user6": 6,
            "user7": 8
        }
    },
    "enterprise18": {
        "enterprise_id": "enterprise18",
        "name": "Goldman Sachs",
        "image_url": "goldmansachs-banner.svg",
        "assigned_to": {
            "user7": 7,
            "user7": 9
        }
    },
    "enterprise19": {
        "enterprise_id": "enterprise19",
        "name": "JP Morgan Chase",
        "image_url": "jpmorgan-logo.svg",
        "assigned_to": {
            "user1": 10,
            "user1": 1
        }
    },
    "enterprise20": {
        "enterprise_id": "enterprise20",
        "name": "Airbnb",
        "image_url": "airbnb-banner.svg",
        "assigned_to": {
            "user2": 2,
            "user3": 3
        }
    }
}


// Type of task that shows the state of a task
let TASK_STATUS = {
    Pending: 0,
    Working: 0,
    Completed: 0,
}

function resetTaskStatusHandler(){
    TASK_STATUS = {
        Pending: 0,
        Working: 0,
        Completed: 0,
    }
}
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
    // Set up the user to the application
    const userId = localStorage.getItem(LOGGED_IN_USER);
    userId && loginUserHandler(APPLICATION_DB["USERS"][JSON.parse(userId)]);

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
}

export { APPLICATION_DB, APPLICATION_MAPPING, applicationHandler, ENTERPRISE, LOGGED_IN_USER, resetTaskStatusHandler, TASK_STATUS };


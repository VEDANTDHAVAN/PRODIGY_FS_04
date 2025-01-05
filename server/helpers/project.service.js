const { default: mongoose } = require('mongoose');
const Project = require('../models/project');

const createProject = async (name, userId) => {
    if(!name) {
        throw new Error('Name is required!!');
    }
    if(!userId){
        throw new Error('User is required!!');
    }

    //const project = await Project.create({name, users: [userId]})
    let project;
    try {
        project = await Project.create({
            name, users: [userId]
        })
    } catch (error) {
        if(error.code === 11000){
            throw new Error('Project name already Exists!!');
        }
        throw error
    } 

    return project
}

const getAllProjectsByUserId = async ({userId}) => {
    if(!userId){
        throw new Error('UserId is Required!!')
    }

    const userProjects = await Project.find({
        users: userId
    })

    return userProjects
}

/*const addUsersToProject = async ({projectId, users, userId}) => {
    if(!projectId){
        throw new Error("Project ID is required!!");
    }
     
    if(!mongoose.Types.ObjectId.isValid(projectId)){
        throw new Error("Invalid Project ID!!");
    }

    if(!users){
        throw new Error("Users are required!!");
    }

    if(!Array.isArray(users) || users.some(userId => !mongoose.Types.ObjectId.isValid(userId))){
        throw new Error("Invalid 'userId(s)' in 'users Array'");
    }

    //Find if the user belongs to that project
    const project = await Project.findOne({
        _id: projectId,
        users: [userId]
    })

    if(!project){
        throw new Error("User Does not belong to this Project!!");
    }

    const updatedProject = await Project.findOneAndUpdate({
        _id: projectId
    }, {
        $addToSet: {
            users: {
                $each: users
            }
        }
    }, {
        new: true
    })

    return updatedProject
}*/

const addUsersToProject = async ({ projectId, users, userId }) => {
    if (!projectId) {
        throw new Error("Project ID is required!!");
    }

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        throw new Error("Invalid Project ID!!");
    }

    if (!users) {
        throw new Error("Users are required!!");
    }

    if (!Array.isArray(users) || users.some(userId => !mongoose.Types.ObjectId.isValid(userId))) {
        throw new Error("Invalid 'userId(s)' in 'users Array'");
    }

    // Check if the user belongs to the project
    const project = await Project.findById({
        _id: projectId,
        users: userId // Corrected to check if userId is in the users array
    });

    if (!project) {
        throw new Error("User Does not belong to this Project!!");
    }

    // Add new users to the project
    const updatedProject = await Project.findOneAndUpdate(
        { _id: projectId },
        {
            $addToSet: {
                users: {
                    $each: users
                }
            }
        },
        { new: true }
    );

    return updatedProject;
};

const getProjectById = async ({projectId}) => {
    if(!projectId) {
        throw new Error("ProjectId is required!!");
    }

    if(!mongoose.Types.ObjectId.isValid(projectId)){
        throw new Error("Invalid ProjectId!!");
    }

    const project = await Project.findOne({
        _id: projectId
    })

    return project
}

module.exports = {
    createProject, 
    getAllProjectsByUserId, 
    addUsersToProject,
    getProjectById
}
const Project = require('../models/project')

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

module.exports = createProject
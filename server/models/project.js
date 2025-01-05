const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        lowercase: true,
        required: true,
        trim: true,
        unique: [true, "Project name must be Unique!!"],
    },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
        }
    ]
})

const Project = mongoose.model('project', projectSchema)

module.exports = Project
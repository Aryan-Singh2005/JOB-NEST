import mongoose from "mongoose";
const jobSchema = new mongoose.Schema({
    title: {
    },
    description: {
        type: String,
        required: true,
    },
    requirements: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
    jobType:{
        type: String,
        required: true,
    },
    company:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        required: true,
    },
    created_by:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    application:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Application",
        default: null,
    }
})

export const Job = mongoose.model("Job",jobSchema);

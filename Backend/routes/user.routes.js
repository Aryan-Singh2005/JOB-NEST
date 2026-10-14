import express from "express";
import { login, register, updateProfile, logout, toggleSaveJob, getSavedJobs } from "../controllers/user.controller.js";
import authenticateToken from "../middleware/isauthenticated.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.route("/register").post(singleUpload,register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/profile/update").post(authenticateToken,singleUpload,updateProfile);

// Saved Jobs routes
router.route("/save/:id").post(authenticateToken, toggleSaveJob);
router.route("/saved-jobs").get(authenticateToken, getSavedJobs);

export default router;
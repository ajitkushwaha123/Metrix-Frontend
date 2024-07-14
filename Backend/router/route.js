// routes/userRoutes.js
import { Router } from "express";
import * as controller from '../controllers/appControllers.js';
import Auth from "../middleware/auth.js"; // Assuming Auth is the middleware for authentication
import { registerMail } from "../controllers/mailer.js";

const router = Router();

// POST: Register user
router.route('/register').post(controller.register);

// POST: Send registration email
router.route('/registerMail').post(registerMail);

// POST: User login
router.route('/login').post(controller.verifyUser, controller.login);

// POST: Authenticate (placeholder)
router.route('/authenticate').post(controller.verifyUser, (req, res) => res.end());

// GET: Get user details by username
router.route('/user/:username').get(controller.getUser);
router.route('/test').get((req , res) => {
    res.send("hi");
})
// PUT: Update user data (requires authentication)
router.route('/updateuser').put(Auth, controller.updateUser);

// PUT: Reset user password
router.route('/resetPassword').put(controller.verifyUser, controller.resetPassword);

export default router;

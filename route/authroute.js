import { Router } from "express";
import { signUp, signIn} from "../controller/authcontroller.js";
const router = Router();

router.route("/signup").post(signUp)
router.route("/signin").post(signIn)

export default router;
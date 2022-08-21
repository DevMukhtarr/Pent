import { Router } from "express";
import { 
    createReview,
    visitorRating, 
    viewAllReviews, 
    sortAllReviewsByHelpful, 
    sortAllReviewsByMostRecent
} from "../controller/maincontroller.js";
import { verifyToken } from "../middleware/auth.js";

const router = Router();

router.route("/create-review").post(verifyToken, createReview)
router.route("/visitor-rating").post(visitorRating)
router.route("/view-all-reviews").get(viewAllReviews)
router.route("/view-reviews-by-helpful").get(sortAllReviewsByHelpful)
router.route("/view-reviews-by-recent").get(sortAllReviewsByMostRecent)

export default router
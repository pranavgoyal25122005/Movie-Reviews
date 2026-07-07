import express from "express"
import ReviewsCtrl from "./reviews.controller.js"
const router = express.Router() //this is a router to our url which would route incoming requests to different parts of our application.

router.route("/movie/:id").get(ReviewsCtrl.apiGetReviews)//the colon after which id is there helps us to treat id as a variable where we can put id for a specific movie.//get reviews get all the reviews for a particular movie.
router.route("/new").post(ReviewsCtrl.apiPostReview)
router.route("/:id")
    .get(ReviewsCtrl.apiGetReview)//apiGetReview these are functions which would be called when functions like get put delete will be called.
    .put(ReviewsCtrl.apiUpdateReview)
    .delete(ReviewsCtrl.apiDeleteReview)


export default router
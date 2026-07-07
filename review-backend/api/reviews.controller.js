import ReviewsDAO from "../dao/reviewsDAO.js" //this is about interacting with the database.
export default class ReviewsController{
  static async apiPostReview(req , res , next){
    try{//this function will try the following and if there is an error then catch will catch an error.
      const movieId = parseInt(req.body.movieId) //body of the request is some json.
      const review = req.body.review
      const user = req.body.user//these things will be available in the json which will be there with the request.
      console.log('movieId',movieId)
      const reviewResponse = await ReviewsDAO.addReview(//we are awaiting the response of addReview function
        movieId,
        user,
        review
      )
      res.json({status: "success"})
    } catch(e) {
      res.status(500).json({error: e.message})
    }
  }
  static async apiGetReview(req, res , next){
    try{
      let id = req.params.id || {} //here we are doing re.params and we saw in the earlier file we used /:id where id is a param which we are going to use here. We get some params from the url itself. either we will receive a param id or a empty object.
      let review = await ReviewsDAO.getReview(id)
      if (!review){
        res.status(404).json({error: "Not found"})
        return
      }
      res.json(review)
    } catch(e){
      console.log(`api, ${e}`)
      res.status(500).json({error: e})
    }
  }

  static async apiUpdateReview(req,res,next) {
    try{
      const reviewId = req.params.id
      const review = req.body.review
      const user = req.body.user

      const reviewResponse = await ReviewsDAO.updateReview(
        reviewId,
        user,
        review
      )

      var{ error } = reviewResponse
      if(error) {
        res.status(400).json({error})
      }

      if(reviewResponse.modifiedCount === 0){ //modifiedCount will be part of the return from mongodb.
        throw new Error(
          "unable to update review",
        )
      }
      res.json({status: "success"})
    } catch (e) {
      res.status(500).json({error: e.message})
    }
  }

  static async apiDeleteReview(req,res,next){
    try{
      const reviewId = req.params.id
      const reviewResponse = await ReviewsDAO.deleteReview(reviewId)
      res.json({status: "success"})
      
    } catch(e){
      res.status(500).json({error: e.message})
    }
  }

  static async apiGetReviews(req,res,next){
    try{
      let id = req.params.id || {}
      let reviews = await ReviewsDAO.getReviewsByMovieId(id)
      if(!reviews){
        res.status(404).json({error : "Not found"})
        return
      }
      res.json(reviews)
    } catch(e){
      console.log(`api, ${e}`)
      res.status(500).json({error: e})
    }
  }
}

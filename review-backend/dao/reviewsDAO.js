//here we will connect the mongodb connection to the reviewsdb
import mongodb from "mongodb"
const ObjectID = mongodb.ObjectId //ObjectID is a kind of data type that is used in searching for something in the database.

let reviews

export default class ReviewsDAO {
  static async injectDB( conn){ //using the static we can access a function without creating an instance of that class. And we are passing a connection in this function
    if(reviews){
      return//if there is already a database connection so we will return.
    }
    try{
      reviews = await conn.db("reviews").collection("reviews") //we will get the database called reviews and in that we will get the reviews collection.
    } catch(e){
      console.error(`Unable to establish collection handles in userDAO:${e}`)
    }
  }

  static async addReview(movieId , user , review ){
    try{
      const reviewDoc = {//here we have created a javascript object
        movieId: movieId,
        user: user,
        review: review,
      }
      console.log("adding")
      return await reviews.insertOne( reviewDoc)//insertOne is a mongodb command that is what is that you are inserting in the database.
    } catch(e){
      console.error(`Unable to post review: ${e}`)
      return { error: e }
    }
  }

  static async getReview(reviewId){
    try{
      return await reviews.findOne({ _id: new ObjectID(reviewId)})//reviewId which is probably a string gets converted by ObjectId to an _id type which is frequently used for searching in the databases.
    } catch(e) {
      console.error(`Unable to get review: ${e}`)
      return {error: e/*`Unable to get answer ${e}`*/}
    }
  }

  static async updateReview( reviewId,user,review){
    //console.log("rev", reviewId)
    try{
      const updateResponse = await reviews.updateOne(
        { _id: new ObjectID(reviewId) },
        { $set: { user: user, review: review } }// set is specific to mongodb
        )

      return updateResponse
    } catch(e) {
      console.error(`Unable to update review: ${e}`)
      return {error: e}
    }
  }

  static async deleteReview(reviewId){

    try{
      const deleteResponse = await reviews.deleteOne({
      _id: new ObjectID(reviewId),
      })

      return deleteResponse
    } catch(e) {
      console.error(`Unable to delete review: ${e}`)
      return { error: e}
    }
  }
  static async getReviewsByMovieId(movieId) {
    //console.log("mov", movieId)
    try{
      const cursor = await reviews.find({movieId: parseInt(movieId)}) // when you find multiple items then you return a cursor ,movieId will be converted from string to integer to a integer by using parseInt and then cursor will be kind of a list of objects and that is why we need to convert it to an array.
      return cursor.toArray()
    } catch(e){
      console.error(`Unable to get review: ${e}`)
      return { error: e}
    }
  }
}

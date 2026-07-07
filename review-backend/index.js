import app from "./server.js"
import mongodb from "mongodb"
import ReviewsDAO from "./dao/reviewsDAO.js" //data access object
//import { X509Certificate } from "crypto"


const MongoClient = mongodb.MongoClient
const mongo_username = process.env[`MONGO_USERNAME`]
const mongo_password = process.env[`MONGO_PASSWORD`]
const uri=`mongodb+srv://${mongo_username}:${mongo_password}@cluster0.owox3qc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0` //using back ticks allows us to use javascript variables from inside the string.

const port = 8000 //this is related to a server.

MongoClient.connect(
    uri,
  {
    maxPoolSize: 50,
    wtimeoutMS : 2500,
    useNewUrlParser: true //this has to be always set to true in case of using the mongodb database.
  }
)
.catch(err => {
  console.error(err.stack)
  process.exit(1) //exiting the program we would be running.
})//to catch any errors, err is a function which would catches the javascript errors.
//async is a function that can runs alongside other functions.

.then(async client => {
  await ReviewsDAO.injectDB(client)
  app.listen(port, () =>{
    console.log(`listening on port ${port}`)
  })//this is how you start a server, inside listen we are passing port and a function () inside which we are passing nothing but we expect that function to return an output.
})
//we also need to create a route.

//we are making a connect with the database here but we are accessing the database through the reviewsDAO which is there in the other file so somehow we will also have to pass the handling to that file.
//this happens in the await ReviewsDAO.inject(client)
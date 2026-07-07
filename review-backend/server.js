//main server code
import express from "express"
import cors from "cors"
import reviews from "./api/reviews.route.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/v1/reviews", reviews)
app.use("*",(req,res) => res.status(404).json({error: "not found"}))

export default app //to import code in other files we use an export function in the file which contains the code.
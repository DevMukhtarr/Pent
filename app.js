import express from "express";
import authRoute from "./route/authroute.js";
import mainRoute from "./route/mainroute.js";
import connect from "./config/connect.js";
import cors from "cors"
const app = express()


app.use(connect)
app.use(
    express.urlencoded({
      extended: false,
    })
  );
  
app.use(express.json());
app.use(authRoute)
app.use(mainRoute)

app.use(cors())

export default app
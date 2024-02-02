const express = require("express")
const router = require("./api/router")
const cors = require("cors")
const {PORT} = require("./config")
const app = express()

app.use(cors({origin:"http://localhost:5173"}));
app.use(express.json());

app.use("/api/v1",router)

app.listen(PORT,()=>{
    console.log("server running on ", PORT)
})
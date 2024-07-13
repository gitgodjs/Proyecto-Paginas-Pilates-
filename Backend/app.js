const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const authenticate = require("./auth/authenticate");

require("dotenv").config();

const port = 4000; //process.env.PORT || 

app.use(cors({
    origin: 'http://localhost:5173', 
    optionsSuccessStatus: 200 
  }));

//app.use(express.json());
app.use(bodyParser.json());

async function main(){
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log("Connected to MongoDB");
}

main().catch(console.error);

app.use("/api/signup", require("./Rutas/signup"));
app.use("/api/login", require("./Rutas/login"));
app.use("/api/user", authenticate, require("./Rutas/user"));
app.use("/api/comentarios", require("./Rutas/comentarios"));
app.use("/api/refresh-token", require("./Rutas/refreshToken"));
app.use("/api/upload", require("./Rutas/upload"));

app.get("/", (req, res)=> {
    res.send('Hello word!');
});

app.listen(port, ()=>{
    console.log('Escucha port: ', port);
});
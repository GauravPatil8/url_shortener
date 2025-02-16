const express = require("express");
const connectToMongo = require("./connect");
const {handleURLRedirect} = require("./controllers/url")
const urlRoute = require("./routes/url");


const app = express();
const PORT = 8000;

connectToMongo("mongodb://127.0.0.1:27017/urlShortener").then(console.log("mongoDB connected"));
app.use(express.json());
app.use("/url", urlRoute); 
app.get("/:shortId", handleURLRedirect);
app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}/`));

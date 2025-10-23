import express from "express"
import App from "./src/app.js"

const port = 8000;

App.listen(port, () => console.log("Server running on port: " + port))

import "dotenv/config";
import App from "./src/app.js";

const PORT = process.env.PORT || 5000;

App.listen(PORT, () => console.log("Server Running: " + PORT));

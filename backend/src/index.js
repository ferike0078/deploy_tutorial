import "dotenv/config"; //.env ből szedjük ki az adatokat
import app from "./app.js";
import connectDB from "./config/database.js";

const startServer = async () => {
  //ez inditja a teljes alkalmazást
  try {
    await connectDB();

    const port = process.env.PORT || 8000;
    const server = app.listen(port, () => {
      console.log(`Server running on PORT: ${port}`);
    });

    server.on("error", (err) => {
      //alacsony szintű szerver hibák kezelése, foglalt a port
      console.error("Server error:", err);
    });
  } catch (error) {
    console.error("MongoDB connection failed");
  }
};

startServer();

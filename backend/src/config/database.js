import mongoose from "mongoose"; //kommunikál az adatbázissal, 'mongoDB' - ORM
import { DB_NAME } from "./constants.js"; //Applikációnak a neve a clusteren belül

const connectDB = async () => {
  //csatlakozunk az adatbáziushoz
  try {
    const uri = process.env.MONGO_URI; //kivesszük a környezeti változót /.env
    if (!uri) {
      throw new Error("Missing MongoDB URI");
    }
    const connectonInstance = await mongoose.connect(uri, { dbname: DB_NAME }); //csatlakozás a mongoDB-hez, a név alapján ahhoz a database-hez
    console.log(
      `MongoDB connected: ${connectonInstance.connection.host}/${DB_NAME}`, //host + név logolása
    );
  } catch (error) {
    console.error("MongoDB connection failed:", error.message); // Ha van hiba itt kapjuk el
    process.exit(1); //Leáll a Node.js ha van hiba
  }
};

export default connectDB;

process.on("uncaughtException", function (err) {
  console.error("uncaughtException: %o", err);
});
import app from "./app";
import dotenv from "dotenv";
import mongoose from "mongoose";

let dbConnection: any = null;

async function main() {
  dotenv.config();
  const db = process.env.MONGO_URL;

  dbConnection = await mongoose
    .connect(db)
    .then(() => {
      console.log(`MongoDB Connected...`);
    })
    .catch((err) => console.error(err));

  app.listen(3333, () => {
    return console.log(`Listening at http://localhost:3333`);
  });
}

main();

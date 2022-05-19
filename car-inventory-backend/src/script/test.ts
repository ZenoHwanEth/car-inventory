import mongoose from "mongoose";
import dotenv from "dotenv";
import carModel from "../model/car-model";
import { CarStatus } from "../enum/car-status";
let dbConnection: any = null;

async function main() {
  dotenv.config();
  const db = process.env.MONGO_URL;

  await mongoose
    .connect(db)
    .then(() => {
      console.log(`MongoDB Connected...`);
    })
    .catch((err) => console.error(err));

  dbConnection = mongoose.connection;

  const result = await carModel.insertMany([
    {
      status: CarStatus.NEW,
      carPrice: 1111,
      carMake: "PROTON",
      carModel: "PERODUA",
    },
  ]);

  console.log(result);
}

main().then(() => {
  if (dbConnection) {
    dbConnection.close().then(() => {
      process.exit();
    });
  }
});

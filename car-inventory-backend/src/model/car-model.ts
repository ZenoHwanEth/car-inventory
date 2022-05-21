import mongoose, { Schema, Document } from "mongoose";
import { CarStatus } from "../enum/car-status";
import { v4 as uuidv4 } from "uuid";

export interface ICarInventoryLean {
  _id?: string;
  sku: string; // SKU
  status: CarStatus;
  carPrice: number;
  carMake: string;
  carModel: string;
  carPlate: string;
  soldPrice?: number;
  soldDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ICarInventory = ICarInventoryLean & Document;

const CarInventorySchema: Schema = new Schema(
  {
    _id: { type: String, default: uuidv4() },
    sku: { type: String, required: true, unique: true },
    status: {
      type: String,
      required: true,
      index: true,
      enum: CarStatus,
      default: CarStatus.NEW,
    },
    carPrice: { type: Number, required: true },
    carMake: { type: String, required: true },
    carModel: { type: String, required: true },
    carPlate: { type: String, required: true, unique: true },
    soldPrice: { type: Number },
    soldDate: { type: Date },
  },
  { timestamps: true }
);

interface CarInventoryInterface extends mongoose.Model<ICarInventory> {}

export default mongoose.model<ICarInventory, CarInventoryInterface>(
  "CarInventory",
  CarInventorySchema
);

import { Router, Request, Response, NextFunction } from "express";
import carModel from "./model/car-model";
import { CarStatus } from "./enum/car-status";
import { ICarInventoryLean } from "./model/car-model";

const routes = Router();

routes.get("/", (req, res) => {
  return res.json({ message: "Welcome to car inventory management" });
});

routes.post("/addCar", async (req: Request, res: Response) => {
  const reqBody: ICarInventoryLean = req.body;

  try {
    await carModel.insertMany({
      status: CarStatus.NEW,
      sku: reqBody.sku,
      carPrice: reqBody.carPrice,
      carMake: reqBody.carMake,
      carModel: reqBody.carModel,
      carPlate: reqBody.carPlate,
    });
  } catch (err) {
    return res.status(500).json(`Add car error : ${err.message}`);
  }

  return res
    .status(200)
    .json(`Add car successfully added, ${JSON.stringify(req.body)}`);
});

routes.post("/viewCarInfo", async (req: Request, res: Response) => {
  const id = req.body.id;
  const result: ICarInventoryLean = await carModel.findById(id);

  return res.status(200).json(result);
});

routes.post("/soldCar", async (req: Request, res: Response) => {
  const id = req.body.id;
  const soldPrice = req.body.soldPrice;
  await carModel.findByIdAndUpdate(id, {
    $set: {
      status: CarStatus.PURCHASED,
      soldPrice: soldPrice,
      soldDate: Date.now(),
    },
  });

  return res.status(200).json("done");
});

routes.post("/findPlateNumber", async (req: Request, res: Response) => {
  const carPlateNumber = req.body.carPlateNumber ?? "";

  const args: any = {};
  if (carPlateNumber) {
    args.carPlate = carPlateNumber;
  }

  try {
    const carInventoryItems = await carModel
      .find(args)
      .limit(20)
      .read("secondary");
    return res.status(200).json(carInventoryItems);
  } catch (err) {
    return res.status(500).json(`Search Car info : ${err.message}`);
  }
});

export default routes;

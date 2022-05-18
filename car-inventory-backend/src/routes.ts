import { Router } from "express";

const routes = Router();

routes.get("/", (req, res) => {
  return res.json({ message: "Welcome to car inventory management" });
});

export default routes;

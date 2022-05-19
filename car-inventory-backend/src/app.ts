import bodyParser from "body-parser";
import express from "express";

import routes from "./routes";
class App {
  public server;

  constructor() {
    this.server = express();
    this.server.use(bodyParser.json());
    this.routes();
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;

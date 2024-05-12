import { Router } from "express";
import {
  newAction,
  getDataAction,
  getFirstAction,
} from "../controller/actionController.js";

const actionRoutes = Router();

actionRoutes.post("/new", newAction);
actionRoutes.get("/", getFirstAction);
actionRoutes.get("/search", getDataAction);

export default actionRoutes;

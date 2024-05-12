import { Router } from "express";
import { newDataSensor, getFirstData, getDataSensor } from "../controller/dataCtrl.js";

const dataRoutes = Router();

dataRoutes.get('/', getFirstData);
dataRoutes.get('/search', getDataSensor);
dataRoutes.post('/new', newDataSensor);

export default dataRoutes;
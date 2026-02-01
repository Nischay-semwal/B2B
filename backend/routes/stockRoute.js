import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";
import { addStock,getMyStock,updateStock,deleteStock, getAvailableStocks } from "../controller/stock-controller.js";
import verifiedWholesaler from "../middleware/verifiedWholesaler.js";
import { upload } from '../middleware/upload.js';

const stockRoute = express.Router();

stockRoute.use(verifyToken);
stockRoute.get('/available',authorizeRoles('RETAILER'),getAvailableStocks);

stockRoute.use(authorizeRoles("WHOLESALER"));
stockRoute.use(verifiedWholesaler);

stockRoute.post("/",upload.single("image"), addStock);          
stockRoute.get("/", getMyStock);        
stockRoute.put("/:stockId", updateStock);
stockRoute.delete("/:stockId", deleteStock);


export default stockRoute;

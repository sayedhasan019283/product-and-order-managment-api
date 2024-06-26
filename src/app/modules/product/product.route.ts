import  express  from "express";
import { productController } from "./product.controller";

const router = express.Router();

router.post('/products', productController.createProduct);
router.get('/products', productController.getAllProduct)
router.get('/products/:productId', productController.retrieveOneSpecificProductByID)
router.put('/products/:productId', productController.UpdateProductInformation)
router.delete('/products/:productId', productController.deleteProduct)

export const productRoutes = router;
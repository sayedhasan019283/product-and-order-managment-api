import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { studentRoutes } from './app/modules/student/student.route'
import { productRoutes } from './app/modules/product/product.route'
import { orderRouter } from './app/modules/order/order.route'
const app: Application = express()

// parser
app.use(express.json())
app.use(cors())


//application routes
app.use('/api/v1/students', studentRoutes);
app.use('/api', productRoutes);
app.use('/api', orderRouter);

app.get('*', (req, res) => {
  res.status(200).json({
    "success": false,
    "message": "Route not found"
   });
});
app.get('/', (req : Request, res : Response) => {
  res.send('Hello World!')
})

export default app
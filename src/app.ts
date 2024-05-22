import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { productRoutes } from './app/modules/product/product.route'
import { orderRouter } from './app/modules/order/order.route'
const app: Application = express()

// parser
app.use(express.json())
app.use(cors())


//application routes
// product route
app.use('/api', productRoutes);
// order route
app.use('/api', orderRouter);


app.get('/', (req : Request, res : Response) => {
  res.send('Hello World!')
})

app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});


export default app
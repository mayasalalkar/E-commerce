const express = require('express')
const connectDB= require('./config/db');
const cors = require('cors');
const orderRoutes=require('./router/orderRouter');
const authRoutes=require('./router/authRouters');
const productRouters=require('./router/productRouter');

const errorMiddleware=require('./Middelwere/errorMiddelwere');
const app= express();
connectDB();
app.use(cors())
app.use(express.json())
app.use('/api/auth', authRoutes)
app.use("/api/products", productRouters)
app.use('/api/orders', orderRoutes);
app.use(errorMiddleware);

const PORT= process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Example app listening on port${PORT}!`));
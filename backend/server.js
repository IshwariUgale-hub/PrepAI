require('dotenv').config();

const app = require('./src/app');
const  connectDB  = require('./src/config/db');
const authRoutes = require('./src/routes/auth.routes');

console.log(process.env.MONGODB_SERVER);
connectDB();



app.use('/api/auth', authRoutes);


const port =process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`server is runnning on http://localhost:${port}`);
})
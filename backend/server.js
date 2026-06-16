require('dotenv').config();

const app = require('./src/app');
const  connectDB  = require('./src/config/db');
console.log(process.env.MONGODB_SERVER);
connectDB();

const port =process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`server is runnning on http://localhost:${port}`);
})
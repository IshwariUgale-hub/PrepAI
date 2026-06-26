const dns = require('dns');

dns.setDefaultResultOrder('ipv4first');

dns.setServers([
    '1.1.1.1',
    '8.8.8.8'
]);


require('dotenv').config();
require('./src/config/env');

const app = require('./src/app');
const  connectDB  = require('./src/config/db');
const authRoutes = require('./src/routes/auth.routes');


connectDB();



app.use('/api/auth', authRoutes);


const port =process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`server is runnning on http://localhost:${port}`);
})
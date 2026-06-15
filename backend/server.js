
const app = require('./src/app');

const port =5000;

app.listen(port,()=>{
    console.log(`server is runnning on http://localhost:${port}`);
})
const requiredEnvVars = ["MONGODB_SERVER","JWT_SECRET","PORT","JWT_EXPIRES_IN"];

requiredEnvVars.forEach((varName)=>{

    if(!process.env[varName]){
        throw new Error(`Missing required environment variable: ${varName}`)
    }
});

module.exports = {
    PORT: process.env.PORT || 5000,
    MONGODB_SERVER: process.env.MONGODB_SERVER,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
}
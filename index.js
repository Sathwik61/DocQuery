const express= require('express');
const routes = require('./routes/routes');
require('dotenv').config();
const PORT=process.env.PORT || 8080
const cluster =require('cluster')   
const os = require('os')
const http=require('http')
const numCpu=os.cpus().length;
if (cluster.isMaster) {
    for (let i = 0; i < numCpu; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
    });
} else{
    const app=express();
    app.use(express.json())
    app.use(routes);
    http.createServer(app).listen(PORT, () => {
        // console.log(`Worker ${process.pid} started`);
        console.log('Server is runnign at Port ',PORT);
    });
}

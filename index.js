const cluster = require("cluster");

if (cluster.isMaster) {
    console.log(`Master process with pid ${process.pid} starting...`);
    cluster.on("message", (worker, msg) => {
        console.log(`message ${msg} recieved from worker`)
    })
    
    var cpuCount = require('os').cpus().length;
    for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }

    cluster.on("online", worker => {
        console.log(
            `worker with id:${worker.id} & pid:${worker.process.pid} is online`
        )
    })
    cluster.on("exit", (worker, code, signal) => {
        console.log(
            `worker with id:${worker.id} & pid:${worker.process.pid} died with code:${code} and signal:${signal}`
        )
    })
} else {
    const express = require('express');
    const apis = require('./apis/controllers');
    const app = express();
    app.use('/', apis);
    app.listen(8000, () => {
        console.log('listening... POST http://localhost:8000/fibonacci/:num => ' + process.pid);
    });

    module.exports = app;
}




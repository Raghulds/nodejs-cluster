const express = require('express');
const router = express.Router();

router.post('/fibonacci/:num', (req, res) => {
    console.log("Worker thread running on pid -" + process.pid + " and fibonacci for " + req.params.num + "...");
    const result = fibonacci(req.params.num);
    console.log("The result for " + req.params.num + " is " + result);
    res.status(201).send(String(result));
});

function fibonacci(num) {
    if (num === 0) return 0;
    if (num === 1) return 1;
    return fibonacci(num - 1) + fibonacci(num - 2);
};

module.exports = router;
const express = require('express');

const app = express();

app.get('/', (req,res)=>{

    res.send({
        message:"Backend API Running Successfully",
        status:"OK"
    });

});

app.get('/health',(req,res)=>{

    res.send("Healthy");

});

app.listen(3000,()=>{

    console.log("Server started on port 3000");

});

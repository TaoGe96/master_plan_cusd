const express = require('express');
const app=express();

app.listen(process.env.PORT || 3000,()=>{
    console.log('listening...');
})
app.use(express.static('./'))
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"index.html")
})
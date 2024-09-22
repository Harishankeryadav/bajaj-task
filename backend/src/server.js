const express = require('express');  
const bodyParser = require('body-parser');   
const app = express(); 
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const cors = require('cors'); 

app.use(cors({
 origin: ["https://bajaj-task-smoky-rho.vercel.app//bfhl"],
 methods:["POST","GET"],
 credentials:true
}
            ));
 
const bfhlRoutes = require('./routes/bfhl');
 
app.use('/bfhl', bfhlRoutes); 

const PORT = process.env.PORT || 5000;  
app.listen(PORT, () => {   
    console.log(`Server is running on port ${PORT}`);
});

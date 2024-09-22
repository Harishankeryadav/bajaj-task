
const express = require('express');
const bodyParser = require('body-parser');
const bfhlRoutes = require('./routes/bfhl'); 

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/bfhl', bfhlRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors'); 
// const bfhlRoutes = require('./routes/bfhl'); 

// const app = express();

// // Use CORS and configure it to allow your frontend domain
// app.use(cors({
//   origin: "https://bajaj-frontend-final-amber.vercel.app", // Allow only your frontend domain
//   methods: ["POST", "GET", "OPTIONS"], // Allow these methods
//   credentials: true // If you need to allow credentials like cookies
// }));

// // Body parser middleware
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // Root route to prevent "Cannot GET /" error
// app.get('/', (req, res) => {
//   res.send('Welcome to the BFHL API!');
// });

// // Use the BFHL routes
// app.use('/bfhl', bfhlRoutes);

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


// // const express = require('express');
// // const bodyParser = require('body-parser');
// // const cors = require('cors'); // Import CORS
// // const bfhlRoutes = require('./routes/bfhl'); // Import your route

// // const app = express();

// // // Use CORS and configure it to allow your frontend domain
// // app.use(cors({
// //   origin: "https://bajaj-frontend-final-amber.vercel.app", // Allow only your frontend domain
// //   methods: ["POST", "GET", "OPTIONS"], // Allow these methods
// //   credentials: true // If you need to allow credentials like cookies
// // }));

// // // Body parser middleware
// // app.use(bodyParser.json());
// // app.use(bodyParser.urlencoded({ extended: true }));

// // // Root route to prevent "Cannot GET /" error
// // app.get('/', (req, res) => {
// //   res.send('Welcome to the BFHL API!');
// // });

// // // Use the BFHL routes
// // app.use('/bfhl', bfhlRoutes);

// // // Start the server
// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => {
// //   console.log(`Server is running on port ${PORT}`);
// // });


import express from 'express';
import bodyParser from 'body-parser';
import atob from 'atob';
import fileType from 'file-type';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: "https://bajaj-frontend-final-amber.vercel.app",  
  methods: ["POST", "GET", "OPTIONS"],  
  credentials: true 
}));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
 
const separateData = (data) => {
    const numbers = [];
    const alphabets = [];
    let highestLowercase = null;

    if (Array.isArray(data)) {
        data.forEach(item => {
            if (!isNaN(item)) {
                numbers.push(item);
            } else if (typeof item === 'string' && item.match(/^[a-zA-Z]$/)) {
                alphabets.push(item);
                if (item === item.toLowerCase() && (!highestLowercase || item > highestLowercase)) {
                    highestLowercase = item;
                }
            }
        });
    }

    return {
        numbers,
        alphabets,
        highestLowercase: highestLowercase ? [highestLowercase] : []
    };
};
 
const validateFile = async (file_b64) => {
    if (!file_b64) return { file_valid: false };

    try {
        const buffer = Buffer.from(file_b64, 'base64');
        const type = await fileType.fromBuffer(buffer);
        const fileSize = (buffer.length / 1024).toFixed(2);

        return {
            file_valid: true,
            file_mime_type: type ? type.mime : 'application/octet-stream',
            file_size_kb: fileSize
        };
    } catch (error) {
        return { file_valid: false };
    }
};
 
app.post('/bfhl', async (req, res) => {
    const { data, file_b64 } = req.body;

    if (!data || !Array.isArray(data)) {
        return res.status(400).json({
            is_success: false,
            message: "Invalid 'data' field. It should be an array of numbers and alphabets."
        });
    }
 
    const { numbers, alphabets, highestLowercase } = separateData(data);
 
    let fileInfo = { file_valid: false }; 
    if (file_b64) {
        fileInfo = await validateFile(file_b64);  
    }
 
    const response = {
        is_success: true,
        user_id: "Hari_Shanker_Yadav_07092002",  
        email: "ha3154@srmist.edu.in",  
        roll_number: "RA2111003030105",  
        numbers,
        alphabets,
        highest_lowercase_alphabet: highestLowercase,
        ...fileInfo
    };

    res.json(response);
});
 
app.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
});
 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


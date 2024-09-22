const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const bfhlRoutes = require('./routes/bfhl'); 

const app = express();

// Use CORS and configure it to allow your frontend domain
app.use(cors({
  origin: "https://bajaj-frontend-final-amber.vercel.app", // Allow only your frontend domain
  methods: ["POST", "GET", "OPTIONS"], // Allow these methods
  credentials: true // If you need to allow credentials like cookies
}));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Root route to prevent "Cannot GET /" error
app.get('/', (req, res) => {
  res.send('Welcome to the BFHL API!');
});

// Use the BFHL routes
app.use('/bfhl', bfhlRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors'); // Import CORS
// const bfhlRoutes = require('./routes/bfhl'); // Import your route

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

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');
require('dotenv').config();

const app = express();

// 1. Performance Optimization Middleware
app.use(compression()); // Compresses response bodies for faster load times

// 2. Security Middleware
// crossOriginResourcePolicy: false rakha hai taake frontend par images/QR codes load ho sakein
app.use(helmet({ crossOriginResourcePolicy: false })); 

// 3. Ultimate CORS Configuration
const corsOptions = {
    origin: '*', // Frontend kahin se bhi request kare, allow ho jayega
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    credentials: true, // If cookies or sessions are needed
    optionsSuccessStatus: 200 // Legacy browsers support
};
app.use(cors(corsOptions));
app.options(/(.*)/, cors(corsOptions));

// 4. Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Auto-create required upload folders
const dirs = ['./uploads', './uploads/assets', './uploads/profiles', './uploads/qrcodes'];
dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

// Serve uploaded files statically (Frontend directly in files ko access kar payega)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes Integration
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong on the server!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running optimally on port ${PORT}`);
});
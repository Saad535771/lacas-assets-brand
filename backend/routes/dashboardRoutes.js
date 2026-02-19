const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const dashboardController = require('../controllers/dashboardController');

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === 'asset_file') {
            cb(null, 'uploads/assets/');
        } else if (file.fieldname === 'preview_images') {
            cb(null, 'uploads/assets/'); // Reference images bhi yahi save hongi
        } else if (file.fieldname === 'profile_pic') {
            cb(null, 'uploads/profiles/');
        } else {
            cb(null, 'uploads/');
        }
    },
    filename: (req, file, cb) => {
        // Unique suffix add kiya ha ta k multiple images conflict na karein
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// Routes
router.post('/company', dashboardController.addCompany);
router.get('/companies', dashboardController.getCompanies);

// --- Asset Management Routes ---
router.get('/assets', dashboardController.getAllAssets); 

// YAHAN MULTER ADD KIYA HAI (Isi k na hone ki wajah se server crash ho raha tha)
router.put('/asset/:id', upload.fields([
    { name: 'asset_file', maxCount: 1 }, 
    { name: 'preview_images', maxCount: 5 }
]), dashboardController.updateAsset); 

router.delete('/asset/:id', dashboardController.deleteAsset); 

// --- Asset Upload & Specific Company Assets ---
router.post('/asset', upload.fields([
    { name: 'asset_file', maxCount: 1 },        // Sirf 1 ZIP file
    { name: 'preview_images', maxCount: 5 }     // Maximum 5 reference images
]), dashboardController.addAsset);
router.get('/assets/:companyId', dashboardController.getAssetsByCompany);

// --- Employees Routes ---
router.post('/employee', upload.single('profile_pic'), dashboardController.addEmployee);
router.get('/employees/:companyId', dashboardController.getEmployeesByCompany);

module.exports = router;
const db = require('../config/db');
const QRCode = require('qrcode');
const path = require('path');
const fs = require('fs'); // Files ko delete karne k liye fs module add kiya gaya hai

// --- Companies ---
exports.addCompany = (req, res) => {
    const { 
        name, website_url, 
        primary_color_name, primary_color_hex, 
        secondary_color_name, secondary_color_hex, 
        primary_font_name, primary_font_link, 
        secondary_font_name, secondary_font_link 
    } = req.body;

    const query = `INSERT INTO companies (name, website_url, primary_color_name, primary_color_hex, secondary_color_name, secondary_color_hex, primary_font_name, primary_font_link, secondary_font_name, secondary_font_link) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(query, [
        name, website_url, 
        primary_color_name, primary_color_hex, 
        secondary_color_name, secondary_color_hex, 
        primary_font_name, primary_font_link, 
        secondary_font_name, secondary_font_link
    ], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Company and Brand Details added successfully', id: result.insertId });
    });
};

exports.getCompanies = (req, res) => {
    db.query('SELECT * FROM companies', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// --- Assets ---
exports.addAsset = (req, res) => {
    const { company_id, asset_name } = req.body;
    
    const file_path = req.files && req.files['asset_file'] ? req.files['asset_file'][0].path.replace(/\\/g, '/') : null; 

    let preview_images = '';
    if (req.files && req.files['preview_images']) {
        preview_images = req.files['preview_images'].map(file => file.path.replace(/\\/g, '/')).join(',');
    }

    db.query('INSERT INTO assets (company_id, asset_name, file_path, preview_images) VALUES (?, ?, ?, ?)', 
    [company_id, asset_name, file_path, preview_images], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Asset and Previews uploaded successfully', id: result.insertId });
    });
};

exports.getAssetsByCompany = (req, res) => {
    const { companyId } = req.params;
    db.query('SELECT * FROM assets WHERE company_id = ?', [companyId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// --- Naye Asset Management Functions ---

// 1. Get All Assets (Admin Manage Assets table k liye)
exports.getAllAssets = (req, res) => {
    const query = `
        SELECT assets.*, companies.name AS company_name 
        FROM assets 
        LEFT JOIN companies ON assets.company_id = companies.id
        ORDER BY assets.id DESC
    `;
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// 2. Edit Asset Name, Company & Files (Crash-Proof & Logging Add Kar Di Gai Hai)
exports.updateAsset = (req, res) => {
    const { id } = req.params;
    
    // Agar body mein data na aaye toh undefined ki bajaye null set hoga ta k server crash na ho
    const asset_name = req.body.asset_name || null;
    const company_id = req.body.company_id || null; 

    // VS Code Terminal mein check karne k liye logs
    console.log("--- UPDATE ASSET CALLED ---");
    console.log("ID:", id);
    console.log("Body Data:", req.body);
    console.log("Uploaded Files:", req.files);

    // Agar company_id ya asset_name na mile toh frontend ko wapis error bhejo
    if (!asset_name || !company_id) {
        console.error("ERROR: Data is missing. Check your dashboardRoutes.js for multer!");
        return res.status(400).json({ error: "Missing company_id or asset_name. Make sure frontend is sending data properly." });
    }

    db.query('SELECT file_path, preview_images FROM assets WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error("SQL SELECT ERROR:", err);
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) return res.status(404).json({ message: 'Asset not found' });

        const oldAsset = results[0];
        let new_file_path = oldAsset.file_path;
        let new_preview_images = oldAsset.preview_images;

        // ZIP file update logic (with try-catch to prevent crash)
        if (req.files && req.files['asset_file']) {
            try {
                if (oldAsset.file_path && fs.existsSync(oldAsset.file_path)) {
                    fs.unlinkSync(oldAsset.file_path);
                }
            } catch (fsErr) {
                console.error("Old ZIP delete failed, but continuing:", fsErr);
            }
            new_file_path = req.files['asset_file'][0].path.replace(/\\/g, '/');
        }

        // Images update logic (with try-catch to prevent crash)
        if (req.files && req.files['preview_images']) {
            try {
                if (oldAsset.preview_images) {
                    const oldImages = oldAsset.preview_images.split(',');
                    oldImages.forEach(img => {
                        if (fs.existsSync(img)) fs.unlinkSync(img);
                    });
                }
            } catch (fsErr) {
                console.error("Old Images delete failed, but continuing:", fsErr);
            }
            new_preview_images = req.files['preview_images'].map(file => file.path.replace(/\\/g, '/')).join(',');
        }

        // Database update query
        db.query('UPDATE assets SET company_id = ?, asset_name = ?, file_path = ?, preview_images = ? WHERE id = ?', 
        [company_id, asset_name, new_file_path, new_preview_images, id], (err, result) => {
            if (err) {
                console.error("SQL UPDATE ERROR:", err);
                return res.status(500).json({ error: err.message });
            }
            console.log("Asset Updated Successfully!");
            res.json({ message: 'Asset updated successfully' });
        });
    });
};

// 3. Delete Asset (Database + Folder sy files remove karna)
exports.deleteAsset = (req, res) => {
    const { id } = req.params;
    
    // Pehle file paths get karein ta k folder sy delete kar sakein
    db.query('SELECT file_path, preview_images FROM assets WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'Asset not found' });

        const asset = results[0];

        // Delete Zip File from Backend Folder safely
        try {
            if (asset.file_path && fs.existsSync(asset.file_path)) {
                fs.unlinkSync(asset.file_path);
            }
        } catch (fsErr) {
            console.error("Delete ZIP error:", fsErr);
        }

        // Delete Preview Images from Backend Folder safely
        try {
            if (asset.preview_images) {
                const images = asset.preview_images.split(',');
                images.forEach(img => {
                    if (fs.existsSync(img)) {
                        fs.unlinkSync(img);
                    }
                });
            }
        } catch (fsErr) {
            console.error("Delete Images error:", fsErr);
        }

        // Ab Database sy record delete karein
        db.query('DELETE FROM assets WHERE id = ?', [id], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Asset and associated files deleted successfully' });
        });
    });
};

// --- Employees & QR Code Generation ---
exports.addEmployee = async (req, res) => {
    const { company_id, name, designation, department, portfolio_link, address, experience } = req.body;
    const profile_pic_path = req.file ? req.file.path.replace(/\\/g, '/') : null;

    // Yahan hum image ka pura URL bana rahe hain taake Google Lens isko pick kar sake
    const fullImageUrl = profile_pic_path ? `http://localhost:5000/${profile_pic_path}` : '';
    const photoTag = fullImageUrl ? `\nPHOTO;VALUE=URI:${fullImageUrl}` : '';

    // QR Code data mein photoTag shamil kar diya gaya hai
    const qrDataText = `BEGIN:VCARD\nVERSION:3.0\nFN:${name}\nORG:${department}\nTITLE:${designation}\nURL:${portfolio_link}\nADR:;;${address};;;;\nNOTE:Experience: ${experience}${photoTag}\nEND:VCARD`;
    
    const qrFileName = `qr_${Date.now()}.png`;
    const qrPath = path.join('uploads', 'qrcodes', qrFileName).replace(/\\/g, '/');

    try {
        await QRCode.toFile(qrPath, qrDataText, {
            errorCorrectionLevel: 'H' 
        });

        db.query('INSERT INTO employees (company_id, name, designation, department, portfolio_link, address, experience, profile_pic_path, qr_code_path) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [company_id, name, designation, department, portfolio_link, address, experience, profile_pic_path, qrPath],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Employee added & QR generated successfully', id: result.insertId });
        });
    } catch (err) {
        res.status(500).json({ error: 'Failed to generate QR Code' });
    }
};

exports.getEmployeesByCompany = (req, res) => {
    const { companyId } = req.params;
    db.query('SELECT * FROM employees WHERE company_id = ?', [companyId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};
const db = require('../config/db');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

exports.login = (req, res) => {
    const { email, password } = req.body;
    db.query('SELECT * FROM admin WHERE email = ?', [email], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(401).json({ message: 'Admin not found' });

        const admin = results[0];
        if (password === admin.password || bcrypt.compareSync(password, admin.password)) {
            res.json({ message: 'Login successful', adminId: admin.id });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    });
};

exports.forgotPassword = (req, res) => {
    const { email } = req.body;
    const resetToken = crypto.randomBytes(32).toString('hex');

    db.query('UPDATE admin SET reset_token = ? WHERE email = ?', [resetToken, email], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Email not found' });

        const resetLink = `http://localhost:5173/reset-password?token=${resetToken}`;
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Admin Panel Password Reset',
            html: `<p>You requested a password reset.</p><p>Click <a href="${resetLink}">here</a> to reset your password.</p>`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) return res.status(500).json({ error: error.message });
            res.json({ message: 'Password reset link sent to your email.' });
        });
    });
};

exports.resetPassword = (req, res) => {
    const { token, newPassword } = req.body;
    const hashedPassword = bcrypt.hashSync(newPassword, 10);

    db.query('UPDATE admin SET password = ?, reset_token = NULL WHERE reset_token = ?', [hashedPassword, token], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(400).json({ message: 'Invalid token' });

        res.json({ message: 'Password reset successfully.' });
    });
};
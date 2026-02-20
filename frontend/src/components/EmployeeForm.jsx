<<<<<<< Updated upstream
import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const EmployeeForm = ({ companies, empData, setEmpData, setEmpPic, submitEmployee }) => {
  return (
    <Form onSubmit={submitEmployee}>
      <Row>
        <Col md={6} className="mb-3">
          <Form.Label>Select Company</Form.Label>
          <Form.Select onChange={e => setEmpData({...empData, company_id: e.target.value})} required>
            <option value="">Choose...</option>
            {companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </Form.Select>
        </Col>
        <Col md={6} className="mb-3"><Form.Label>Name</Form.Label><Form.Control type="text" onChange={e => setEmpData({...empData, name: e.target.value})} required /></Col>
        <Col md={6} className="mb-3"><Form.Label>Designation</Form.Label><Form.Control type="text" onChange={e => setEmpData({...empData, designation: e.target.value})} required /></Col>
        <Col md={6} className="mb-3"><Form.Label>Department</Form.Label><Form.Control type="text" onChange={e => setEmpData({...empData, department: e.target.value})} required /></Col>
        <Col md={6} className="mb-3"><Form.Label>Portfolio Link</Form.Label><Form.Control type="url" onChange={e => setEmpData({...empData, portfolio_link: e.target.value})} /></Col>
        <Col md={6} className="mb-3"><Form.Label>Experience</Form.Label><Form.Control type="text" onChange={e => setEmpData({...empData, experience: e.target.value})} /></Col>
        <Col md={12} className="mb-3"><Form.Label>Address</Form.Label><Form.Control as="textarea" rows={2} onChange={e => setEmpData({...empData, address: e.target.value})} /></Col>
        <Col md={12} className="mb-3"><Form.Label>Profile Picture</Form.Label><Form.Control type="file" accept="image/*" onChange={e => setEmpPic(e.target.files[0])} required /></Col>
      </Row>
      <Button className="btn-accent" type="submit">Generate Employee QR</Button>
    </Form>
  );
};
=======
import React, { useState } from 'react';
import { Form, Button, Row, Col, Modal, ProgressBar } from 'react-bootstrap';
import api from '../api/axios'; // Make sure path is correct

const EmployeeForm = ({ companies, empData, setEmpData, setEmpPic }) => {
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // 1MB File Size Validation
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // 1MB = 1048576 bytes
      if (selectedFile.size > 1048576) {
        setFileError("File is too large! Please select an image under 1MB.");
        setFile(null);
        setEmpPic(null); // Parent state update
        e.target.value = ''; // Reset input field visually
      } else {
        setFileError('');
        setFile(selectedFile);
        setEmpPic(selectedFile); // Parent state update
      }
    }
  };

  // Local Submit with Progress Bar Tracking
  const handleLocalSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setFileError("Please select a valid profile picture under 1MB.");
      return;
    }

    setIsSubmitting(true);
    setUploadProgress(0);

    const formData = new FormData();
    Object.keys(empData).forEach(key => formData.append(key, empData[key]));
    formData.append('profile_pic', file);

    try {
      await api.post('/dashboard/employee', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          // Progress calculate ho rahi hai
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        }
      });

      // Submit hone ke baad data empty karna
      setEmpData({ company_id: '', name: '', designation: '', department: '', portfolio_link: '', experience: '', address: '' });
      setFile(null);
      setEmpPic(null);
      document.getElementById('employeeProfilePic').value = '';

      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error generating employee", error);
      // Agar error aye toh progress rok do
      setUploadProgress(0);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <style>
        {`
          .form-section-title {
            font-size: 1.1rem;
            color: #1e3c72;
            font-weight: 700;
            border-bottom: 2px solid #e9ecef;
            padding-bottom: 8px;
            margin-bottom: 20px;
            margin-top: 15px;
          }
          .modern-input {
            border-radius: 8px;
            border: 1px solid #ced4da;
            padding: 10px 15px;
            transition: all 0.3s;
          }
          .modern-input:focus {
            border-color: #2a5298;
            box-shadow: 0 0 0 0.2rem rgba(42,82,152, 0.15);
          }
          .custom-modal-content {
            border: none;
            border-radius: 20px;
            padding: 20px;
          }
          .success-icon-circle {
            width: 80px;
            height: 80px;
            background-color: #e8f5e9;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px;
          }
        `}
      </style>

      <Form onSubmit={handleLocalSubmit} className="p-3" autoComplete="off">
        
        {/* --- Work Details --- */}
        <div className="form-section-title">🏢 Work Details</div>
        <Row>
          <Col md={12} className="mb-4">
            <Form.Group>
              <Form.Label className="text-muted fw-semibold small">Select Company <span className="text-danger">*</span></Form.Label>
              <Form.Select className="modern-input" value={empData.company_id || ''} onChange={e => setEmpData({...empData, company_id: e.target.value})} required>
                <option value="">Choose a company...</option>
                {companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-4">
              <Form.Label className="text-muted fw-semibold small">Full Name <span className="text-danger">*</span></Form.Label>
              <Form.Control className="modern-input" type="text" placeholder="e.g., Ali Khan" value={empData.name || ''} onChange={e => setEmpData({...empData, name: e.target.value})} required autoComplete="off" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-4">
              <Form.Label className="text-muted fw-semibold small">Designation <span className="text-danger">*</span></Form.Label>
              <Form.Control className="modern-input" type="text" placeholder="e.g., Software Engineer" value={empData.designation || ''} onChange={e => setEmpData({...empData, designation: e.target.value})} required autoComplete="off" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-4">
              <Form.Label className="text-muted fw-semibold small">Department <span className="text-danger">*</span></Form.Label>
              <Form.Control className="modern-input" type="text" placeholder="e.g., IT / Engineering" value={empData.department || ''} onChange={e => setEmpData({...empData, department: e.target.value})} required autoComplete="off" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-4">
              <Form.Label className="text-muted fw-semibold small">Experience</Form.Label>
              <Form.Control className="modern-input" type="text" placeholder="e.g., 5 Years" value={empData.experience || ''} onChange={e => setEmpData({...empData, experience: e.target.value})} autoComplete="off" />
            </Form.Group>
          </Col>
        </Row>

        {/* --- Additional Info --- */}
        <div className="form-section-title">🔗 Additional Information</div>
        <Row>
          <Col md={12} className="mb-4">
            <Form.Group>
              <Form.Label className="text-muted fw-semibold small">Portfolio / LinkedIn Link</Form.Label>
              <Form.Control className="modern-input" type="url" placeholder="https://linkedin.com/in/..." value={empData.portfolio_link || ''} onChange={e => setEmpData({...empData, portfolio_link: e.target.value})} autoComplete="off" />
            </Form.Group>
          </Col>
          <Col md={12} className="mb-4">
            <Form.Group>
              <Form.Label className="text-muted fw-semibold small">Full Address</Form.Label>
              <Form.Control className="modern-input" as="textarea" rows={2} placeholder="Enter complete office or home address..." value={empData.address || ''} onChange={e => setEmpData({...empData, address: e.target.value})} autoComplete="off" />
            </Form.Group>
          </Col>
        </Row>

        {/* --- Media --- */}
        <div className="form-section-title">📸 Profile Picture</div>
        <Row>
          <Col md={12} className="mb-4">
            <Form.Group>
              <Form.Label className="text-muted fw-semibold small">Upload Image (Max: 1MB) <span className="text-danger">*</span></Form.Label>
              <Form.Control id="employeeProfilePic" className="modern-input" type="file" accept="image/*" onChange={handleFileChange} required />
              
              {/* File Size Error Message */}
              {fileError && <div className="text-danger small mt-2 fw-bold">{fileError}</div>}
              
              {/* Live Progress Bar */}
              {isSubmitting && (
                <div className="mt-3">
                  <div className="d-flex justify-content-between small mb-1 fw-bold text-muted">
                    <span>Uploading & Generating QR...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <ProgressBar now={uploadProgress} variant="success" animated style={{ height: '8px', borderRadius: '5px' }} />
                </div>
              )}
            </Form.Group>
          </Col>
        </Row>

        {/* --- Submit Button --- */}
        <div className="d-flex justify-content-end mt-4">
          <Button 
            type="submit" 
            disabled={isSubmitting || fileError !== ''} // Error ho toh button disable
            className="px-5 py-2 fw-bold shadow-sm"
            style={{ background: 'linear-gradient(135deg, #1e3c72, #2a5298)', border: 'none', borderRadius: '8px', color: 'white' }}
          >
            {isSubmitting ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Processing...
              </>
            ) : (
              'Generate Employee QR'
            )}
          </Button>
        </div>
      </Form>

      {/* --- Success Custom Modal --- */}
      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)} centered backdrop="static">
        <Modal.Body className="text-center custom-modal-content">
          <div className="success-icon-circle">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#2e7d32" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <h4 className="fw-bold mb-2" style={{ color: '#2a3b4c' }}>Employee Added!</h4>
          <p className="text-muted mb-4">Employee details have been saved and QR Code is generated successfully.</p>
          <Button 
            variant="light" 
            className="w-100 fw-bold py-2" 
            style={{ borderRadius: '8px', backgroundColor: '#f1f3f5', color: '#495057' }}
            onClick={() => setShowSuccessModal(false)}
          >
            Add Another
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

>>>>>>> Stashed changes
export default EmployeeForm;
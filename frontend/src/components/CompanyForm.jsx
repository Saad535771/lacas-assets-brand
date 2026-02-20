import React, { useState } from 'react';
import { Form, Button, Row, Col, Modal } from 'react-bootstrap';

const CompanyForm = ({ comp, setComp, submitCompany }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleLocalSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await submitCompany(e);
      
      // Submit hone ke baad sab fields ko strictly khali kar rahay hain
      setComp({
        name: '', website_url: '',
        primary_color_name: '', primary_color_hex: '',
        secondary_color_name: '', secondary_color_hex: '',
        primary_font_name: '', primary_font_link: '',
        secondary_font_name: '', secondary_font_link: ''
      });

      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error saving brand profile", error);
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

      {/* autoComplete="off" browser ko purana data dalne se rokega */}
      <Form onSubmit={handleLocalSubmit} className="p-3" autoComplete="off">
        
        {/* --- Basic Information --- */}
        <div className="form-section-title">🏢 Basic Information</div>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-4">
              <Form.Label className="text-muted fw-semibold small">Company Name <span className="text-danger">*</span></Form.Label>
              <Form.Control className="modern-input" type="text" placeholder="Enter company name" value={comp.name || ''} onChange={e => setComp({...comp, name: e.target.value})} required autoComplete="off" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-4">
              <Form.Label className="text-muted fw-semibold small">Website URL</Form.Label>
              <Form.Control className="modern-input" type="url" placeholder="https://..." value={comp.website_url || ''} onChange={e => setComp({...comp, website_url: e.target.value})} autoComplete="off" />
            </Form.Group>
          </Col>
        </Row>

        {/* --- Brand Colors --- */}
        <div className="form-section-title">🎨 Brand Colors</div>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label className="text-muted fw-semibold small">Primary Color Name</Form.Label>
              <Form.Control className="modern-input" type="text" placeholder="e.g., Navy Blue" value={comp.primary_color_name || ''} onChange={e => setComp({...comp, primary_color_name: e.target.value})} autoComplete="off" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-4">
              <Form.Label className="text-muted fw-semibold small">Primary HEX</Form.Label>
              <Form.Control className="modern-input" type="text" placeholder="e.g., #000000" value={comp.primary_color_hex || ''} onChange={e => setComp({...comp, primary_color_hex: e.target.value})} autoComplete="off" />
            </Form.Group>
          </Col>
          
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label className="text-muted fw-semibold small">Secondary Color Name</Form.Label>
              <Form.Control className="modern-input" type="text" placeholder="e.g., Sky Blue" value={comp.secondary_color_name || ''} onChange={e => setComp({...comp, secondary_color_name: e.target.value})} autoComplete="off" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-4">
              <Form.Label className="text-muted fw-semibold small">Secondary HEX</Form.Label>
              <Form.Control className="modern-input" type="text" placeholder="e.g., #FFFFFF" value={comp.secondary_color_hex || ''} onChange={e => setComp({...comp, secondary_color_hex: e.target.value})} autoComplete="off" />
            </Form.Group>
          </Col>
        </Row>

        {/* --- Typography --- */}
        <div className="form-section-title">🔤 Typography</div>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label className="text-muted fw-semibold small">Primary Font Name</Form.Label>
              <Form.Control className="modern-input" type="text" placeholder="e.g., Arial" value={comp.primary_font_name || ''} onChange={e => setComp({...comp, primary_font_name: e.target.value})} autoComplete="off" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-4">
              <Form.Label className="text-muted fw-semibold small">Primary Font Embed Link</Form.Label>
              <Form.Control className="modern-input" type="url" placeholder="https://fonts.google.com/..." value={comp.primary_font_link || ''} onChange={e => setComp({...comp, primary_font_link: e.target.value})} autoComplete="off" />
            </Form.Group>
          </Col>
          
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label className="text-muted fw-semibold small">Secondary Font Name</Form.Label>
              <Form.Control className="modern-input" type="text" placeholder="e.g., Roboto" value={comp.secondary_font_name || ''} onChange={e => setComp({...comp, secondary_font_name: e.target.value})} autoComplete="off" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-4">
              <Form.Label className="text-muted fw-semibold small">Secondary Font Embed Link</Form.Label>
              <Form.Control className="modern-input" type="url" placeholder="https://fonts.google.com/..." value={comp.secondary_font_link || ''} onChange={e => setComp({...comp, secondary_font_link: e.target.value})} autoComplete="off" />
            </Form.Group>
          </Col>
        </Row>

        {/* --- Submit Button --- */}
        <div className="d-flex justify-content-end mt-4">
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="px-5 py-2 fw-bold shadow-sm"
            style={{ background: 'linear-gradient(135deg, #1e3c72, #2a5298)', border: 'none', borderRadius: '8px', color: 'white' }}
          >
            {isSubmitting ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Saving Profile...
              </>
            ) : (
              'Save Brand Profile'
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
          <h4 className="fw-bold mb-2" style={{ color: '#2a3b4c' }}>Awesome!</h4>
          <p className="text-muted mb-4">The company and its brand guide have been added successfully.</p>
          <Button 
            variant="light" 
            className="w-100 fw-bold py-2" 
            style={{ borderRadius: '8px', backgroundColor: '#f1f3f5', color: '#495057' }}
            onClick={() => setShowSuccessModal(false)}
          >
            Continue Setup
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );    
};

export default CompanyForm;
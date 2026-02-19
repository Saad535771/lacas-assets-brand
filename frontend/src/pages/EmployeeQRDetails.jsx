import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Form } from 'react-bootstrap';
import api from '../api/axios';

// .env file se backend ka URL get kar rahe hain
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const EmployeeQRDetails = () => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState('');
  const [employees, setEmployees] = useState([]);

  // Fetch Companies on load
  useEffect(() => {
    api.get('/dashboard/companies').then(res => setCompanies(res.data));
  }, []);

  // Fetch Employees when a company is selected
  useEffect(() => {
    if (selectedCompanyId) {
      api.get(`/dashboard/employees/${selectedCompanyId}`).then(res => setEmployees(res.data));
    } else {
      setEmployees([]);
    }
  }, [selectedCompanyId]);

  return (
    <div className="bg-light min-vh-100 pb-5">
      <div className="bg-primary-dark text-white text-center py-4 mb-5">
        <h2 className="brand-font fw-bold m-0">Employee Directory & QR Codes</h2>
      </div>

      <Container>
        {/* Company Selection */}
        <Card className="admin-card p-4 mb-5 text-center mx-auto" style={{ maxWidth: '600px' }}>
          <h4 className="brand-font text-primary-dark mb-3">Select Company</h4>
          <Form.Select 
            className="form-control-lg"
            onChange={e => setSelectedCompanyId(e.target.value)}
          >
            <option value="">-- Choose Company --</option>
            {companies.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </Form.Select>
        </Card>

        {/* Employees List */}
        {selectedCompanyId && (
          <Row>
            {employees.length === 0 ? (
              <div className="text-center text-muted">No employees found for this company.</div>
            ) : (
              employees.map(emp => (
                <Col md={6} lg={4} key={emp.id} className="mb-4">
                  <Card className="admin-card h-100">
                    <Card.Body className="text-center">
                      {/* Profile Picture using BACKEND_URL */}
                      <img 
                        src={`${BACKEND_URL}/${emp.profile_pic_path}`} 
                        alt={emp.name} 
                        className="rounded-circle mb-3 border"
                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                      />
                      <h4 className="brand-font fw-bold text-primary-dark">{emp.name}</h4>
                      <p className="text-muted mb-1 fw-bold">{emp.designation}</p>
                      <p className="small mb-3">{emp.department}</p>
                      
                      <hr />
                      
                      {/* QR Code Section using BACKEND_URL */}
                      <h6 className="fw-bold mb-2">Scan for Details</h6>
                      <img 
                        src={`${BACKEND_URL}/${emp.qr_code_path}`} 
                        alt="Employee QR Code" 
                        className="img-fluid mb-3 border p-1"
                        style={{ maxWidth: '150px' }}
                      />
                      <br />
                      
                      {/* Download Button using BACKEND_URL */}
                      <a 
                        href={`${BACKEND_URL}/${emp.qr_code_path}`} 
                        download={`QR_${emp.name}.png`}
                        target="_blank" 
                        rel="noreferrer"
                        className="btn btn-sm btn-accent w-100"
                      >
                        Download QR Code
                      </a>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            )}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default EmployeeQRDetails;
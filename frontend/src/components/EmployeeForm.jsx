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
export default EmployeeForm;
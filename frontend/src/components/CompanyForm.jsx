import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const CompanyForm = ({ comp, setComp, submitCompany }) => {
  return (
    <Form onSubmit={submitCompany}>
      <Row>
        <Col md={6}><Form.Group className="mb-3"><Form.Label>Company Name</Form.Label><Form.Control type="text" value={comp.name} onChange={e => setComp({...comp, name: e.target.value})} required /></Form.Group></Col>
        <Col md={6}><Form.Group className="mb-3"><Form.Label>Website URL</Form.Label><Form.Control type="url" value={comp.website_url} onChange={e => setComp({...comp, website_url: e.target.value})} /></Form.Group></Col>
        
        <Col md={6}><Form.Group className="mb-3"><Form.Label>Primary Color Name</Form.Label><Form.Control type="text" value={comp.primary_color_name} onChange={e => setComp({...comp, primary_color_name: e.target.value})} /></Form.Group></Col>
        <Col md={6}><Form.Group className="mb-3"><Form.Label>Primary HEX (#000000)</Form.Label><Form.Control type="text" value={comp.primary_color_hex} onChange={e => setComp({...comp, primary_color_hex: e.target.value})} /></Form.Group></Col>
        
        <Col md={6}><Form.Group className="mb-3"><Form.Label>Secondary Color Name</Form.Label><Form.Control type="text" value={comp.secondary_color_name} onChange={e => setComp({...comp, secondary_color_name: e.target.value})} /></Form.Group></Col>
        <Col md={6}><Form.Group className="mb-3"><Form.Label>Secondary HEX (#000000)</Form.Label><Form.Control type="text" value={comp.secondary_color_hex} onChange={e => setComp({...comp, secondary_color_hex: e.target.value})} /></Form.Group></Col>
        
        <Col md={6}><Form.Group className="mb-3"><Form.Label>Primary Font Name</Form.Label><Form.Control type="text" value={comp.primary_font_name} onChange={e => setComp({...comp, primary_font_name: e.target.value})} /></Form.Group></Col>
        <Col md={6}><Form.Group className="mb-3"><Form.Label>Primary Font Embed Link</Form.Label><Form.Control type="url" value={comp.primary_font_link} onChange={e => setComp({...comp, primary_font_link: e.target.value})} /></Form.Group></Col>
        
        <Col md={6}><Form.Group className="mb-3"><Form.Label>Secondary Font Name</Form.Label><Form.Control type="text" value={comp.secondary_font_name} onChange={e => setComp({...comp, secondary_font_name: e.target.value})} /></Form.Group></Col>
        <Col md={6}><Form.Group className="mb-3"><Form.Label>Secondary Font Embed Link</Form.Label><Form.Control type="url" value={comp.secondary_font_link} onChange={e => setComp({...comp, secondary_font_link: e.target.value})} /></Form.Group></Col>
      </Row>
      <Button className="btn-accent" type="submit">Save Brand Profile</Button>
    </Form>
  );    
};
export default CompanyForm;
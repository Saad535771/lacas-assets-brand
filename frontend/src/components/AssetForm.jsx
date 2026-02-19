import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const AssetForm = ({ companies, setAssetCompanyId, assetName, setAssetName, setAssetFile, setPreviewImages, submitAsset }) => {
  return (
    <Form onSubmit={submitAsset}>
      <Form.Group className="mb-3"><Form.Label>Select Company</Form.Label>
        <Form.Select onChange={e => setAssetCompanyId(e.target.value)} required>
          <option value="">Choose...</option>
          {companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3"><Form.Label>Asset Package Name (e.g., SVG Logos)</Form.Label><Form.Control type="text" value={assetName} onChange={e => setAssetName(e.target.value)} required /></Form.Group>
      
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3"><Form.Label>1. Upload ZIP File</Form.Label><Form.Control type="file" accept=".zip" onChange={e => setAssetFile(e.target.files[0])} required /></Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>2. Upload Reference Images (Logos to display)</Form.Label>
            <Form.Control type="file" multiple accept="image/*" onChange={e => setPreviewImages(e.target.files)} required />
          </Form.Group>
        </Col>
      </Row>
      <Button className="btn-accent mt-3" type="submit">Upload Asset Bundle</Button>
    </Form>
  );
};
export default AssetForm;
import React from 'react';
import { Form, Button, Row, Col, ProgressBar } from 'react-bootstrap';

const AssetForm = ({
  companies,
  setAssetCompanyId,
  assetName,
  setAssetName,
  setAssetFile,
  setPreviewImages,
  submitAsset,
  isUploading = false,
  uploadProgress = 0,
  assetFile = null,
  previewImages = [],
}) => {
  return (
    <Form onSubmit={submitAsset}>
      <Form.Group className="mb-3">
        <Form.Label>Select Company</Form.Label>
        <Form.Select
          onChange={(e) => setAssetCompanyId(e.target.value)}
          required
          disabled={isUploading}
        >
          <option value="">Choose...</option>
          {companies.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Asset Package Name (e.g., SVG Logos)</Form.Label>
        <Form.Control
          type="text"
          value={assetName}
          onChange={(e) => setAssetName(e.target.value)}
          required
          disabled={isUploading}
        />
      </Form.Group>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>1. Upload ZIP File</Form.Label>
            <Form.Control
              type="file"
              accept=".zip"
              onChange={(e) => setAssetFile(e.target.files?.[0] || null)}
              required
              disabled={isUploading}
            />

            {assetFile && (
              <div className="mt-2 small text-muted">
                Selected: <strong>{assetFile.name}</strong>
              </div>
            )}
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>2. Upload Reference Images (Logos to display)</Form.Label>
            <Form.Control
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => setPreviewImages(Array.from(e.target.files || []))}
              required
              disabled={isUploading}
            />

            {!!previewImages.length && (
              <div className="mt-2 small text-muted">
                {previewImages.length} image{previewImages.length > 1 ? 's' : ''} selected
              </div>
            )}
          </Form.Group>
        </Col>
      </Row>

      {isUploading && (
        <div className="mt-3 mb-2 p-3 rounded border bg-light">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <strong>Uploading Assets...</strong>
            <strong>{uploadProgress}%</strong>
          </div>

          <ProgressBar
            now={uploadProgress}
            label={`${uploadProgress}%`}
            animated={uploadProgress < 100}
            striped={uploadProgress < 100}
          />

          <div className="small text-muted mt-2">
            Please wait while files are uploading...
          </div>
        </div>
      )}

      <Button className="btn-accent mt-3" type="submit" disabled={isUploading}>
        {isUploading ? `Uploading... ${uploadProgress}%` : 'Upload Asset Bundle'}
      </Button>
    </Form>
  );
};

export default AssetForm;
import React from 'react';
import { Row, Col } from 'react-bootstrap';
<<<<<<< Updated upstream

// .env file se backend ka URL get kar rahe hain
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

=======
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
>>>>>>> Stashed changes
const BrandAssetsView = ({ activeCompany, assets }) => {
  return (
    <>
      {/* Logos & Assets Section */}
      <div className="mb-5">
        <h2 className="fw-bold border-bottom pb-2 mb-4" style={{ color: activeCompany.primary_color_hex, fontSize: '1.5rem' }}>Logos & Assets</h2>
<<<<<<< Updated upstream
        
        {assets.length === 0 ? <p className="text-muted small">No assets uploaded yet.</p> : assets.map(asset => {
          const previews = asset.preview_images ? asset.preview_images.split(',') : [];
          
          return (
            <div key={asset.id} className="mb-5">
              
=======
        {assets.length === 0 ? <p className="text-muted small">No assets uploaded yet.</p> : assets.map(asset => {
          const previews = asset.preview_images ? asset.preview_images.split(',') : [];
          return (
            <div key={asset.id} className="mb-5">
>>>>>>> Stashed changes
              {/* Asset Name aur Download Button */}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-bold text-uppercase m-0" style={{ letterSpacing: '0.5px', color: activeCompany.primary_color_hex }}>{asset.asset_name}</h5>
                <a 
                  href={`${BACKEND_URL}/${asset.file_path}`} 
                  download 
                  className="btn btn-sm shadow-sm" 
<<<<<<< Updated upstream
                  style={{ backgroundColor: activeCompany.secondary_color_hex, color: activeCompany.primary_color_hex, fontWeight: 'bold', padding: '8px 20px', borderRadius: '4px', border: `1px solid ${activeCompany.secondary_color_hex}` }} 
=======
                  style={{  backgroundColor: activeCompany.primary_color_hex, fontWeight: 'bold', padding: '8px 20px', borderRadius: '4px', border: `1px solid ${activeCompany.secondary_color_hex}` }} 
>>>>>>> Stashed changes
                  target="_blank" rel="noreferrer"
                >
                  Download .zip Archive
                </a>
              </div>
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
              {previews.length > 0 ? (
                <div>
                  {previews.map((imgUrl, idx) => {
                    // Logic to replicate Xchart Brand Guide layout
                    let bgColor = idx % 2 === 0 ? activeCompany.primary_color_hex : '#ffffff';
<<<<<<< Updated upstream
                    let borderColor = idx % 2 === 0 ? activeCompany.primary_color_hex : '#e9ecef';
                    let sectionTitle = idx === 0 ? "Full Logo" : idx === 1 ? "Full Logo on white" : "Icons";

                    // 3rd Image ko Icon (Square) format mein dikhana hai
=======
                    let borderColor = idx % 2 === 0 ? activeCompany.primary_color_hex : '#c8c8c8';
                    let sectionTitle = idx === 0 ? "Full Logo" : idx === 1 ? "Full Logo on white" : "Icons";
>>>>>>> Stashed changes
                    if (idx >= 2) {
                      return (
                        <div key={idx} className="mb-5">
                          <h6 className="text-muted mb-3">{sectionTitle}</h6>
                          <Row>
                            <Col md={4} className="mb-3">
                              <div className="d-flex align-items-center justify-content-center shadow-sm" style={{ backgroundColor: activeCompany.primary_color_hex, height: '250px', width: '250px', borderRadius: '4px' }}>
                                <img src={`${BACKEND_URL}/${imgUrl}`} alt="Icon Large" style={{ maxHeight: '150px', maxWidth: '150px', objectFit: 'contain' }} />
                              </div>
                            </Col>
                            <Col md={3} className="mb-3">
                              <div className="d-flex align-items-center justify-content-center shadow-sm" style={{ backgroundColor: activeCompany.primary_color_hex, height: '180px', width: '180px', borderRadius: '4px' }}>
                                <img src={`${BACKEND_URL}/${imgUrl}`} alt="Icon Small" style={{ maxHeight: '100px', maxWidth: '100px', objectFit: 'contain' }} />
                              </div>
                            </Col>
                          </Row>
                        </div>
                      );
                    }
<<<<<<< Updated upstream

                    // 1st aur 2nd Image ko 4 different sizes mein dikhana hai
                    return (
                      <div key={idx} className="mb-5">
                        <h6 className="text-muted mb-3">{sectionTitle}</h6>

                        {/* Large Size: 1920 x 540 */}
=======
                    return (
                      <div key={idx} className="mb-5">
                        <h6 className="text-muted mb-3">{sectionTitle}</h6>
>>>>>>> Stashed changes
                        <div className="mb-4">
                          <div className="d-flex align-items-center justify-content-center shadow-sm p-4" style={{ backgroundColor: bgColor, border: `1px solid ${borderColor}`, borderRadius: '4px', width: '100%' }}>
                            <img src={`${BACKEND_URL}/${imgUrl}`} alt="Preview 1920" style={{ maxHeight: '140px', maxWidth: '100%', objectFit: 'contain' }} />
                          </div>
                          <small className="text-muted mt-1 d-block">1920 x 540</small>
                        </div>
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
                        {/* Medium Size: 960 x 270 */}
                        <div className="mb-4">
                          <div className="d-flex align-items-center justify-content-center shadow-sm p-3" style={{ backgroundColor: bgColor, border: `1px solid ${borderColor}`, borderRadius: '4px', width: '75%' }}>
                            <img src={`${BACKEND_URL}/${imgUrl}`} alt="Preview 960" style={{ maxHeight: '90px', maxWidth: '100%', objectFit: 'contain' }} />
                          </div>
                          <small className="text-muted mt-1 d-block">960 x 270</small>
                        </div>
<<<<<<< Updated upstream

                        {/* Small & XS Sizes: 480 x 135 and 360 x 100 */}
=======
>>>>>>> Stashed changes
                        <Row>
                          <Col md={6} className="mb-3">
                            <div className="d-flex align-items-center justify-content-center shadow-sm p-3" style={{ backgroundColor: bgColor, border: `1px solid ${borderColor}`, borderRadius: '4px', width: '100%' }}>
                              <img src={`${BACKEND_URL}/${imgUrl}`} alt="Preview 480" style={{ maxHeight: '60px', maxWidth: '100%', objectFit: 'contain' }} />
                            </div>
                            <small className="text-muted mt-1 d-block">480 x 135</small>
                          </Col>
                          <Col md={4} className="mb-3">
                            <div className="d-flex align-items-center justify-content-center shadow-sm p-2" style={{ backgroundColor: bgColor, border: `1px solid ${borderColor}`, borderRadius: '4px', width: '100%' }}>
                              <img src={`${BACKEND_URL}/${imgUrl}`} alt="Preview 360" style={{ maxHeight: '40px', maxWidth: '100%', objectFit: 'contain' }} />
                            </div>
                            <small className="text-muted mt-1 d-block">360 x 100</small>
                          </Col>
                        </Row>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="border p-4 mb-3 text-center shadow-sm" style={{ backgroundColor: '#f9fafb', borderRadius: '4px', width: '100%', borderColor: `${activeCompany.secondary_color_hex}40` }}>
                  <h1 className="display-4 text-secondary mb-2">📦</h1><p className="text-muted m-0 small">ZIP Archive / File</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
<<<<<<< Updated upstream

      {/* Colors & Fonts Section */}
=======
>>>>>>> Stashed changes
      <div className="mb-5">
        <h2 className="fw-bold border-bottom pb-2 mb-4" style={{ color: activeCompany.primary_color_hex, fontSize: '1.5rem' }}>Colors & Fonts</h2>
        <Row className="mb-5">
          <Col md={4}>
            <div className="shadow-sm" style={{ backgroundColor: activeCompany.primary_color_hex, height: '80px', borderRadius: '4px', width: '100%', marginBottom: '10px' }}></div>
            <h6 className="fw-bold mb-1" style={{ color: activeCompany.primary_color_hex }}>{activeCompany.primary_color_name}</h6>
            <p className="text-muted small m-0" style={{ textTransform: 'uppercase' }}>HEX: {activeCompany.primary_color_hex}</p>
          </Col>
          <Col md={4}>
            <div className="shadow-sm" style={{ backgroundColor: activeCompany.secondary_color_hex, height: '80px', borderRadius: '4px', width: '100%', marginBottom: '10px', border: '1px solid #eaeaea' }}></div>
            <h6 className="fw-bold mb-1" style={{ color: '#333' }}>{activeCompany.secondary_color_name}</h6>
            <p className="text-muted small m-0" style={{ textTransform: 'uppercase' }}>HEX: {activeCompany.secondary_color_hex}</p>
          </Col>
        </Row>
        <div>
          <p className="mb-2 text-muted"><strong style={{ color: activeCompany.primary_color_hex }}>Primary Font:</strong> <a href={activeCompany.primary_font_link} target="_blank" rel="noreferrer" style={{ color: activeCompany.secondary_color_hex, textDecoration: 'none', fontWeight: 'bold' }}>{activeCompany.primary_font_name}</a></p>
          <p className="text-muted"><strong style={{ color: activeCompany.primary_color_hex }}>Secondary Font:</strong> <a href={activeCompany.secondary_font_link} target="_blank" rel="noreferrer" style={{ color: activeCompany.secondary_color_hex, textDecoration: 'none', fontWeight: 'bold' }}>{activeCompany.secondary_font_name}</a></p>
        </div>
      </div>
    </>
  );
};
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
export default BrandAssetsView;
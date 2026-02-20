import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import api from '../api/axios';
import BrandAssetsView from '../components/BrandAssetsView';

<<<<<<< Updated upstream
// .env file se URL get kar rahe hain
=======
>>>>>>> Stashed changes
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const LandingPage = () => {
  const [allBrandsData, setAllBrandsData] = useState([]);
  const [filteredBrands, setFilteredBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('all');

  useEffect(() => {
    const fetchEverything = async () => {
      try {
        const compRes = await api.get('/dashboard/companies');
        const companies = compRes.data;

        const brandsWithData = await Promise.all(
          companies.map(async (company) => {
            const assetsRes = await api.get(`/dashboard/assets/${company.id}`);
            const empRes = await api.get(`/dashboard/employees/${company.id}`);
            return { ...company, assets: assetsRes.data, employees: empRes.data };
          })
        );

        setAllBrandsData(brandsWithData);
        setFilteredBrands(brandsWithData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data", err);
        setLoading(false);
      }
    };
    fetchEverything();
  }, []);

  const handleFilterChange = (e) => {
    const val = e.target.value;
    setSelectedFilter(val);
    if (val === 'all') setFilteredBrands(allBrandsData);
    else setFilteredBrands(allBrandsData.filter(b => b.id === parseInt(val)));
  };

  const handleDownloadVCF = async (emp) => {
    let photoString = '';
    if (emp.profile_pic_path) {
      try {
<<<<<<< Updated upstream
        // Yahan hardcoded localhost ki jagah BACKEND_URL lagaya hai
        const response = await fetch(`${BACKEND_URL}/${emp.profile_pic_path}`);
        const blob = await response.blob();
        
        // Image ki type (jpeg ya png) nikalna
        const mimeType = blob.type.split('/')[1].toUpperCase(); 
        
        const base64data = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            // Sirf base64 string nikalna, metadata nahi
=======
        const response = await fetch(`${BACKEND_URL}/${emp.profile_pic_path}`);
        const blob = await response.blob();
        const mimeType = blob.type.split('/')[1].toUpperCase(); 
        const base64data = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
>>>>>>> Stashed changes
            const base64 = reader.result.split(',')[1];
            resolve(base64);
          };
          reader.readAsDataURL(blob);
        });
<<<<<<< Updated upstream
        
        // VCF 3.0 Standard Encoding
=======
>>>>>>> Stashed changes
        photoString = `\nPHOTO;ENCODING=b;TYPE=${mimeType}:${base64data}`;
      } catch (error) {
        console.error("Failed to load image for VCF", error);
      }
    }

    const vcfData = `BEGIN:VCARD\nVERSION:3.0\nFN:${emp.name}\nORG:${emp.department}\nTITLE:${emp.designation}\nURL:${emp.portfolio_link}\nADR:;;${emp.address};;;;\nNOTE:Experience: ${emp.experience}${photoString}\nEND:VCARD`;
    
    const blobData = new Blob([vcfData], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blobData);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${emp.name.replace(/\s+/g, '_')}.vcf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

<<<<<<< Updated upstream
  if (loading) return <div className="text-center mt-5 p-5">Loading All Brand Assets...</div>;
=======
  // --- SKELETON LOADING UI ---
  if (loading) {
    return (
      <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', paddingBottom: '100px' }}>
        {/* Fake Filter Bar */}
        <div className="bg-light py-3 border-bottom placeholder-glow" style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <Container className="d-flex justify-content-end align-items-center">
            <span className="placeholder col-2 me-3 rounded"></span>
            <span className="placeholder col-3 rounded" style={{ height: '30px', width: '250px' }}></span>
          </Container>
        </div>

        {/* Fake Brand Section (2 fake brands for skeleton effect) */}
        {[1, 2].map((fakeBrand, index) => (
          <div key={fakeBrand} className="placeholder-glow">
            {index > 0 && <hr style={{ borderTop: '8px solid #f1f3f5', margin: '80px 0' }} />}
            <Container className="py-5" style={{ maxWidth: '960px' }}>
              {/* Fake Title & Subtitle */}
              <div className="mb-5">
                <h1 className="placeholder col-6 mb-3 rounded" style={{ height: '40px' }}></h1><br/>
                <p className="placeholder col-8 mb-2 rounded"></p><br/>
                <p className="placeholder col-5 rounded"></p>
              </div>

              {/* Fake BrandAssetsView Boxes */}
              <div className="mb-5">
                <Row>
                  {[1, 2, 3].map(box => (
                    <Col md={4} key={box} className="mb-3">
                      <div className="placeholder w-100 rounded" style={{ height: '150px' }}></div>
                    </Col>
                  ))}
                </Row>
              </div>

              {/* Fake Scannable Contact Cards */}
              <div className="mb-5">
                <h2 className="placeholder col-4 mb-4 rounded" style={{ height: '30px' }}></h2>
                <Row>
                  {[1, 2].map(card => (
                    <Col md={6} key={card} className="mb-5">
                      <div className="d-flex flex-column align-items-start">
                        <h6 className="placeholder col-5 mb-3 rounded"></h6>
                        <div className="placeholder col-7 mb-3 rounded" style={{ height: '35px' }}></div>
                        {/* Fake QR Code Box */}
                        <div className="placeholder rounded" style={{ width: '220px', height: '220px' }}></div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
            </Container>
          </div>
        ))}
      </div>
    );
  }
  // --- END SKELETON LOADING UI ---
>>>>>>> Stashed changes

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', color: '#2a3b4c', paddingBottom: '100px' }}>
      
      {allBrandsData.length > 0 && (
        <div className="bg-light py-3 border-bottom sticky-top" style={{ zIndex: 1000, boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <Container className="d-flex justify-content-end align-items-center">
            <span className="me-3 small text-muted fw-bold">Filter Brand:</span>
            <Form.Select size="sm" style={{ width: '250px', cursor: 'pointer', borderColor: '#ccc' }} value={selectedFilter} onChange={handleFilterChange}>
              <option value="all">Show All Brands</option>
              {allBrandsData.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </Form.Select>
          </Container>
        </div>
      )}

      {filteredBrands.length === 0 ? (
        <Container className="py-5 text-center"><p className="text-muted">No brands added yet.</p></Container>
      ) : (
        filteredBrands.map((brand, index) => (
          <div key={brand.id}>
            {index > 0 && <hr style={{ borderTop: '8px solid #f1f3f5', margin: '80px 0' }} />}

            <Container className="py-5" style={{ maxWidth: '960px' }}>
              <div className="mb-5">
                <h1 className="fw-bold text-uppercase" style={{ color: brand.primary_color_hex, fontSize: '2.5rem', marginBottom: '15px', letterSpacing: '1px' }}>
                  {brand.name} Brand Assets
                </h1>
                <p className="fs-6 text-muted mb-2">Here you will find logos, colors, and fonts for {brand.name}.</p>
                {brand.website_url && (
                  <p className="small text-muted">Please note the full logo with the domain is preferred to make it clear that the name is a domain you can visit: <a href={brand.website_url} target="_blank" rel="noreferrer" style={{ color: brand.primary_color_hex, fontWeight: 'bold' }}>{brand.website_url}</a></p>
                )}
              </div>

              <BrandAssetsView activeCompany={brand} assets={brand.assets} />

              {/* Scannable Contact Cards Section */}
              <div className="mb-5">
                <h2 className="fw-bold border-bottom pb-2 mb-4" style={{ color: brand.primary_color_hex, fontSize: '1.5rem' }}>Scannable Contact Cards</h2>
                <Row>
                  {brand.employees.length === 0 ? (
                    <p className="text-muted small">No contact cards available.</p>
                  ) : (
                    brand.employees.map(emp => (
                      <Col md={6} key={emp.id} className="mb-5">
                        <div className="d-flex flex-column align-items-start">
                          <h6 className="fw-bold mb-3" style={{ color: brand.primary_color_hex }}>{emp.name}</h6>
                          
                          <button 
                            onClick={() => handleDownloadVCF(emp)}
                            className="btn btn-sm mb-3 d-flex align-items-center shadow-sm" 
                            style={{ backgroundColor: brand.secondary_color_hex, color: brand.primary_color_hex, fontWeight: 'bold', borderRadius: '4px', fontSize: '0.85rem', padding: '8px 16px', border: `1px solid ${brand.secondary_color_hex}` }}
                          >
                            <span className="me-2">📥</span> Download Contact Card (.vcf)
                          </button>
                          
                          {/* QR Box with Profile Image Overlay in Center */}
                          <div style={{ position: 'relative', border: `2px solid ${brand.secondary_color_hex}`, padding: '15px', display: 'inline-block', backgroundColor: '#fff', borderRadius: '8px' }}>
                            <img src={`${BACKEND_URL}/${emp.qr_code_path}`} alt={`QR Code for ${emp.name}`} style={{ width: '220px', height: '220px' }} />
                            
                            {/* Profile Picture Overlay */}
                            {emp.profile_pic_path && (
                              <img 
                                src={`${BACKEND_URL}/${emp.profile_pic_path}`} 
                                alt="Profile" 
                                style={{
                                  position: 'absolute',
                                  top: '50%',
                                  left: '50%',
                                  transform: 'translate(-50%, -50%)',
                                  width: '55px',
                                  height: '55px',
                                  borderRadius: '50%',
                                  border: '4px solid white',
                                  objectFit: 'cover',
                                  boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                                }} 
                              />
                            )}
                          </div>
                        </div>
                      </Col>
                    ))
                  )}
                </Row>
              </div>

            </Container>
          </div>
        ))
      )}
    </div>
  );
};

export default LandingPage;
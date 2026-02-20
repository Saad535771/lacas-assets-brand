import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Container, Card } from 'react-bootstrap';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import CompanyForm from '../components/CompanyForm';
import AssetForm from '../components/AssetForm';
import EmployeeForm from '../components/EmployeeForm';
import ManageAssets from '../components/ManageAssets'; 

const AdminDashboard = () => {
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Data loading state
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('adminId')) {
      navigate('/login');
    } else {
      fetchCompanies();
    }
  }, [navigate]);

  const fetchCompanies = async () => {
    try {
      setIsLoading(true); // Fetching shuru
      const res = await api.get('/dashboard/companies');
      setCompanies(res.data);
    } catch (err) { 
      console.error(err); 
    } finally {
      setIsLoading(false); // Fetching khatam (chahe error aye ya success)
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminId');
    navigate('/login');
  };

  // Forms State
  const [comp, setComp] = useState({ name: '', website_url: '', primary_color_name: 'Dark Blue', primary_color_hex: '#133651', secondary_color_name: 'Accent Blue', secondary_color_hex: '#73D2E1', primary_font_name: 'Titillium Web', primary_font_link: 'https://fonts.google.com/specimen/Titillium+Web', secondary_font_name: 'Karla', secondary_font_link: 'https://fonts.google.com/specimen/Karla' });
  const [assetCompanyId, setAssetCompanyId] = useState('');
  const [assetName, setAssetName] = useState('');
  const [assetFile, setAssetFile] = useState(null);
  const [previewImages, setPreviewImages] = useState([]);
  const [empData, setEmpData] = useState({ company_id: '', name: '', designation: '', department: '', portfolio_link: '', address: '', experience: '' });
  const [empPic, setEmpPic] = useState(null);

  // Submit Handlers
  const submitCompany = async (e) => {
    e.preventDefault();
    await api.post('/dashboard/company', comp);
    alert('Company & Brand Guide Added!');
    fetchCompanies();
  };

  const submitAsset = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('company_id', assetCompanyId);
    formData.append('asset_name', assetName);
    formData.append('asset_file', assetFile);
    Array.from(previewImages).forEach(file => formData.append('preview_images', file));
    await api.post('/dashboard/asset', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    alert('Asset Uploaded!');
  };

  const submitEmployee = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(empData).forEach(key => formData.append(key, empData[key]));
    formData.append('profile_pic', empPic);
    await api.post('/dashboard/employee', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    alert('Employee & QR Generated!');
  };

  // --- SKELETON LOADING UI ---
  if (isLoading) {
    return (
      <div className="bg-light min-vh-100">
        {/* Fake Navbar */}
        <nav className="navbar navbar-dark p-3 px-5 d-flex justify-content-between shadow-sm placeholder-glow" style={{ background: 'linear-gradient(135deg, #1e3c72, #2a5298)' }}>
          <span className="placeholder col-2 rounded" style={{ height: '30px', backgroundColor: 'rgba(255,255,255,0.7)' }}></span>
          <span className="placeholder col-1 rounded" style={{ height: '35px', backgroundColor: 'rgba(255,255,255,0.7)' }}></span>
        </nav>

        {/* Fake Dashboard Body */}
        <Container className="mt-5 placeholder-glow">
          <Card className="border-0 shadow-lg p-4" style={{ borderRadius: '15px' }}>
            {/* Fake Tabs */}
            <div className="d-flex gap-3 mb-4 border-bottom pb-3">
              <span className="placeholder col-2 rounded-pill" style={{ height: '40px' }}></span>
              <span className="placeholder col-2 rounded-pill" style={{ height: '40px' }}></span>
              <span className="placeholder col-2 rounded-pill" style={{ height: '40px' }}></span>
              <span className="placeholder col-2 rounded-pill" style={{ height: '40px' }}></span>
            </div>
            {/* Fake Form Fields */}
            <div className="py-3">
              <span className="placeholder col-3 rounded mb-4 d-block" style={{ height: '25px' }}></span>
              <span className="placeholder col-12 rounded mb-3 d-block" style={{ height: '45px' }}></span>
              <span className="placeholder col-12 rounded mb-3 d-block" style={{ height: '45px' }}></span>
              <span className="placeholder col-12 rounded mb-3 d-block" style={{ height: '45px' }}></span>
              <span className="placeholder col-2 rounded mt-4 d-block" style={{ height: '45px' }}></span>
            </div>
          </Card>
        </Container>
      </div>
    );
  }
  // --- END SKELETON UI ---

  return (
    <>
      {/* Custom Styles for Dashboard */}
      <style>
        {`
          .custom-navbar {
            background: linear-gradient(135deg, #1e3c72, #2a5298);
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          }
          .dashboard-card {
            border: none;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.05);
            background: #ffffff;
          }
          /* Customizing React-Bootstrap Tabs */
          .custom-tabs .nav-link {
            color: #6c757d;
            font-weight: 600;
            border: none;
            border-bottom: 3px solid transparent;
            padding: 12px 20px;
            transition: all 0.3s ease;
          }
          .custom-tabs .nav-link:hover {
            color: #2a5298;
            background-color: #f8f9fa;
            border-radius: 8px 8px 0 0;
          }
          .custom-tabs .nav-link.active {
            color: #1e3c72;
            background-color: transparent;
            border-color: #1e3c72; /* Underline effect for active tab */
          }
          .logout-btn {
            background-color: rgba(255,255,255,0.1);
            border: 1px solid rgba(255,255,255,0.3);
            transition: all 0.3s ease;
          }
          .logout-btn:hover {
            background-color: #dc3545;
            border-color: #dc3545;
          }
        `}
      </style>

      <div className="bg-light min-vh-100" style={{ paddingBottom: '50px' }}>
        {/* Modern Header */}
        <nav className="navbar custom-navbar p-3 px-4 px-md-5 d-flex justify-content-between sticky-top">
          <div className="d-flex align-items-center">
            <span className="me-2 fs-4">⚙️</span>
            <h4 className="text-white brand-font m-0 fw-bold" style={{ letterSpacing: '0.5px' }}>Lacas Assets Admin</h4>
          </div>
          <button className="btn text-white btn-sm px-3 py-2 rounded-pill logout-btn fw-semibold" onClick={handleLogout}>
            Logout
          </button>
        </nav>

        {/* Main Content Area */}
        <Container className="mt-5">
          <Card className="dashboard-card p-4 p-md-5">
            <Tabs defaultActiveKey="company" className="mb-4 custom-tabs flex-nowrap overflow-auto" style={{ borderBottom: '2px solid #e9ecef' }}>
              
              <Tab eventKey="company" title="🏢 Add Brand Profile">
                <div className="animate__animated animate__fadeIn">
                  <CompanyForm comp={comp} setComp={setComp} submitCompany={submitCompany} />
                </div>
              </Tab>
              
              <Tab eventKey="asset" title="📁 Upload Assets">
                <div className="animate__animated animate__fadeIn">
                  <AssetForm companies={companies} setAssetCompanyId={setAssetCompanyId} assetName={assetName} setAssetName={setAssetName} setAssetFile={setAssetFile} setPreviewImages={setPreviewImages} submitAsset={submitAsset} />
                </div>
              </Tab>
              
              <Tab eventKey="manage_assets" title="🛠️ Manage Assets">
                <div className="animate__animated animate__fadeIn">
                  <ManageAssets />
                </div>
              </Tab>
              
              <Tab eventKey="employee" title="📇 Add Employee (QR)">
                <div className="animate__animated animate__fadeIn">
                  <EmployeeForm companies={companies} empData={empData} setEmpData={setEmpData} setEmpPic={setEmpPic} submitEmployee={submitEmployee} />
                </div>
              </Tab>
              
            </Tabs>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default AdminDashboard;
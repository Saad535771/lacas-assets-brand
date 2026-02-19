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
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('adminId')) navigate('/login');
    else fetchCompanies();
  }, [navigate]);

  const fetchCompanies = async () => {
    try {
      const res = await api.get('/dashboard/companies');
      setCompanies(res.data);
    } catch (err) { console.error(err); }
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

  return (
    <div className="bg-light min-vh-100">
      <nav className="navbar navbar-dark bg-primary-dark p-3 px-5 d-flex justify-content-between">
        <h3 className="text-white brand-font m-0">Xchart Admin Panel</h3>
        <button className="btn btn-danger btn-sm" onClick={handleLogout}>Logout</button>
      </nav>

      <Container className="mt-5">
        <Card className="admin-card p-4">
          <Tabs defaultActiveKey="company" className="mb-4">
            <Tab eventKey="company" title="Add Brand Profile">
              <CompanyForm comp={comp} setComp={setComp} submitCompany={submitCompany} />
            </Tab>
            <Tab eventKey="asset" title="Upload Assets">
              <AssetForm companies={companies} setAssetCompanyId={setAssetCompanyId} assetName={assetName} setAssetName={setAssetName} setAssetFile={setAssetFile} setPreviewImages={setPreviewImages} submitAsset={submitAsset} />
            </Tab>
            <Tab eventKey="manage_assets" title="Manage Assets">
              <ManageAssets />
            </Tab>
            <Tab eventKey="employee" title="Add Employee (QR)">
              <EmployeeForm companies={companies} empData={empData} setEmpData={setEmpData} setEmpPic={setEmpPic} submitEmployee={submitEmployee} />
            </Tab>
          </Tabs>
        </Card>
      </Container>
    </div>
  );
};
export default AdminDashboard;
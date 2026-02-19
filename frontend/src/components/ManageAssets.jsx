import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Modal, Alert } from 'react-bootstrap';
import api from '../api/axios';

const ManageAssets = () => {
  const [assets, setAssets] = useState([]);
  const [companies, setCompanies] = useState([]); 
  const [showEdit, setShowEdit] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const [editData, setEditData] = useState({ id: '', asset_name: '', company_id: '' });
  const [editFile, setEditFile] = useState(null);
  const [editPreviews, setEditPreviews] = useState([]);

  useEffect(() => {
    fetchAssets();
    fetchCompanies();
  }, []);

  const fetchAssets = async () => {
    try {
      const res = await api.get('/dashboard/assets');
      setAssets(res.data);
      setErrorMessage('');
    } catch (err) {
      console.error(err);
      setErrorMessage('Backend API se data nahi mil raha. Please apna Backend server restart karein!');
    }
  };

  const fetchCompanies = async () => {
    try {
      const res = await api.get('/dashboard/companies');
      setCompanies(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure? This will permanently delete the ZIP and Image files from the Server.')) {
      try {
        await api.delete(`/dashboard/asset/${id}`);
        fetchAssets();
      } catch (err) {
        console.error(err);
        // Better error handling
        alert(`Failed to delete asset. Error: ${err.response?.data?.error || err.message}`);
      }
    }
  };

  const openEditModal = (asset) => {
    setEditData({ id: asset.id, asset_name: asset.asset_name, company_id: asset.company_id || '' });
    setEditFile(null);
    setEditPreviews([]);
    setShowEdit(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    
    if(!editData.company_id) {
      alert("Please select a company!");
      return;
    }

    const formData = new FormData();
    formData.append('asset_name', editData.asset_name);
    formData.append('company_id', editData.company_id); 
    
    if (editFile) formData.append('asset_file', editFile);
    
    if (editPreviews.length > 0) {
      Array.from(editPreviews).forEach(file => formData.append('preview_images', file));
    }

    try {
      await api.put(`/dashboard/asset/${editData.id}`, formData, { 
        headers: { 'Content-Type': 'multipart/form-data' } 
      });
      setShowEdit(false);
      alert('Asset Updated Successfully!');
      fetchAssets(); 
    } catch (err) {
      console.error(err);
      // Backend se anay wala exact error show karega
      alert(`Failed to update asset. Error: ${err.response?.data?.error || err.message}`);
    }
  };

  return (
    <div>
      {errorMessage && <Alert variant="danger" className="mt-3 text-center fw-bold">{errorMessage}</Alert>}

      <Table striped bordered hover responsive className="mt-3 align-middle">
        <thead className="table-dark">
          <tr>
            <th>Company</th>
            <th>Asset Name</th>
            <th>ZIP File</th>
            <th>Previews</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {assets.length === 0 && !errorMessage ? (
            <tr><td colSpan="5" className="text-center text-muted">No assets found.</td></tr>
          ) : assets.map(asset => (
            <tr key={asset.id}>
              <td className="fw-bold">{asset.company_name}</td>
              <td>{asset.asset_name}</td>
              <td>{asset.file_path ? '✅ Uploaded' : '❌ N/A'}</td>
              <td>{asset.preview_images ? asset.preview_images.split(',').length : 0} Images</td>
              <td>
                <Button variant="outline-primary" size="sm" className="me-2" onClick={() => openEditModal(asset)}>Edit</Button>
                <Button variant="outline-danger" size="sm" onClick={() => handleDelete(asset.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showEdit} onHide={() => setShowEdit(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Asset Details & Files</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditSubmit}>
            
            <Form.Group className="mb-3">
              <Form.Label>Change Company</Form.Label>
              <Form.Select 
                value={editData.company_id} 
                onChange={(e) => setEditData({...editData, company_id: e.target.value})} 
                required
              >
                <option value="">Select Company...</option>
                {companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Asset Package Name</Form.Label>
              <Form.Control type="text" value={editData.asset_name} onChange={(e) => setEditData({...editData, asset_name: e.target.value})} required />
            </Form.Group>
            
            <div className="row mb-3">
              <div className="col-md-6">
                <Form.Group>
                  <Form.Label className="text-primary fw-bold">Update ZIP File (Optional)</Form.Label>
                  <Form.Control type="file" accept=".zip" onChange={(e) => setEditFile(e.target.files[0])} />
                  <Form.Text className="text-muted">Leave empty to keep existing ZIP.</Form.Text>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group>
                  <Form.Label className="text-primary fw-bold">Update Preview Images (Optional)</Form.Label>
                  <Form.Control type="file" multiple accept="image/*" onChange={(e) => setEditPreviews(e.target.files)} />
                  <Form.Text className="text-muted">Leave empty to keep existing images.</Form.Text>
                </Form.Group>
              </div>
            </div>

            <Button variant="primary" type="submit" className="w-100 mt-2">Update Asset</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ManageAssets;
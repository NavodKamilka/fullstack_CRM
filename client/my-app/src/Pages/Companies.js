import React, { useEffect, useState } from 'react';
import MiniDrawer from '../Components/MiniDrawer';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function Companies() {
  const [companies, setCompanies] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [logo, setLogo] = useState('');
  const [website, setWebsite] = useState('');
  const [selectedCompany, setSelectedCompany] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {

    const fetchCompanies = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/company/getAll', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCompanies(response.data);
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };


    fetchCompanies();
  }, [token]);


  const handleDelete = (companyId) => {
    Swal.fire({
      title: 'Confirm Delete',
      text: 'Are you sure you want to delete this company?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'red',
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCompany(companyId);
      }
    });
  };

  const deleteCompany = async (companyId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/company/delete/${companyId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCompanies((prevCompanies) => prevCompanies.filter((company) => company.id !== companyId));

      Swal.fire('Deleted!', 'The company has been deleted.', 'success');
    } catch (error) {
      console.error('Error deleting company:', error);
      Swal.fire('Error', 'Failed to delete the company.', 'error');
    }
  };

  const handleAddCompany = async () => {
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/company/add',
        {
          companyName: companyName,
          companyEmail: companyEmail,
          logo: logo,
          website: website,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setCompanyName('');
      setCompanyEmail('');
      setLogo('');
      setWebsite('');
      setOpenDialog(false);
      window.location.reload();
    } catch (error) {
      console.error('Error adding company:', error);
    }
  };

  

  const handleUpdateCompany = async () => {
   
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/employee/updateEmployee/${selectedCompany.id}`,
        {
          companyName: companyName,
          companyEmail: companyEmail,
          logo: logo,
          website: website,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      setOpenDialog(false);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (company) => {
    setSelectedCompany(company);
    setCompanyName(company.companyName);
    setCompanyEmail(company.companyEmail);
    setLogo(company.logo);
    setWebsite(company.website);
    setOpenDialog(true);
  };

  return (
    <div>
      <MiniDrawer />
      <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', marginLeft: '300px' }}>
        <Typography style={{ fontSize: '25px', fontWeight: 'bold' }}>All Companies</Typography>
        <Button variant="contained" style={{ marginLeft: '800px' }} onClick={() => setOpenDialog(true)}>
          Add New Company
        </Button>
      </Box>
      <br />
      <br />

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle style={{ textAlign: 'center' }}>
          {selectedCompany ? 'Edit Company' : 'Add New Company'}
        </DialogTitle>
        <DialogContent>
          <TextField
            type="text"
            label="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            fullWidth
            style={{ marginBottom: '25px' }}
          />
          <TextField
            type="text"
            label="Company Email"
            value={companyEmail}
            onChange={(e) => setCompanyEmail(e.target.value)}
            fullWidth
            style={{ marginBottom: '25px' }}
          />
          <TextField
            type="text"
            label="Logo"
            value={logo}
            onChange={(e) => setLogo(e.target.value)}
            fullWidth
            style={{ marginBottom: '25px' }}
          />
          <TextField
            type="text"
            label="Website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            fullWidth
            style={{ marginBottom: '10px' }}
          />
        </DialogContent>
        <DialogActions>
          <Button style={{ color: 'red', marginRight: '10px' }} onClick={() => setOpenDialog(false)}>
            Cancel
          </Button>
          {/* {selectedCompany ? (
            <Button variant="contained" style={{ backgroundColor: 'green', color: 'white' }} onClick={handleUpdateCompany}>
              Update
            </Button>
          ) : (
            <Button variant="contained" style={{ backgroundColor: 'green', color: 'white' }} onClick={handleAddCompany}>
              Add
            </Button>
          )} */}
          <Button
            variant="contained"
            style={{ backgroundColor: 'green', color: 'white' }}
            onClick={selectedCompany ? handleUpdateCompany : handleAddCompany}
          >
            {selectedCompany ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      <div style={{ width: '1000px' }}>
        <Table size="small" aria-label="companies" style={{ marginLeft: '350px' }}>
          <TableHead>
            <TableRow>
              <TableCell align="left">Company Name</TableCell>
              <TableCell align="left">Company Email</TableCell>
              <TableCell align="left">Logo</TableCell>
              <TableCell align="left">WebSite</TableCell>
              <TableCell align="left">Edit</TableCell>
              <TableCell align="left">Delete</TableCell>
            </TableRow>
          </TableHead>

          <br />
          <TableBody>
            {companies.map((company) => (
              <TableRow key={company.id}>
                <TableCell align="left">{company.companyName}</TableCell>
                <TableCell align="left">{company.companyEmail}</TableCell>
                <TableCell align="left">{company.logo}</TableCell>
                <TableCell align="left">{company.website}</TableCell>
                <TableCell align="left">
                  <Button variant="contained" style={{ backgroundColor: 'green', color: 'white' }} onClick={() => handleEdit(company)}>
                    Edit
                  </Button>
                </TableCell>
                <TableCell align="left">
                  <Button variant="contained" style={{ backgroundColor: 'red', color: 'white' }} onClick={() => handleDelete(company.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

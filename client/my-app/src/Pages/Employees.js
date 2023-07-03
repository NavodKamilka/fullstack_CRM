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
  Typography,
} from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [company_Id, setCompanyId] = useState('');
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/employee/getAll', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching Employees:', error);
      }
    };

    fetchEmployees();
  }, [token]);

  const handleDelete = (employeeId) => {
    Swal.fire({
      title: 'Confirm Delete',
      text: 'Are you sure you want to delete this employee?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'red',
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        // Delete the employee
        deleteEmployee(employeeId);
      }
    });
  };

  const deleteEmployee = async (employeeId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/employee/delete/${employeeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update the employees state by filtering out the deleted employee
      setEmployees((prevEmployees) => prevEmployees.filter((employee) => employee.id !== employeeId));

      Swal.fire('Deleted!', 'The employee has been deleted.', 'success');
    } catch (error) {
      console.error('Error deleting employee:', error);
      Swal.fire('Error', 'Failed to delete the employee.', 'error');
    }
  };

  const handleAddEmployee = async () => {
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/employee/add',
        {
          company_id: parseInt(company_Id),
          fName: fName,
          lName: lName,
          email: email,
          phone: phone,
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

  const handleUpdateEmployee = async () => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/employee/updateEmployee/${selectedEmployee.id}`,
        {
          company_id: parseInt(company_Id),
          fName: fName,
          lName: lName,
          email: email,
          phone: phone,
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

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setCompanyId(employee.company_id);
    setFName(employee.fName);
    setLName(employee.lName);
    setEmail(employee.email);
    setPhone(employee.phone);
    setOpenDialog(true);
  };

  return (
    <div>
      <MiniDrawer />
      <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', marginLeft: '300px' }}>
        <Typography style={{ fontSize: '25px', fontWeight: 'bold' }}>All Employees</Typography>
        <Button variant="contained" style={{ marginLeft: '800px' }} onClick={() => setOpenDialog(true)}>
          Add New Employee
        </Button>
      </Box>
      <br />
      <br />

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle style={{ textAlign: 'center' }}>{selectedEmployee ? 'Edit Employee' : 'Add New Employee'}</DialogTitle>
        <DialogContent>
          <input
            type="text"
            placeholder="Company Id"
            value={company_Id}
            onChange={(e) => setCompanyId(e.target.value)}
            style={{ width: '500px', padding: '10px', marginBottom: '25px', borderRadius: '4px' }}
          />
          <br />
          <input
            type="text"
            placeholder="First Name"
            value={fName}
            onChange={(e) => setFName(e.target.value)}
            style={{ width: '500px', padding: '10px', marginBottom: '25px', borderRadius: '4px' }}
          />
          <br />
          <input
            type="text"
            placeholder="Last Name"
            value={lName}
            onChange={(e) => setLName(e.target.value)}
            style={{ width: '500px', padding: '10px', marginBottom: '25px', borderRadius: '4px' }}
          />
          <br />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '500px', padding: '10px', marginBottom: '25px', borderRadius: '4px' }}
          />
          <br />
          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{ width: '500px', padding: '10px', marginBottom: '10px', borderRadius: '4px' }}
          />
        </DialogContent>
        <DialogActions>
          <Button style={{ color: 'red', marginRight: '10px' }} onClick={() => setOpenDialog(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            style={{ backgroundColor: 'green', color: 'white' }}
            onClick={selectedEmployee ? handleUpdateEmployee : handleAddEmployee}
          >
            {selectedEmployee ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      <div style={{ width: '1000px' }}>
        <Table size="small" aria-label="purchases" style={{ marginLeft: '350px' }}>
          <TableHead>
            <TableRow>
              <TableCell align="left">Company Id</TableCell>
              <TableCell align="left">First Name</TableCell>
              <TableCell align="left">Last Name</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Phone</TableCell>
              <TableCell align="left">Edit</TableCell>
              <TableCell align="left">Delete</TableCell>
            </TableRow>
          </TableHead>
          <br />
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell align="left">{employee.company_id}</TableCell>
                <TableCell align="left">{employee.fName}</TableCell>
                <TableCell align="left">{employee.lName}</TableCell>
                <TableCell align="left">{employee.email}</TableCell>
                <TableCell align="left">{employee.phone}</TableCell>
                <TableCell align="left">
                  <Button variant="contained" style={{ backgroundColor: 'green', color: 'white' }} onClick={() => handleEdit(employee)}>
                    Edit
                  </Button>
                </TableCell>
                <TableCell align="left">
                  <Button
                    variant="contained"
                    style={{ backgroundColor: 'red', color: 'white' }}
                    onClick={() => handleDelete(employee.id)}
                  >
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

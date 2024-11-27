import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [admins, setAdmins] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [cutiData, setCutiData] = useState([]);
  
  // State untuk mengelola form
  const [isAddingAdmin, setIsAddingAdmin] = useState(false);
  const [adminForm, setAdminForm] = useState({ namaDepan: '', namaBelakang: '', email: '', tanggalLahir: '', jenisKelamin: '', password: '' });

  const [isAddingEmployee, setIsAddingEmployee] = useState(false);
  const [employeeForm, setEmployeeForm] = useState({ namaDepan: '', namaBelakang: '', email: '', noHP: '', alamat: '', jenisKelamin: '' });

  const [isAddingCuti, setIsAddingCuti] = useState(false);
  const [cutiForm, setCutiForm] = useState({ pegawaiId: '', alasanCuti: '', tanggalMulai: '', tanggalSelesai: '' });

  useEffect(() => {
    // Fetch data for Admin, Pegawai, and Cuti
    const fetchData = async () => {
      const [adminResponse, pegawaiResponse, cutiResponse] = await Promise.all([
        axios.get('http://localhost:3001/admin'),
        axios.get('http://localhost:3001/pegawai'),
        axios.get('http://localhost:3001/cuti'),
      ]);
      setAdmins(adminResponse.data);
      setEmployees(pegawaiResponse.data);
      setCutiData(cutiResponse.data);
    };
    fetchData();
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  // Handle form changes
  const handleAdminChange = (e) => {
    const { name, value } = e.target;
    setAdminForm({ ...adminForm, [name]: value });
  };

  const handleEmployeeChange = (e) => {
    const { name, value } = e.target;
    setEmployeeForm({ ...employeeForm, [name]: value });
  };

  const handleCutiChange = (e) => {
    const { name, value } = e.target;
    setCutiForm({ ...cutiForm, [name]: value });
  };

  // Handle form submission (Add or Edit)
  const handleAddAdmin = async () => {
    if (isAddingAdmin) {
      // POST request to add admin
      await axios.post('http://localhost:3001/admin', adminForm);
    } else {
      // PUT request to update admin
      await axios.put(`http://localhost:3001/admin/${adminForm.id}`, adminForm);
    }
    setIsAddingAdmin(false);
    setAdminForm({ namaDepan: '', namaBelakang: '', email: '', tanggalLahir: '', jenisKelamin: '', password: '' });
    window.location.reload();
  };

  const handleAddEmployee = async () => {
    if (isAddingEmployee) {
      // POST request to add employee
      await axios.post('http://localhost:3001/pegawai', employeeForm);
    } else {
      // PUT request to update employee
      await axios.put(`http://localhost:3001/pegawai/${employeeForm.id}`, employeeForm);
    }
    setIsAddingEmployee(false);
    setEmployeeForm({ namaDepan: '', namaBelakang: '', email: '', noHP: '', alamat: '', jenisKelamin: '' });
    window.location.reload();
  };

  const handleAddCuti = async () => {
    try {
      if (isAddingCuti) {
        // POST request to add Cuti
        await axios.post('http://localhost:3001/cuti', cutiForm);
      } else {
        // PUT request to update Cuti
        await axios.put(`http://localhost:3001/cuti/${cutiForm.id}`, cutiForm);
      }
      setIsAddingCuti(false);
      setCutiForm({ pegawaiId: '', alasanCuti: '', tanggalMulai: '', tanggalSelesai: '' });
      window.location.reload(); // Merefresh halaman setelah menambah/memperbarui data
    } catch (error) {
      console.error("Error handling Cuti:", error);
    }
  };

  // Handle Delete for Admin, Employee, and Cuti
  const handleDeleteAdmin = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/admin/${id}`);
      setAdmins(admins.filter(admin => admin.id !== id)); // Update state
    } catch (error) {
      console.error("Error deleting admin:", error);
    }
  };

  const handleDeleteEmployee = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/pegawai/${id}`);
      setEmployees(employees.filter(employee => employee.id !== id)); // Update state
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const handleDeleteCuti = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/cuti/${id}`);
      setCutiData(cutiData.filter(cuti => cuti.id !== id)); // Update state
    } catch (error) {
      console.error("Error deleting cuti:", error);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>

      {/* Admin Data */}
      <h2>Admins</h2>
      <button onClick={() => setIsAddingAdmin(true)}>Add Admin</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin.id}>
              <td>{admin.namaDepan} {admin.namaBelakang}</td>
              <td>{admin.email}</td>
              <td>
                <button onClick={() => { setIsAddingAdmin(true); setAdminForm(admin); }}>Edit</button>
                <button onClick={() => handleDeleteAdmin(admin.id)}>Delete</button> {/* Delete Admin */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Admin Form */}
      {isAddingAdmin && (
        <div>
          <h3>{adminForm.id ? 'Edit Admin' : 'Add Admin'}</h3>
          <form onSubmit={handleAddAdmin}>
            <input type="text" name="namaDepan" value={adminForm.namaDepan} onChange={handleAdminChange} placeholder="First Name" required />
            <input type="text" name="namaBelakang" value={adminForm.namaBelakang} onChange={handleAdminChange} placeholder="Last Name" required />
            <input type="email" name="email" value={adminForm.email} onChange={handleAdminChange} placeholder="Email" required />
            <input type="date" name="tanggalLahir" value={adminForm.tanggalLahir} onChange={handleAdminChange} placeholder="Date of Birth" required />
            <select name="jenisKelamin" value={adminForm.jenisKelamin} onChange={handleAdminChange}>
              <option value="">Select Gender</option>
              <option value="Laki-laki">Male</option>
              <option value="Perempuan">Female</option>
            </select>
            <input type="password" name="password" value={adminForm.password} onChange={handleAdminChange} placeholder="Password" required />
            <button type="submit">{adminForm.id ? 'Update' : 'Add'} Admin</button>
          </form>
        </div>
      )}

      {/* Employee Data */}
      <h2>Pegawai</h2>
      <button onClick={() => setIsAddingEmployee(true)}>Add Employee</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.namaDepan} {employee.namaBelakang}</td>
              <td>{employee.email}</td>
              <td>{employee.noHP}</td>
              <td>
                <button onClick={() => { setIsAddingEmployee(true); setEmployeeForm(employee); }}>Edit</button>
                <button onClick={() => handleDeleteEmployee(employee.id)}>Delete</button> {/* Delete Employee */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Employee Form */}
      {isAddingEmployee && (
        <div>
          <h3>{employeeForm.id ? 'Edit Employee' : 'Add Employee'}</h3>
          <form onSubmit={handleAddEmployee}>
            <input type="text" name="namaDepan" value={employeeForm.namaDepan} onChange={handleEmployeeChange} placeholder="First Name" required />
            <input type="text" name="namaBelakang" value={employeeForm.namaBelakang} onChange={handleEmployeeChange} placeholder="Last Name" required />
            <input type="email" name="email" value={employeeForm.email} onChange={handleEmployeeChange} placeholder="Email" required />
            <input type="text" name="noHP" value={employeeForm.noHP} onChange={handleEmployeeChange} placeholder="Phone Number" required />
            <textarea name="alamat" value={employeeForm.alamat} onChange={handleEmployeeChange} placeholder="Address" required />
            <select name="jenisKelamin" value={employeeForm.jenisKelamin} onChange={handleEmployeeChange}>
              <option value="">Select Gender</option>
              <option value="Laki-laki">Male</option>
              <option value="Perempuan">Female</option>
            </select>
            <button type="submit">{employeeForm.id ? 'Update' : 'Add'} Employee</button>
          </form>
        </div>
      )}

      {/* Cuti Data */}
      <h2>Cuti Data</h2>
      <button onClick={() => setIsAddingCuti(true)}>Add Cuti</button>
      <table>
        <thead>
          <tr>
            <th>Pegawai</th>
            <th>Alasan Cuti</th>
            <th>Tanggal Mulai</th>
            <th>Tanggal Selesai</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cutiData.map((cuti) => (
            <tr key={cuti.id}>
              <td>{cuti.pegawai ? cuti.pegawai.namaDepan : 'Unknown'}</td>
              <td>{cuti.alasanCuti}</td>
              <td>{cuti.tanggalMulai}</td>
              <td>{cuti.tanggalSelesai}</td>
              <td>
                <button onClick={() => { setIsAddingCuti(true); setCutiForm(cuti); }}>Edit</button>
                <button onClick={() => handleDeleteCuti(cuti.id)}>Delete</button> {/* Delete Cuti */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Cuti Form */}
      {isAddingCuti && (
        <div>
          <h3>{cutiForm.id ? 'Edit Cuti' : 'Add Cuti'}</h3>
          <form onSubmit={handleAddCuti}>
            <input type="text" name="pegawaiId" value={cutiForm.pegawaiId} onChange={handleCutiChange} placeholder="Pegawai ID" required />
            <input type="text" name="alasanCuti" value={cutiForm.alasanCuti} onChange={handleCutiChange} placeholder="Cuti Reason" required />
            <input type="date" name="tanggalMulai" value={cutiForm.tanggalMulai} onChange={handleCutiChange} required />
            <input type="date" name="tanggalSelesai" value={cutiForm.tanggalSelesai} onChange={handleCutiChange} required />
            <button type="submit">{cutiForm.id ? 'Update' : 'Add'} Cuti</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

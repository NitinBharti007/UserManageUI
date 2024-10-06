import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserTable from '../components/UserTable';
import UserForm from '../components/UserForm';
import { Button, TextField, CircularProgress, Paper } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [isFormOpen, setFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Error fetching users. Please try again later.');
        toast.error('Error fetching users. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const addUser = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
    setFormOpen(false);
    toast.success('User added successfully!');
  };

  const updateUser = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    toast.success('User updated successfully!');
  };

  const deleteUser = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    toast.success('User deleted successfully!');
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center p-6">
      <Paper elevation={5} className="p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <Button 
          variant="contained" 
          onClick={() => setFormOpen(true)} 
          className="mb-4 w-full" 
          style={{ backgroundColor: '#4F46E5', color: 'white' }}
        >
          Add User
        </Button>
        <TextField
          label="Search by Name"
          variant="outlined"
          fullWidth
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4"
          InputProps={{
            style: {
              borderRadius: 8,
            },
          }}
          InputLabelProps={{
            style: {
              color: '#4F46E5',
            },
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#4F46E5',
              },
              '&:hover fieldset': {
                borderColor: '#4F46E5',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#4F46E5',
              },
            },
          }}
        />

        {loading ? (
          <div className="flex justify-center items-center h-32">
            <CircularProgress />
          </div>
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : (
          <UserTable
            users={filteredUsers}
            onUpdateUser={updateUser}
            onDeleteUser={deleteUser}
          />
        )}
        
        {isFormOpen && <UserForm onClose={() => setFormOpen(false)} onSubmit={addUser} />}
      </Paper>
      <ToastContainer />
    </div>
  );
};

export default Home;

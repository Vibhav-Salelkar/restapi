import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import UsersTable from "../UsersTable/UsersTable";

function ResultScreen() {
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);
  const [editingUser, seteditingUser] = useState('');
  const [currentUser, setCurrentUser] = useState('');
  const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      age: 18,
  })

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/users");
      const parsedResponse = await response.json();
      setUsers(parsedResponse);
    } catch (error) {
      console.log(error);
    }
  };

  const createUser = async (formData) => {
    if(formData.firstName!== '' && formData.lastName!=='') {
      try {
          const response = await fetch("http://localhost:5000/users", {
              method: 'POST',
              body: JSON.stringify({
                  ...formData
              }),
              headers: {
                  "Content-type": "application/json; charset=UTF-8"
              }
          });
          const parsedResponse = await response.json();
          setUsers(parsedResponse.data);
        } catch (error) {
          console.log(error);
      } 
    }
  }

  const handleInputChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const editUser = async (formData) => {
    if(formData.firstName!== '' && formData.lastName!=='') {
      try {
          const response = await fetch(`http://localhost:5000/users/${editingUser}`, {
              method: 'PATCH',
              body: JSON.stringify({
                  ...formData
              }),
              headers: {
                  "Content-type": "application/json; charset=UTF-8"
              }
          });
          const parsedResponse = await response.json();
          setUsers(parsedResponse.data);
        } catch (error) {
          console.log(error);
      } 
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if(editingUser!== '') {
      editUser(formData);
      setFormData({
        firstName: '',
        lastName: '',
        age: 18,
      })
      seteditingUser('')
    }else {
      createUser(formData);
      setFormData({
        firstName: '',
        lastName: '',
        age: 18,
      })
    }
  }

  const deleteUser = async(id) => {
    try {
        const response = await fetch(`http://localhost:5000/users/${id}`, {
            method: 'DELETE'
        });
        const parsedResponse = await response.json();
        setUsers(parsedResponse.data);
      } catch (error) {
        console.log(error);
      }
  }

  const getUser = async(id) => {
    seteditingUser(id)
    try {
      const response = await fetch(`http://localhost:5000/users/${id}`);
      const parsedResponse = await response.json();
      setCurrentUser(parsedResponse);
    } catch (error) {
      console.log(error);
    }
  }
  //since cannot have multiple setState on below other in getUser
  useEffect(() => {
    setFormData(currentUser);
  }, [currentUser]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleShowUsers = () => {
    setShowUsers(!showUsers);
  };

  return (
    <div>
      <Button onClick={handleShowUsers} variant="contained">
        Show Users
      </Button>
      <div>
        {showUsers && (
          <div>
            <UsersTable rows = {users} getUser={getUser} deleteUser={deleteUser} seteditingUser={seteditingUser}/>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit}>
          <input type="text" name="firstName" placeholder="Enter First Name" value={formData.firstName} onChange={handleInputChange}/>
          <input type="text" name="lastName" placeholder="Enter Last Name" value={formData.lastName} onChange={handleInputChange}/>
          <input type="number" name="age" placeholder="Enter Age" value={formData.age} onChange={handleInputChange}/>
          <button type="submit">Create User</button>
      </form>
    </div>
  );
}

export default ResultScreen;

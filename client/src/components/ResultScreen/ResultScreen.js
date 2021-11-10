import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import UsersTable from "../UsersTable/UsersTable";

function ResultScreen() {
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);
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
        console.log(parsedResponse.data);
        setUsers(parsedResponse.data);
      } catch (error) {
        console.log(error);
      } 
  }

  const handleInputChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser(formData);
  }

  const handleDeleteUser = async(id) => {
    try {
        const response = await fetch(`http://localhost:5000/users/${id}`, {
            method: 'DELETE'
        });
        const parsedResponse = await response.json();
        console.log(parsedResponse);
        setUsers(parsedResponse.data);
      } catch (error) {
        console.log(error);
      }
  }

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
            <UsersTable rows = {users} handleDeleteUser={handleDeleteUser}/>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit}>
          <input type="text" name="firstName" onChange={handleInputChange}/>
          <input type="text" name="lastName" onChange={handleInputChange}/>
          <input type="number" name="age" onChange={handleInputChange}/>
          <button type="submit">Create User</button>
      </form>
    </div>
  );
}

export default ResultScreen;

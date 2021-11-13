import Home from './components/Home';
import React, { useState, useEffect } from "react";
import RestData from "./Container";

function App() {
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

  const createUser = async () => {
    if(formData.firstName && formData.lastName) {
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
      createUser();
      setFormData({
        firstName: '',
        lastName: '',
        age: 18,
      })
    }
  }

  const handleInputChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleShowUsers = () => {
    setShowUsers(!showUsers);
  };

  useEffect(() => {
    setFormData(currentUser);
  }, [currentUser]);

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="App">
      <RestData.Provider
        value={{
          users: users,
          showUsers: showUsers,
          editingUser: editingUser,
          currentUser: currentUser,
          formData: formData,

          handleShowUsers: handleShowUsers,
          seteditingUser: seteditingUser,
          handleSubmit: handleSubmit,
          handleInputChange: handleInputChange,
          deleteUser: deleteUser,
          getUser: getUser,
        }}
      >
        <Home/>
      </RestData.Provider>
    </div>
  );
}

export default App;

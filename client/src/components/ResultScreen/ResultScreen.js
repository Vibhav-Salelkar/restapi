import React, { useContext } from "react";
import Button from "@mui/material/Button";
import UsersTable from "../UsersTable/UsersTable";
import RestData from "../../Container";
import './style.css';

function ResultScreen() {

  const restData = useContext(RestData)

  return (
    <div>
      <Button onClick={restData.handleShowUsers} variant="contained">
        Show Users
      </Button>
      <div>
        {restData.showUsers && (
          <div>
            <UsersTable/>
          </div>
        )}
      </div>
      <form className="restForm" onSubmit={restData.handleSubmit}>
          <input  className="restForm_field" type="text" name="firstName" placeholder="Enter First Name" value={restData.formData.firstName} onChange={restData.handleInputChange}/>
          <input  className="restForm_field" type="text" name="lastName" placeholder="Enter Last Name" value={restData.formData.lastName} onChange={restData.handleInputChange}/>
          <input  className="restForm_field" type="number" name="age" placeholder="Enter Age" value={restData.formData.age} onChange={restData.handleInputChange}/>
          <button className="restForm_submit" type="submit">{restData.editingUser === '' ? 'Create User' : 'Edit User'}</button>
      </form>
    </div>
  );
}

export default ResultScreen;

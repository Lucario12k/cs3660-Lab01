import React, { Component } from 'react';
import './EmployeeCard.css';

function EmployeeCard(props) {
  async function handleEdit(event) {
    props.setTargetEmployee(props.employee);
  }

  async function handleToggle(event) {
    if (props.employee.active) {
      props.deleteEmployee(props.employee.id);
    } else {
      props.activateEmployee(props.employee.id);
    }
  }

  return (
    <div className="EmployeeCard">
      <div className="icon-list" style={{ display: (props.employee.id !== -1) ? 'block' : 'none' }}>
        <img className="icon" src={require('./pencil-32.png')} onClick={handleEdit} />
        <img className="icon" src={require(`./${props.employee.active ? 'trash' : 'untrash'}-32.png`)} onClick={handleToggle} />
      </div>
      <img
        src={props.employee.avatar}
        alt="Avatar"
      />
      <div className="container">
        <h4>{props.employee.name}</h4>
        <p>{props.employee.title}</p>
      </div>
    </div>
  );
}

export default EmployeeCard;
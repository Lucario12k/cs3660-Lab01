import React, { Component } from 'react';
import './EmployeeCard.css';

class EmployeeCard extends Component {

  render() {
    return (
      <div className="EmployeeCard">
        <img
          src={this.props.employee.avatar}
          alt="Avatar"
        />
        <div className="container">
          <h4>{this.props.employee.name}</h4>
          <p>{this.props.employee.title}</p>
        </div>
      </div>
    )
  }
}

export default EmployeeCard;
import React, { Component } from 'react'
import EmployeeCard from './EmployeeCard'

class EmployeeList extends Component {


  state = {
    employees: []
  }

  componentDidMount() {
    fetch('/api/employees')
      .then((response) => response.json())
      .then(data => {
        this.setState({ employees: data });
      });
  }

  render() {
    return (
      <div>
        {this.state.employees.map(employee => <EmployeeCard key={employee.id} employee={employee} />)}
      </div>
    )
  }
}

export default EmployeeList;

import React, {Component} from 'react'

class EmployeeCard extends Component {

  render() {
    return (
        <div className="card">
            <img
                src={this.props.employee.avatar}
                alt="Avatar"
                width="240px"
            />
            <div className="container">
                <h4>#{this.props.employee.id}</h4>
                <h4>{this.props.employee.name}</h4>
                <p>{this.props.employee.title}</p>
            </div>
        </div>
    )
  }
}

export default EmployeeCard;
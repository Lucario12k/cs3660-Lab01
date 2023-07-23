import { useState } from 'react';
import EmployeeCard from './EmployeeCard';

function EmployeeList() {
    const [employees, setEmployees] = useState([]);

    return (
        <div className="EmployeeList">
            {employees.map(employee => <EmployeeCard key={employee.id} employee={employee} />)}
        </div>
    );
}

export default EmployeeList;
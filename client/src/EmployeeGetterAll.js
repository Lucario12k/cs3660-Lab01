import {useState} from 'react';
import {getAll} from './api';
import EmployeeCard from './EmployeeCard';

function EmployeeGetterAll() {
    const [employees, setEmployees] = useState([]);

    async function handleClick() {
        const res = await getAll();
        if (res.status != 200) {
            alert(`Error ${res.status}: ${res.statusText}`);
            return;
        }
        const data = await res.json();
        setEmployees(data);
    }

    return (
        <>
            <button onClick={handleClick}>Get All</button>
            <div className="EmployeeList">
                {employees.map(employee => <EmployeeCard key={employee.id} employee={employee} />)}
            </div>
        </>
    );
}

export default EmployeeGetterAll;
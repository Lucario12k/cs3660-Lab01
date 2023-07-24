import { useState } from 'react';
import { getAll, getAllBySearch } from './api';
import EmployeeCard from './EmployeeCard';
import './EmployeeList.css';

function EmployeeList(props) {
    const [employees, setEmployees] = useState([]);

    async function getAllEmployees() {
        const res = await getAll();
        if (res.status != 200) {
            alert(`Error ${res.status}: ${res.statusText}`);
            return;
        }
        const data = await res.json();
        setEmployees(data);
    }

    async function getAllEmployeesBySearch(terms) {
        const res = await getAllBySearch(terms);
        if (res.status != 200) {
            alert(`Error ${res.status}: ${res.statusText}`);
            return;
        }
        const data = await res.json();
        setEmployees(data);
    }

    if (props.searchTerms.length === 0) {
        getAllEmployees();
    } else {
        getAllEmployeesBySearch(props.searchTerms);
    }

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

export default EmployeeList;
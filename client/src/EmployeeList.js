import { useState, useEffect } from 'react';
import { getAll, getAllBySearch } from './api';
import EmployeeCard from './EmployeeCard';
import './EmployeeList.css';
import ResultDialogue from './ResultDialogue';

function EmployeeList(props) {
    const [employees, setEmployees] = useState([]);
    const [dialogue, setDialogue] = useState(<></>);

    function showDialogue(title, contents, success) {
        setDialogue(<ResultDialogue title={title} contents={contents} onClose={deleteDialogue} success={success} />);
    }

    function deleteDialogue() {
        setDialogue(<></>);
    }

    function getEmployeeCardsOverwritten() {
        let empId = props.overwrite.id;
        let empCards = [];

        employees.forEach((item, index, arr) => {
            if (item.id == empId) {
                empCards[index] = props.overwrite;
            } else {
                empCards[index] = item;
            }
        });

        if (empId === -1) {
            empCards.push(props.overwrite);
        }

        return empCards.map(employee => <EmployeeCard key={employee.id} employee={employee} />);
    }

    async function getAllEmployees() {
        const res = await getAll();
        if (res.status != 200) {
            showDialogue(`Error ${res.status}`, res.statusText, false);
            return;
        }
        const data = await res.json();

        setEmployees(data);
    }

    async function getAllEmployeesBySearch(terms) {
        const res = await getAllBySearch(terms);
        if (res.status != 200) {
            showDialogue(`Error ${res.status}`, res.statusText, false);
            return;
        }
        const data = await res.json();

        setEmployees(data);
    }

    useEffect(() => {
        if (props.searchTerms.length === 0) {
            getAllEmployees();
        } else {
            getAllEmployeesBySearch(props.searchTerms);
        }
    });

    return (
        <div className="EmployeeList">
            {getEmployeeCardsOverwritten()}
        </div>
    );
}

export default EmployeeList;
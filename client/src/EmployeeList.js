import { useState, useEffect } from 'react';
import { getAll, getAllBySearch, deleteById, activateById, filterByActive } from './api';
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

        return empCards.map(employee => <EmployeeCard
            key={employee.id}
            employee={employee}
            setTargetEmployee={setTargetEmployee}
            deleteEmployee={deleteEmployee}
            activateEmployee={activateEmployee}
        />);
    }

    async function getAllEmployees() {
        const res = await getAll();

        if (res.status != 200) {
            showDialogue(`Error ${res.status}`, res.statusText, false);
            return;
        }
        const data = filterByActive(await res.json(), props.inactiveOnly);

        setEmployees(data);
    }

    async function getAllEmployeesBySearch(terms) {
        const res = await getAllBySearch(terms);
        if (res.status != 200) {
            showDialogue(`Error ${res.status}`, res.statusText, false);
            return;
        }
        const data = filterByActive(await res.json(), props.inactiveOnly);

        setEmployees(data);
    }

    async function deleteEmployee(id) {
        const res = await deleteById(id);

        if (res.status == 204) {
            showDialogue("Success", `Successfully deleted employee #${id}.`, true);
        } else {
            showDialogue(`Error ${res.status}`, res.statusText, false);
        }

        if (props.targetId == id) {
            props.setTargetId(-2);
        }
        props.refreshSearch();
    }

    async function activateEmployee(id) {
        const res = await activateById(id);

        if (res.status == 204) {
            showDialogue("Success", `Successfully activated employee #${id}.`, true);
        } else {
            showDialogue(`Error ${res.status}`, res.statusText, false);
        }

        if (props.targetId == id) {
            props.setTargetId(-2);
        }
        props.refreshSearch();
    }

    function setTargetEmployee(employee) {
        props.setTargetId(employee.id);
        props.setOverwrite(employee);
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
            {dialogue}
            {getEmployeeCardsOverwritten()}
        </div>
    );
}

export default EmployeeList;
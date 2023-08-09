import { useState, useEffect } from 'react';
import { getAll, getAllBySearch, deleteById, activateById, filterByActive } from './api';
import localforage from 'localforage';
import { matchSorter } from "match-sorter";
import EmployeeCard from './EmployeeCard';
import './EmployeeList.css';
import ResultDialogue from './ResultDialogue';

function EmployeeList(props) {
    const [employees, setEmployees] = useState([]);
    const [dialogue, setDialogue] = useState(<></>);

    useEffect(() => {
        localforage.setItem("employees", []);
    }, [])

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
        let data;

        if (navigator.onLine) {
            const res = await getAll();

            if (res.status != 200) {
                showDialogue(`Error ${res.status}`, res.statusText, false);
                return;
            }

            const dataRaw = await res.json();
            localforage.setItem("employees", dataRaw);
            data = filterByActive(dataRaw, props.inactiveOnly);

        } else {
            showDialogue("Error", "Currently offline; showing cached employees.", false);
            data = await localforage.getItem("employees");
            data = filterByActive(data, props.inactiveOnly);
        }

        setEmployees(data);
    }

    async function getAllEmployeesBySearch(terms) {
        let data;

        if (navigator.onLine) {
            const res = await getAllBySearch(terms);

            if (res.status != 200) {
                showDialogue(`Error ${res.status}`, res.statusText, false);
                return;
            }

            data = filterByActive(await res.json(), props.inactiveOnly);

        } else {
            showDialogue("Error", "Currently offline; showing cached employees.", false);
            data = await localforage.getItem("employees");
            data = filterByActive(data, props.inactiveOnly);
            data = matchSorter(data, terms, { keys: ["name"] });
        }

        setEmployees(data);
    }

    async function deleteEmployee(id) {
        if (!navigator.onLine) {
            showDialogue("Error", "Currently offline.", false);
            return;
        }

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
        if (!navigator.onLine) {
            showDialogue("Error", "Currently offline.", false);
            return;
        }

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
    }, [props.searchTerms]);

    return (
        <div className="EmployeeList">
            {dialogue}
            {getEmployeeCardsOverwritten()}
        </div>
    );
}

export default EmployeeList;
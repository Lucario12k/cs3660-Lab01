import { useState } from 'react';
import { getById, postNewEmployee, updateById } from './api';
import './EditorPanel.css';
import ResultDialogue from './ResultDialogue';

function EditorPanel(props) {
    const [dialogue, setDialogue] = useState(<></>);

    async function handleCreateNew(event) {
        if (!navigator.onLine) {
            showDialogue("Error", "Currently offline; new employee will not be saved.", false);
        }

        props.setTargetId(-1);
        refreshOverwrite("", "", "", -1);
    }

    async function handleSubmit(event) {
        event.preventDefault();

        refreshOverwrite(null, null,
            "https://api.dicebear.com/6.x/bottts/svg?seed=" + encodeURIComponent(props.overwrite.name)
        );

        if (event.nativeEvent.submitter.id == "editor-cancel") {
            handleCancel();
        } else {
            handleSave();
        }
    }

    function handleCancel() {
        props.setTargetId(-2);
        props.refreshSearch();
    }

    function handleSave() {
        const employee = {
            name: props.overwrite.name,
            title: props.overwrite.title,
            avatar: props.overwrite.avatar
        };

        if (props.targetId == -1) {
            handleSaveNew(employee);
        } else {
            handleSaveUpdate(props.targetId, employee);
        }

        props.setTargetId(-2);
        props.refreshSearch();
    }

    async function handleSaveNew(employee) {
        if (!navigator.onLine) {
            showDialogue("Error", "Currently offline; new employee will not be saved.", false);
            return;
        }

        const res = await postNewEmployee(employee);

        if (res.status == 201) {
            showDialogue("Success", "Successfully created new employee.", true);
        } else {
            showDialogue(`Error ${res.status}`, res.statusText, false);
        }
    }

    async function handleSaveUpdate(empId, employee) {
        if (!navigator.onLine) {
            showDialogue("Error", "Currently offline; employee will not be updated.", false);
            return;
        }

        const res = await updateById(empId, employee);

        if (res.status == 204) {
            showDialogue("Success", `Successfully updated employee #${empId}.`, true);
        } else {
            showDialogue(`Error ${res.status}`, res.statusText, false);
        }
    }

    async function refreshOverwrite(name_, title_, avatar_, id_) {
        if (name_ == null) {
            name_ = props.overwrite.name;
        }
        if (title_ == null) {
            title_ = props.overwrite.title;
        }
        if (avatar_ == null) {
            avatar_ = props.overwrite.avatar;
        }
        if (id_ == null) {
            id_ = props.targetId;
        }

        const employee = {
            id: id_,
            name: name_,
            title: title_,
            avatar: avatar_
        };

        props.setOverwrite(employee);
    }

    function showDialogue(title, contents, success) {
        setDialogue(<ResultDialogue title={title} contents={contents} onClose={deleteDialogue} success={success} />);
    }

    function deleteDialogue() {
        setDialogue(<></>);
    }

    return (
        <div className="EditorPanel">
            {dialogue}
            <div className="NoneSelected" style={{ display: (props.targetId === -2) ? 'block' : 'none' }}>
                <button onClick={handleCreateNew}>Create New</button>
            </div>
            <div className="CardSelected" style={{ display: (props.targetId !== -2) ? 'block' : 'none' }}>
                <img src={props.overwrite.avatar} alt="Avatar" />
                <form onSubmit={handleSubmit}>
                    <label id="editor-label-name" htmlFor="editor-input-name">
                        Name:
                    </label>
                    <input
                        type="text"
                        id="editor-input-name"
                        placeholder="Enter Name Here"
                        value={props.overwrite.name}
                        onChange={(e) => { refreshOverwrite(e.target.value, null, null); }} />

                    <label id="editor-label-title" htmlFor="editor-input-title">
                        Title:
                    </label>
                    <input
                        type="text"
                        id="editor-input-title"
                        placeholder="Enter Title Here"
                        value={props.overwrite.title}
                        onChange={(e) => { refreshOverwrite(null, e.target.value, null); }} />

                    <label id="editor-label-avatar" htmlFor="editor-input-avatar">
                        Avatar:
                    </label>
                    <input
                        type="text"
                        id="editor-input-avatar"
                        placeholder="Leave Empty for Default"
                        value={props.overwrite.avatar}
                        onChange={(e) => { refreshOverwrite(null, null, e.target.value); }} />

                    <input id="editor-cancel" type="submit" value="Cancel" />
                    <input id="editor-save" type="submit" value="Save" />
                </form>
            </div>
        </div>
    );
}

export default EditorPanel;
import { useState } from 'react';
import { postNewEmployee, updateById } from './api';
import './EditorPanel.css';
import ResultDialogue from './ResultDialogue';

function EditorPanel(props) {
    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [avatar, setAvatar] = useState("");
    const [dialogue, setDialogue] = useState(<></>)

    async function handleCreateNew(event) {
        props.setTargetId(-1);
        setName("");
        setTitle("");
        setAvatar("");
        refreshOverwrite("", "", "");
    }

    async function handleSubmit(event) {
        event.preventDefault();

        setAvatar("https://api.dicebear.com/6.x/bottts/svg?seed=" + encodeURIComponent(name));

        if (event.nativeEvent.submitter.id == "editor-cancel") {
            handleCancel();
        } else {
            handleSave();
        }
    }

    function handleCancel() {
        props.setTargetId(-2);
        props.refreshSearch();
        showDialogue("Error", "Cancelled");
    }

    function handleSave() {
        const employee = {
            name: name,
            title: title,
            avatar: avatar
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
        const res = await postNewEmployee(employee);

        if (res.status == 201) {
            showDialogue("Success", "Successfully created new employee.", true);
        } else {
            showDialogue(`Error ${res.status}`, res.statusText, false);
        }
    }

    async function handleSaveUpdate(empId, employee) {
        const res = await updateById(empId, employee);

        if (res.status == 204) {
            showDialogue("Success", `Successfully updated employee #${empId}.`, true);
        } else {
            showDialogue(`Error ${res.status}`, res.statusText, false);
        }
    }

    async function refreshOverwrite(name_, title_, avatar_) {
        if (name_ == null) {
            name_ = name;
        }
        if (title_ == null) {
            title_ = title;
        }
        if (avatar_ == null) {
            avatar_ = avatar;
        }

        const employee = {
            id: props.targetId,
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
                <img src={avatar} alt="Avatar" />
                <form onSubmit={handleSubmit}>
                    <label id="editor-label-name" htmlFor="editor-input-name">
                        Name:
                    </label>
                    <input
                        type="text"
                        id="editor-input-name"
                        placeholder="Enter Name Here"
                        value={name}
                        onChange={(e) => { setName(e.target.value); refreshOverwrite(e.target.value, null, null); }} />

                    <label id="editor-label-title" htmlFor="editor-input-title">
                        Title:
                    </label>
                    <input
                        type="text"
                        id="editor-input-title"
                        placeholder="Enter Title Here"
                        value={title}
                        onChange={(e) => { setTitle(e.target.value); refreshOverwrite(null, e.target.value, null); }} />

                    <label id="editor-label-avatar" htmlFor="editor-input-avatar">
                        Avatar:
                    </label>
                    <input
                        type="text"
                        id="editor-input-avatar"
                        placeholder="Leave Empty for Default"
                        value={avatar}
                        onChange={(e) => { setAvatar(e.target.value); refreshOverwrite(null, null, e.target.value); }} />

                    <input id="editor-cancel" type="submit" value="Cancel" />
                    <input id="editor-save" type="submit" value="Save" />
                </form>
            </div>
        </div>
    );
}

export default EditorPanel;
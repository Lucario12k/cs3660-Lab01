import { useState } from 'react';
import './App.css';
import SearchBar from './SearchBar';
import EmployeeList from './EmployeeList';
import EditorPanel from './EditorPanel';

function App() {
  const [searchTerms, setSearchTerms] = useState("");
  const [targetId, setTargetId] = useState(-2);
  const [refresh, setRefresh] = useState(false);
  const [overwrite, setOverwrite] = useState({ id: -2 });

  function refreshSearch() {
    setRefresh(false);
    setRefresh(true);
    setOverwrite({ id: -2 });
  }

  return (
    <div className="App">
      <header>
        <SearchBar onSearch={setSearchTerms} />
      </header>
      <div className="list">
        <EmployeeList searchTerms={searchTerms} targetId={targetId} setTargetId={setTargetId} refreshSearch={refreshSearch} setOverwrite={setOverwrite} overwrite={overwrite} />
      </div>
      <div className="editor">
        <EditorPanel targetId={targetId} setTargetId={setTargetId} refreshSearch={refreshSearch} setOverwrite={setOverwrite} overwrite={overwrite} />
      </div>
    </div>
  );
}

export default App;

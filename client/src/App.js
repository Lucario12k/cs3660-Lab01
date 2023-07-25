import { useState } from 'react';
import './App.css';
import SearchBar from './SearchBar';
import EmployeeList from './EmployeeList';
import EditorPanel from './EditorPanel';

function App() {
  const [searchTerms, setSearchTerms] = useState("");
  const [targetId, setTargetId] = useState(-2);
  const [refresh, setRefresh] = useState(false);

  function refreshSearch() {
    setRefresh(false);
    setRefresh(true);
  }

  return (
    <div className="App">
      <header>
        <SearchBar onSearch={setSearchTerms} />
      </header>
      <div className="list">
        <EmployeeList searchTerms={searchTerms} setTargetId={setTargetId} />
      </div>
      <div className="editor">
        <EditorPanel targetId={targetId} setTargetId={setTargetId} refreshSearch={refreshSearch} />
      </div>
    </div>
  );
}

export default App;

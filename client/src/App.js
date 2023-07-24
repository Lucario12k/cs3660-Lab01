import { useState } from 'react';
import './App.css';
import SearchBar from './SearchBar';
import EmployeeList from './EmployeeList';
import EditorPanel from './EditorPanel';

function App() {
  const [searchTerms, setSearchTerms] = useState("");

  return (
    <div className="App">
      <header>
        <SearchBar onSearch={setSearchTerms} />
      </header>
      <div className="list">
        <EmployeeList searchTerms={searchTerms} />
      </div>
      <div className="editor">
        <EditorPanel />
      </div>
    </div>
  );
}

/*
import EmployeeDeleter from './EmployeeDeleter';
import EmployeeGetterAll from './EmployeeGetterAll';
import EmployeeUpdater from './EmployeeUpdater';

function App() {
  return (
    <div className="App">
      <div>
        <EmployeeDeleter/>
      </div>
      <div>
        <EmployeeGetterAll/>
      </div>
      <div>
        <EmployeeUpdater/>
      </div>
    </div>
  );
}*/

export default App;

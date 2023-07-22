import './App.css';
import SearchBar from './SearchBar';

function App() {
  return (
    <div className="App">
      <header>
        <SearchBar />
      </header>
      <div className="list">

      </div>
      <div className="editor">

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

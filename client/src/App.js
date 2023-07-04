import './App.css';
import EmployeeList from './EmployeeList'

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
        <EmployeeEditor/>
      </div>
    </div>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import EmployeeList from './employeelist'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          This is the employee list: count:0
          <EmployeeList></EmployeeList>
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Earn React
        </a>
      </header>
    </div>
  );
}

export default App;

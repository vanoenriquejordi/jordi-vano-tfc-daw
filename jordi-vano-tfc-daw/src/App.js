import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {process.env.REACT_APP_SALUDO}
        </p>
        <a className="App-link" href="/login">
          Acceder
        </a>
      </header>
    </div>
  );
}

export default App;

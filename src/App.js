import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Home from 'views/Home';
import {BrowserRouter as Router,Route } from "react-router-dom"
function App() {
  return (
    <Router>
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header> */}
      <Route path="/" component={Home}/>
    </div></Router>
  );
}

export default App;

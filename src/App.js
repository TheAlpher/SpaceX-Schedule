import "bootstrap/dist/css/bootstrap.min.css";
import "./custom.css";
import Home from "views/Home";
import { BrowserRouter as Router, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/" component={Home} />
      </div>
    </Router>
  );
}

export default App;

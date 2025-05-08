import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Characters from "./components/Characters";
import Episodes from "./components/Episodes";
import Locations from "./components/Locations";
import './App.css';

function App() {
  return (
    <Router>
      <nav className="navbar">
        <NavLink to="/" className="nav-link">Characters</NavLink>
        <NavLink to="/episodes" className="nav-link">Episodes</NavLink>
        <NavLink to="/locations" className="nav-link">Locations</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Characters />} />
        <Route path="/episodes" element={<Episodes />} />
        <Route path="/locations" element={<Locations />} />
      </Routes>
    </Router>
  );
}

export default App;

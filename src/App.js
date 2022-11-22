import "./App.css";
import Dashboard from "./components/Dashboard";
import Header from "./components/Layout/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AddProject from "./components/Project/AddProject";
import { Provider } from "react-redux";
import { store } from "./redux/Store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/addProject" element={<AddProject />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;

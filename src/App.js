import "./App.css";
import Dashboard from "./components/Dashboard";
import Header from "./components/Layout/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AddProject from "./components/Project/AddProject";
import { Provider } from "react-redux";
import { store } from "./redux/Store";
import UpdateProject from "./components/Project/UpdateProject";
import ProjectBoard from "./components/ProjectBoard/ProjectBoard";
import AddProjectTask from "./components/ProjectBoard/ProjectTasks/AddProjectTask";

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
            <Route
              path="/updateProject/:projectId"
              element={<UpdateProject />}
            />
            <Route path="/projectBoard/:id" element={<ProjectBoard />} />
            <Route path="/addProjectTask/:id" element={<AddProjectTask />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;

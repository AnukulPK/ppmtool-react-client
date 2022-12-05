import axios from "axios";

const createProject = async (project, history) => {
  await axios.post("http://localhost:8080/api/project", project);
  history("/dashboard");
};

const projectService = { createProject };

export default projectService;

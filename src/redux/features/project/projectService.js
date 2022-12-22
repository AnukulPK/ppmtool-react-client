import axios from "axios";

const createProject = async (project, history) => {
  await axios.post("http://localhost:8080/api/project", project);
  history("/dashboard");
};

const getProjects = async () => {
  const response = await axios.get("http://localhost:8080/api/project/all");
  return response.data;
};

const getProject = async (projectId) => {
  const response = await axios.get(
    `http://localhost:8080/api/project/${projectId}`
  );
  return response.data;
};

const deleteProject = async (projectId) => {
  await axios.delete(`http://localhost:8080/api/project/${projectId}`);
  return projectId;
};

const projectService = {
  createProject,
  getProjects,
  getProject,
  deleteProject,
};

export default projectService;

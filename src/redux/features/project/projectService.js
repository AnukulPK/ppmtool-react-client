import axios from "axios";

const createProject = async (project, history) => {
  await axios.post("/api/project", project);
  history("/dashboard");
};

const getProjects = async () => {
  const response = await axios.get("/api/project/all");
  return response.data;
};

const getProject = async (projectId) => {
  const response = await axios.get(`/api/project/${projectId}`);
  return response.data;
};

const deleteProject = async (projectId) => {
  if (window.confirm("Are you sure? This will delete the project")) {
    await axios.delete(`/api/project/${projectId}`);
    return projectId;
  }
};

const projectService = {
  createProject,
  getProjects,
  getProject,
  deleteProject,
};

export default projectService;

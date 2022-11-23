import axios from "axios";

const createProject = async (project) => {
  const response = await axios.post(
    "http://localhost:8080/api/project",
    project
  );
  //   history("/dashboard");
  return response.data;
};

const projectService = { createProject };

export default projectService;

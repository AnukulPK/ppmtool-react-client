import axios from "axios";

const addProjectTask = async (backlog_id, project_task, history) => {
  await axios.post(`/api/backlog/${backlog_id}`, project_task);
  history(`/projectBoard/${backlog_id}`);
};

const getBacklog = async () => {};

const getProjectTask = async () => {};

const deleteProjectTask = async () => {};

const backlogService = {
  addProjectTask,
  getBacklog,
  getProjectTask,
  deleteProjectTask,
};

export default backlogService;

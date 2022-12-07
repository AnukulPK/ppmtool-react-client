import CreateProjectButton from "./Project/CreateProjectButton";
import ProjectItem from "./Project/ProjectItem";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProjects, reset } from "../redux/features/project/projectSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { isLoading, isError, isSuccess, message, projects } = useSelector(
    (state) => state.projects
  );
  const [projectData, setProjectData] = useState([]);

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);

  useEffect(() => {
    dispatch(getProjects());
    if (projects) setProjectData(projects);
  }, [dispatch, projects]);

  return (
    <div className="projects">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="display-4 text-center">Projects</h1>
            <br />
            <CreateProjectButton />
            <br />
            <hr />
            {projectData?.map((projectValue) => (
              <ProjectItem
                key={projectValue.projectIdentifier}
                project={projectValue}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

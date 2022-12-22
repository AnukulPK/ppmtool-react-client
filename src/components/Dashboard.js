import CreateProjectButton from "./Project/CreateProjectButton";
import ProjectItem from "./Project/ProjectItem";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProjects, reset } from "../redux/features/project/projectSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { isError, isSuccess, projects } = useSelector(
    (state) => state.projects
  );

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, projects, isSuccess]);

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  if (isError) {
    return <h3>Something went wrong!</h3>;
  }

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
            {projects?.map((projectValue) => (
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

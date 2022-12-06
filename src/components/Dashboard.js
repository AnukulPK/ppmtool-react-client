import CreateProjectButton from "./Project/CreateProjectButton";
import ProjectItem from "./Project/ProjectItem";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProjects } from "../redux/features/project/projectSlice";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { isLoading, isError, message, projects } = useSelector(
    (state) => state.projects
  );

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

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

            <ProjectItem />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

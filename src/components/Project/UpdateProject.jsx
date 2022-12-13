import React, { useEffect, useState } from "react";
import {
  getProject,
  createProject,
} from "../../redux/features/project/projectSlice";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProject = () => {
  const [formData, setFormData] = useState({
    id: "",
    projectName: "",
    projectIdentifier: "",
    description: "",
    start_date: "",
    end_date: "",
  });
  const { projectName, projectIdentifier, description, start_date, end_date } =
    formData;
  const { project, isError } = useSelector((state) => state.projects);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { projectId } = useParams();

  useEffect(() => {
    if (isError) {
      navigate("/dashboard");
    }
  }, [isError, navigate]);

  useEffect(() => {
    dispatch(getProject(projectId));
  }, [dispatch, projectId]);

  useEffect(() => {
    setFormData({
      id: projectId,
      projectName: project.projectName,
      projectIdentifier: project.projectIdentifier,
      description: project.description,
      start_date: project.start_date,
      end_date: project.end_date,
    });
  }, [project, projectId]);

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const updatedProject = {
      id: projectId,
      projectName: projectName,
      projectIdentifier: projectIdentifier,
      description: description,
      start_date: start_date,
      end_date: end_date,
    };
    console.log(updatedProject);
    dispatch(createProject(updatedProject, navigate));
  };

  return (
    <div className="project ">
      <div className="container ">
        <div className="row ">
          <div className="col-md-8 m-auto ">
            <h5 className="display-4 text-center">Update Project form</h5>
            <hr />
            <form className="form-display" onSubmit={onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg "
                  placeholder="Project Name"
                  name="projectName"
                  value={projectName}
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Unique Project ID"
                  value={projectIdentifier}
                  name="projectIdentifier"
                  onChange={onChange}
                  // disabled
                />
              </div>

              <div className="form-group">
                <textarea
                  className="form-control form-control-lg"
                  placeholder="Project Description"
                  value={description}
                  name="description"
                  onChange={onChange}
                ></textarea>
              </div>
              <h6>Start Date</h6>
              <div className="form-group">
                <input
                  type="date"
                  className="form-control form-control-lg"
                  name="start_date"
                  value={start_date}
                  onChange={onChange}
                />
              </div>
              <h6>Estimated End Date</h6>
              <div className="form-group">
                <input
                  type="date"
                  className="form-control form-control-lg"
                  name="end_date"
                  value={end_date}
                  onChange={onChange}
                />
              </div>

              <input type="submit" className="btn btn-primary btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProject;

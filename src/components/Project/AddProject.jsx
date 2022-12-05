import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createProject } from "../../redux/features/project/projectSlice";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";

const AddProject = () => {
  const [formData, setFormData] = useState({
    projectName: "",
    projectIdentifier: "",
    description: "",
    start_date: "",
    end_date: "",
  });
  const [errors, setErrors] = useState({});

  const { projectName, projectIdentifier, description, start_date, end_date } =
    formData;

  const dispatch = useDispatch();
  const history = useNavigate();

  const { isLoading, isError, message } = useSelector(
    (state) => state.projects
  );

  useEffect(() => {
    if (isError) {
      setErrors({
        description: message?.description,
        projectIdentifier: message?.projectIdentifier,
        projectName: message?.projectName,
      });
    }
  }, [isError, message]);

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const newProject = {
      projectName: projectName,
      projectIdentifier: projectIdentifier,
      description: description,
      start_date: start_date,
      end_date: end_date,
    };
    // console.log("formData", newProject);
    dispatch(createProject(newProject, history));
  };

  if (isLoading) {
    return <h2>Loading....</h2>;
  }

  return (
    <div className="project">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h5 className="display-4 text-center">Create Project form</h5>
            <hr />
            <form className="form-display" onSubmit={onSubmitHandler}>
              <div className="form-group">
                <input
                  type="text"
                  className={classNames("form-control form-control-lg", {
                    "is-invalid": errors.projectName,
                  })}
                  placeholder="Project Name"
                  name="projectName"
                  onChange={(e) => onChange(e)}
                  value={projectName}
                />
                {errors.projectName && (
                  <div className="invalid-feedback">{errors.projectName}</div>
                )}
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className={classNames("form-control form-control-lg", {
                    "is-invalid": errors.projectIdentifier,
                  })}
                  placeholder="Unique Project ID"
                  name="projectIdentifier"
                  onChange={(e) => onChange(e)}
                  value={projectIdentifier}
                />
              </div>
              {errors.projectIdentifier && (
                <div className="invalid-feedback">
                  {errors.projectIdentifier}
                </div>
              )}

              <div className="form-group">
                <textarea
                  className={classNames("form-control form-control-lg", {
                    "is-invalid": errors.description,
                  })}
                  placeholder="Project Description"
                  name="description"
                  onChange={(e) => onChange(e)}
                  value={description}
                ></textarea>
                {errors.description && (
                  <div className="invalid-feedback">{errors.description}</div>
                )}
              </div>
              <h6>Start Date</h6>
              <div className="form-group">
                <input
                  type="date"
                  className="form-control form-control-lg"
                  name="start_date"
                  onChange={(e) => onChange(e)}
                  value={start_date}
                />
              </div>
              <h6>Estimated End Date</h6>
              <div className="form-group">
                <input
                  type="date"
                  className="form-control form-control-lg"
                  name="end_date"
                  onChange={(e) => onChange(e)}
                  value={end_date}
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

export default AddProject;

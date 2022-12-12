import React, { useEffect } from "react";
import { getProject } from "../../redux/features/project/projectSlice";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProject = () => {
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

  return (
    <div className="project ">
      <div className="container ">
        <div className="row ">
          <div className="col-md-8 m-auto ">
            <h5 className="display-4 text-center">Update Project form</h5>
            <hr />
            <form className="form-display">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg "
                  placeholder="Project Name"
                  value={project.projectName}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Unique Project ID"
                  value={project.projectIdentifier}
                  disabled
                />
              </div>

              <div className="form-group">
                <textarea
                  className="form-control form-control-lg"
                  placeholder="Project Description"
                  value={project.description}
                ></textarea>
              </div>
              <h6>Start Date</h6>
              <div className="form-group">
                <input
                  type="date"
                  className="form-control form-control-lg"
                  name="start_date"
                  value={project.start_date}
                />
              </div>
              <h6>Estimated End Date</h6>
              <div className="form-group">
                <input
                  type="date"
                  className="form-control form-control-lg"
                  name="end_date"
                  value={project.end_date}
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

import React, { useState } from "react";
import { ValidatorForm } from "react-form-validator-core";

import "./blank_page_style.css";

import InputWithLabel from "../../Forms/Elements/InputWithLabel";

const content = ({}) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  let handleFormSubmit = () => {
    //Call this function on form submit with no errors
  };

  return (
    <div className="login-wrapper ">
      <div className="bg-pic">
        <div className="bg-caption pull-bottom sm-pull-bottom text-white p-l-20 m-b-20">
          <h1 className="semi-bold text-white">
            Meet pages - The simplest and fastest way to build web UI for your
            dashboard or app.
          </h1>
          <p className="small">
            Our beautifully-designed UI Framework come with hundreds of
            customizable features. Every Layout is just a starting point.
            ©2019-2020 All Rights Reserved. Pages® is a registered trademark of
            Revox Ltd.
          </p>
        </div>
      </div>
      <div className="login-container bg-white">
        <div className="p-l-50 p-r-50 p-t-50 m-t-30 sm-p-l-15 sm-p-r-15 sm-p-t-40">
          <img
            src={process.env.PUBLIC_URL + "/assets/img/logo-48x48_c.png"}
            alt="logo"
            data-src={process.env.PUBLIC_URL + "/assets/img/logo-48x48_c.png"}
            data-src-retina="/assets/img/logo-48x48_c.png"
            width="48"
            height="48"
          />
          <h2 className="p-t-25">
            Get Started <br /> with your Dashboard
          </h2>
          <p className="mw-80 m-t-5">Sign in to your account</p>

          <ValidatorForm
            instantValidate={true}
            onSubmit={handleFormSubmit}
            className="p-t-15"
          >
            <div className="form-group  form-group-default required ">
              <InputWithLabel
                onChange={(e) => setUserName(e.target.value)}
                name="username"
                value={userName}
                className={"form-control"}
                label={"Login"}
                placeholder="User Name"
                require="true"
              />
            </div>
            <div className="form-group  form-group-default required ">
              <InputWithLabel
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                value={password}
                className={"form-control"}
                label={"Password"}
                placeholder="Credentials"
                require="true"
              />
            </div>

            <div className="row">
              <div className="col-md-6 no-padding sm-p-l-10">
                <div className="form-check">
                  <input type="checkbox" value="1" id="checkbox1" />
                  <label htmlFor="checkbox1">Remember me</label>
                </div>
              </div>
              <div className="col-md-6 d-flex align-items-center justify-content-end">
                <button
                  aria-label=""
                  className="btn btn-primary btn-lg m-t-10"
                  type="submit"
                >
                  Sign in
                </button>
              </div>
            </div>
            <div className="m-b-5 m-t-30">
              <a href="javascript:void(0);" className="normal">
                Lost your password?
              </a>
            </div>
            <div>
              <a href="javascript:void(0);" className="normal">
                Not a member yet? Signup now.
              </a>
            </div>
          </ValidatorForm>

          <div className="pull-bottom sm-pull-bottom">
            <div className="m-b-30 p-r-80 sm-m-t-20 sm-p-r-15 sm-p-b-20 clearfix">
              <div className="col-sm-9 no-padding m-t-10">
                <p className="small-text normal hint-text">
                  ©2019-2020 All Rights Reserved. Pages® is a registered
                  trademark of Revox Ltd.
                  <a href="javascript:void(0);">Cookie Policy</a>,{" "}
                  <a href="javascript:void(0);"> Privacy and Terms</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default content;

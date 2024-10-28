import PropTypes from "prop-types";
import React  from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import withRouter from "../Common/withRouter";

//i18n
import { withTranslation } from "react-i18next";
import SidebarContent from "./SidebarContent";

import logoSm from "../../assets/images/firs_logo.png";
import logoDark from "../../assets/images/firs_logo.png";
import logoLight from "../../assets/images/firs_logo.png";

const Sidebar = props => {


  function tToggle() {
    var body = document.body;
    var windowSize = document.documentElement.clientWidth;

    body.classList.toggle("vertical-collpsed");
    body.classList.toggle("sidebar-enable");

    if (windowSize > 991){
      (body.getAttribute('data-sidebar-size') === 'sm') ? body.setAttribute('data-sidebar-size', 'lg') : body.setAttribute('data-sidebar-size', 'sm');
    }
  }

  
  // useEffect(() => {
  //   // var verticalOverlay = document.getElementsByClassName("vertical-overlay");
  //   if (document.body.classList.contains("vertical-collpsed") && document.body.classList.contains("sidebar-enable")) {
  //     // verticalOverlay[0].addEventListener("click", function () {
  //       document.body.classList.remove("vertical-collpsed");
  //       document.body.classList.remove("sidebar-enable");

  //     };
  //   // }
  // });
  
  return (
    <React.Fragment>
      <div className="vertical-menu">
        <div className="navbar-brand-box">
          <Link to="/" className="logo logo-dark">
            <span className="logo-sm">
             <img src={logoSm} alt="" height="22" />
            </span>
            <span className="logo-lg">
             <img src={logoDark} alt="" height="35" />
            </span>
          </Link>

          <Link to="/" className="logo logo-light">
            <span className="logo-sm">
              <img src={logoSm} alt="" height="22" />
            </span>
            <span className="logo-lg">
              <img src={logoLight} alt="" height="35" />
            </span>
          </Link>
        </div>
        <button
          onClick={() => {
            tToggle();
          }}
          type="button" className="btn btn-sm px-3 font-size-16 header-item waves-effect vertical-menu-btn">
          <i className="fa fa-fw fa-bars"></i>
        </button>
        <div className="sidebar-menu-scroll">
          {props.type !== "condensed" ? <SidebarContent /> : <SidebarContent />}
        </div>
      </div>
      
    </React.Fragment>
  );
};

Sidebar.propTypes = {
  type: PropTypes.string,
};

const mapStatetoProps = state => {
  return {
    layout: state.Layout,
  };
};
export default connect(
  mapStatetoProps,
  {}
)(withRouter(withTranslation()(Sidebar)));
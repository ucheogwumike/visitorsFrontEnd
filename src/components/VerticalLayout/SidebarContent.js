import PropTypes from "prop-types";
import React, { useCallback, useEffect, useState } from "react";

// //Import Scrollbar
import SimpleBar from "simplebar-react";

// MetisMenu
import MetisMenu from "metismenujs";
import withRouter from "../Common/withRouter";
import { Link, useLocation } from "react-router-dom";

//i18n
import { withTranslation } from "react-i18next";

const SidebarContent = props => {

  const [check, setCheck] = useState(JSON.parse(localStorage.getItem("user")))

//  setCheck(JSON.parse(localStorage.getItem("user")));
  const [perm,setPerm] = useState(check.role.permissions)

  // const ref = useRef();
  const activateParentDropdown = useCallback((item) => {
    item.classList.add("active");
    const parent = item.parentElement;
    const parent2El = parent.childNodes[1];

    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show");
    }

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show"); // ul tag

        const parent3 = parent2.parentElement; // li tag

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement; // ul
          if (parent4) {
            parent4.classList.add("mm-show"); // ul
            const parent5 = parent4.parentElement;
            if (parent5) {
              parent5.classList.add("mm-show"); // li
              parent5.childNodes[0].classList.add("mm-active"); // a tag
            }
          }
        }
      }
      // scrollElement(item);
      return false;
    }
    // scrollElement(item);
    return false;
  }, []);

  const removeActivation = (items) => {
    for (var i = 0; i < items.length; ++i) {
      var item = items[i];
      const parent = items[i].parentElement;

      if (item && item.classList.contains("active")) {
        item.classList.remove("active");
      }
      if (parent) {
        const parent2El =
          parent.childNodes && parent.childNodes.lenght && parent.childNodes[1]
            ? parent.childNodes[1]
            : null;
        if (parent2El && parent2El.id !== "side-menu") {
          parent2El.classList.remove("mm-show");
        }

        parent.classList.remove("mm-active");
        const parent2 = parent.parentElement;

        if (parent2) {
          parent2.classList.remove("mm-show");

          const parent3 = parent2.parentElement;
          if (parent3) {
            parent3.classList.remove("mm-active"); // li
            parent3.childNodes[0].classList.remove("mm-active");

            const parent4 = parent3.parentElement; // ul
            if (parent4) {
              parent4.classList.remove("mm-show"); // ul
              const parent5 = parent4.parentElement;
              if (parent5) {
                parent5.classList.remove("mm-show"); // li
                parent5.childNodes[0].classList.remove("mm-active"); // a tag
              }
            }
          }
        }
      }
    }
  };

  const path = useLocation();
  const activeMenu = useCallback(() => {
    const pathName = path.pathname;
    let matchingMenuItem = null;
    const ul = document.getElementById("side-menu");
    const items = ul.getElementsByTagName("a");
    removeActivation(items);

    for (let i = 0; i < items.length; ++i) {
      if (pathName === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem);
    }
  }, [path.pathname, activateParentDropdown]);

  // useEffect(() => {
  //   ref.current.recalculate();
  // }, []);

  const [extract, setExtract] = useState([])
  
  
  useEffect(() => {
    new MetisMenu("#side-menu");
    setExtract(()=>{
      let answer = []
      for (const permission of perm) {
        answer.push(permission.name);
      }
      return answer
    })
  }, [check,perm]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    activeMenu();
  }, [activeMenu]);

  // function scrollElement(item) {
  //   if (item) {
  //     const currentPosition = item.offsetTop;
  //     if (currentPosition > window.innerHeight) {
  //       ref.current.getScrollElement().scrollTop = currentPosition - 300;
  //     }
  //   }
  // }
  return (
    <React.Fragment>
      <SimpleBar style={{ maxHeight: "100%" }}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">{props.t("Menu")} </li>
           
             <li>
             {extract.includes('dashboard') ? <> 
              <Link to="/dashboard" className="waves-effect">
                <i className="uil-home-alt"></i>
                
                <span>{props.t("Dashboard")}</span>
              </Link>
            </>:null} 
            </li>

            {/* <li className="menu-title">{props.t("Profile")}</li> */}

            <li>
              <Link to="/profile" className=" waves-effect">
              <i className="uil-user-circle"></i>
                <span>{props.t("Profile")}</span>
              </Link>
            </li>

            {/* <li> */}
            {/* {extract.includes('book-visits')  ? <>  */}
              {/* <Link to="/bookvisits" className="waves-effect"> */}
              {/* <i className="uil-book-alt"></i> */}
                {/* <span className="badge rounded-pill bg-warning float-end"> {props.t("New")} </span> */}
                {/* <span>{props.t("Book Visits")}</span> */}
              {/* </Link> */}
            {/* </>:null} */}
              
            {/* </li> */}

            <li>
              <Link to="/visits" className="waves-effect">
              <i className="uil-list-ul"></i>
                {/* <span className="badge rounded-pill bg-warning float-end"> {props.t("New")} </span> */}
                <span>{props.t("Visits")}</span>
              </Link>
            </li>  
          

            <li>
            {extract.includes('visitors') ? <> 
              <Link to="/visitors" className="waves-effect">
              <i className="uil-list-ul"></i>
                {/* <span className="badge rounded-pill bg-warning float-end"> {props.t("New")} </span> */}
                <span>{props.t("Visitors")}</span>
              </Link>
              </>:null} 
            </li>

            <li>
            {extract.includes('capture') ? <> 
              <Link to="/capture" className="waves-effect">
              <i className="uil-camera"></i>
                {/* <span className="badge rounded-pill bg-warning float-end"> {props.t("New")} </span> */}
                <span>{props.t("Capture")}</span>
              </Link>
              </>:null} 
            </li>

            <li>
            
            {extract.includes('settings') ? <> 
              <Link to="/settings" className="waves-effect">
              <i className="uil-cog"></i>
                {/* <span className="badge rounded-pill bg-warning float-end"> {props.t("New")} </span> */}
                <span>{props.t("Settings")}</span>
              </Link>
              </>:null} 
            </li>
            
          

            
          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  );
};

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
};

export default withRouter(withTranslation()(SidebarContent));
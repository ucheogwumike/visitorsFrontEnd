import React, { useEffect } from "react";
import { Container, Row, Col, Input, Button } from "reactstrap";

//Import Countdown
import Countdown from "react-countdown";

//Import Images
import logo from "../../assets/images/logo-dark.png";
import logolight from "../../assets/images/logo-light.png";
import commingsoon from "../../assets/images/coming-soon-img.png";
import { Link } from "react-router-dom";

const PagesComingsoon = () => {

  document.title=" Comingsoon | Minible - Responsive Bootstrap 5 Admin Dashboard"

  useEffect(() => {
    document.body.className = "authentication-bg";
    // remove classname when component will unmount
    return function cleanup() {
      document.body.className = "";
    };
  });

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return (<>
        <div className="coming-box">
          00 <span>Days</span>
        </div>{" "}
        <div className="coming-box">
          00 <span>Hours</span>
        </div>{" "}
        <div className="coming-box">
          00 <span>Minutes</span>
        </div>{" "}
        <div className="coming-box">
          00 <span>Seconds</span>
        </div>
      </>);
    } else {
      return (
        <>
          <div className="coming-box">
            {days} <span>Days</span>
          </div>{" "}
          <div className="coming-box">
            {hours} <span>Hours</span>
          </div>{" "}
          <div className="coming-box">
            {minutes} <span>Minutes</span>
          </div>{" "}
          <div className="coming-box">
            {seconds} <span>Seconds</span>
          </div>
        </>
      );
    }
  };

  return (
    <React.Fragment>
      <div className="my-5 pt-sm-5">
        <Container>
          <Row>
            <Col lg={12}>
              <div className="text-center">
                <Link to="/dashboard" className="d-block auth-logo">
                  <img src={logo} alt="" height="22" className="logo logo-dark" />
                  <img src={logolight} alt="" height="22" className="logo logo-light" />
                </Link>

                <Row className="justify-content-center mt-5">
                  <Col lg={4} sm={5}>
                    <div className="maintenance-img">
                      <img src={commingsoon} alt="" className="img-fluid mx-auto d-block" />
                    </div>
                  </Col>
                </Row>

                <h4 className="mt-5">Let&apos;s get started with Minible</h4>
                <p className="text-muted">It will be as simple as Occidental in fact it will be Occidental.</p>

                <Row className="justify-content-center mt-5">
                  <Col lg={10}>
                    <div className="counter-number">
                      <Countdown date="2024/12/31" renderer={renderer} />
                    </div>
                  </Col>
                </Row>

                <Row className="justify-content-center mt-5">
                  <Col lg={6}>
                    <div className="input-section pt-4">
                      <Row>
                        <div className="col">
                          <div className="position-relative">
                            <Input type="email" className="form-control" placeholder="Enter email address..." />
                          </div>
                        </div>
                        <div className="col-auto">
                          <Button type="submit" color="primary" className="w-md waves-effect waves-light">Subscribe</Button>
                        </div>
                      </Row>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default PagesComingsoon;

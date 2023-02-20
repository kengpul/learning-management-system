import { Container, Row, Col, Button } from "reactstrap";
import "./home.css";

export default function Home() {
  return (
    <>
      <section id="introduction" className="main-background">
        <Container>
          <Row className="d-flex align-items-center">
            <Col xl="4" className="text-center text-xl-start">
              <h2 className="fw-bold fs-1">
                E-Learning is A Better Way Of Learning
              </h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
                vitae quod, ipsum quos nihil modi possimus quis excepturi ad
                deserunt consequatur quae saepe nam ipsam facere! Ullam error
                consequatur sed?
              </p>
              <Button className="border me-3">Learn More</Button>
              <Button className="border">Courses</Button>
            </Col>
          </Row>
        </Container>
      </section>

      <footer className="text-white d-block d-sm-flex justify-content-around align-items-center py-3">
        <h6>Terms of Services</h6>
        <h6>Privacy Policy</h6>
        <h6>&copy;2023 ICCT Colleges</h6>
      </footer>
    </>
  );
}

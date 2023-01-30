import { Button, Card, CardBody, CardHeader, Col, Row } from "reactstrap";

import RichText from "../../components/Form/RichTextEditor/RichText";

import Avatar from "../../assets/default-avatar.png";

export const Create = () => {
  return (
    <Col className="create">
      <h1 className="">Create post</h1>
      <p className="text-muted border-bottom mb-3 pb-2">
        Choose group/class, type formatted texts or upload photos
      </p>
      <Row className="mx-lg-auto">
        <Col lg="7" className="position-relative mb-3">
          <RichText />
        </Col>
        <Col lg="5">
          <Card>
            <CardHeader
              tag="h5"
              className="d-flex justify-content-between text-white card-header"
            >
              Photos <span>1/5</span>
            </CardHeader>
            <CardBody>
              <Row className="m-auto">
                <Col xs="4" className="position-relative">
                  <i className="fa-solid fa-circle-xmark position-absolute end-0 top-0 me-2"></i>
                  <img src={Avatar} className="img-thumbnail mb-2" alt="" />
                </Col>
              </Row>
              <Button className="w-100 main-btn">Add Image 1/5</Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Col>
  );
};

import { Link } from "react-router-dom";
import { Card, CardBody, CardTitle } from "reactstrap";

export const ListCard = ({ title }) => {
  return (
    <Card className="mb-3 d-none d-lg-block">
      <CardBody>
        <CardTitle tag="h5">My {title}</CardTitle>
        <hr />
        <Card className="mb-2">
          <Link className="text-decoration-none">
            <CardBody className="border-start border-5">
              <CardTitle className="text-truncate m-0 text-black">
                {title === "Quizes"
                  ? "Quiz #1 - THS1 Thesis Writing"
                  : "THS1 - Thesis Writing 1"}
              </CardTitle>
            </CardBody>
          </Link>
        </Card>
      </CardBody>
    </Card>
  );
};

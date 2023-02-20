import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, CardText } from "reactstrap";

export default function ListCard({ title }) {
  return (
    <Card className="mb-3 d-none d-lg-block">
      <CardHeader
        style={{ backgroundColor: "var(--light-blue)" }}
        tag="h5"
        className="text-white"
      >
        My {title}
      </CardHeader>
      <CardBody>
        <Card className="mb-2">
          <Link className="text-decoration-none">
            <CardBody className="border-start border-5 p-1">
              <CardText className="text-truncate m-0 text-black">
                {title === "Quizes"
                  ? "Quiz #1 - THS1 Thesis Writing"
                  : "THS1 - Thesis Writing 1"}
              </CardText>
            </CardBody>
          </Link>
        </Card>
      </CardBody>
    </Card>
  );
}

import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, CardText } from "reactstrap";

export default function ListCard({ title, items }) {
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
        {!items && <p className="text-muted">No {title}</p>}
        {items &&
          items.map((item) => (
            <Card className="mb-2" key={item._id}>
              <Link to={`/room/${item._id}`} className="text-decoration-none">
                <CardBody className="border-start border-5 p-1">
                  <CardText className="text-truncate m-0 text-black">
                    {item.name}
                  </CardText>
                </CardBody>
              </Link>
            </Card>
          ))}
      </CardBody>
    </Card>
  );
}

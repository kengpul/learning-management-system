import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, CardText } from "reactstrap";

interface item {
  _id: string;
  name: string;
}

interface Props {
  title: string;
  items?: item[];
  link: string;
}

function ListCard({ title, items, link }: Props) {
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
          items.slice(0, 3).map((item) => (
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
        {items && items.length > 2 && <Link to={link}>See all</Link>}
      </CardBody>
    </Card>
  );
}

export default ListCard;

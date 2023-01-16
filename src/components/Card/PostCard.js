import { useState } from "react";
import { Link } from "react-router-dom";

import {
  Card,
  CardBody,
  CardText,
  CardTitle,
  CardSubtitle,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  Button,
} from "reactstrap";
import Avatar from "../../assets/default-avatar.png";

export const PostCard = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <Card className="mt-3">
      <CardBody>
        <CardTitle tag="h5" className="d-flex justify-content-between">
          <div>
            <img
              src={Avatar}
              className="rounded-circle me-2"
              alt=""
              width="40"
            />
            Jhon <span className="text-muted">Posted to</span>{" "}
            <span className="text-primary">THS1</span>
          </div>
          <Dropdown toggle={toggle} isOpen={dropdownOpen}>
            <DropdownToggle data-toggle="dropdown" tag="span">
              <Button color="transparent">
                <i className="fas fa-ellipsis-h" aria-hidden="true"></i>
              </Button>
            </DropdownToggle>
            <DropdownMenu>
              <Link to="" className="dropdown-item">
                Go to post
              </Link>
              <Link to="" className="dropdown-item">
                Edit
              </Link>
              <Link to="" className="dropdown-item">
                Delete
              </Link>
            </DropdownMenu>
          </Dropdown>
        </CardTitle>

        <CardSubtitle className="ms-md-5 text-muted">
          <h6>1 hour ago</h6>
        </CardSubtitle>

        <CardText className="mx-md-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
          asperiores quia molestias eligendi maxime magnam facilis facere. Fuga
          sed adipisci culpa vel, tempora porro autem dolores aliquid architecto
          voluptas sunt!
        </CardText>
      </CardBody>
    </Card>
  );
};

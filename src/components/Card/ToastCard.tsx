import React from "react";
import { Toast, ToastBody, Spinner } from "reactstrap";

interface Props {
  message: string;
  color: string;
  spinner?: boolean;
}

function ToastCard({ message, color, spinner }: Props) {
  return (
    <Toast
      className={`position-absolute top-25 start-50 translate-middle-x text-white bg-${color}`}
    >
      <ToastBody className="d-flex align-items-center justify-content-center fs-6">
        {spinner && <Spinner className="me-3" />}
        {message ? message : "Something went wrong"}
      </ToastBody>
    </Toast>
  );
}

export default ToastCard;

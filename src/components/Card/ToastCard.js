import { Toast, ToastBody, Spinner } from "reactstrap";

export default function ToastCard({ message, color, spinner }) {
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

import React from "react";
import { useFetch } from "../../hooks/useFetch";
import ToastCard from "../../components/Card/ToastCard";
import { Modal, ModalHeader, ModalBody, Input } from "reactstrap";

interface Props {
  pictureModal: boolean;
  togglePictureModal: () => void;
}

function UploadPicture({ pictureModal, togglePictureModal }: Props) {
  const { error } = useFetch();

  return (
    <Modal isOpen={pictureModal} toggle={togglePictureModal}>
      <ModalHeader toggle={togglePictureModal}>Upload picture</ModalHeader>
      {error && <ToastCard message={error} color="danger" />}
      <ModalBody className="text-center">
        <img
          className="rounded-circle img-thumbnail my-3"
          src="https://res.cloudinary.com/dsjrdrewd/image/upload/c_scale,w_150/v1676885960/learning-management-system/assets/default-avatar_hk6j0v.png"
          alt="profile"
        />
        <Input type="file" />
      </ModalBody>
    </Modal>
  );
}

export default UploadPicture;

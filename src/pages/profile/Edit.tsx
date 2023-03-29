import React from "react";
import { useFetch } from "../../hooks/useFetch";
import ToastCard from "../../components/Card/ToastCard";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Input,
  Label,
  ModalFooter,
  Button,
  Spinner,
} from "reactstrap";

interface Props {
  nameModal: boolean;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  fullname: string;
  setFullname: React.Dispatch<React.SetStateAction<string>>;
  toggleNameModal: () => void;
  handleUpdate: () => void;
}

function Edit({
  email,
  setEmail,
  fullname,
  setFullname,
  toggleNameModal,
  nameModal,
  handleUpdate,
}: Props) {
  const { error, isPending } = useFetch();

  const handleEdit = async () => handleUpdate();

  return (
    <Modal isOpen={nameModal} toggle={toggleNameModal}>
      <ModalHeader toggle={toggleNameModal}>Edit profile</ModalHeader>
      {error && <ToastCard message={error} color="danger" />}
      <ModalBody>
        <div className="form-floating mb-3">
          <Input
            type="text"
            defaultValue={fullname}
            id="fullname"
            onChange={(e) => setFullname(e.target.value)}
          />
          <Label for="fullname">fullname</Label>
        </div>

        <div className="form-floating">
          <Input
            type="email"
            defaultValue={email}
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Label for="email">Email</Label>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button disabled={isPending} className="main-btn" onClick={handleEdit}>
          {isPending ? <Spinner /> : "Update"}
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default Edit;

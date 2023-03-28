import React from "react";
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
import ToastCard from "../../components/Card/ToastCard";
import { useFetch } from "../../hooks/useFetch";

interface Props {
  nameModal: boolean;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  toggleNameModal: () => void;
  handleUpdate: () => void;
}

function Edit({
  email,
  setEmail,
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

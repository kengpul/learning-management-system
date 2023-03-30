import React, { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useParams } from "react-router-dom";
import User from "../../models/User";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Input,
  Button,
  Spinner,
} from "reactstrap";

interface Props {
  avatar: string;
  pictureModal: boolean;
  togglePictureModal: () => void;
  setProfile: React.Dispatch<React.SetStateAction<User | null>>;
}

function UploadPicture({
  avatar,
  pictureModal,
  togglePictureModal,
  setProfile,
}: Props) {
  const [image, setImage] = useState<any>(null);
  const [preview, setPreview] = useState<any>(null);
  const [isPending, setIsPending] = useState(false);
  const { user } = useAuthContext();
  const { get } = useFetch();
  const { id } = useParams();

  useEffect(() => {
    if (image) {
      const imageUrl = URL.createObjectURL(image);
      setPreview(imageUrl);
    }
  }, [image]);

  const handleAvatar = async () => {
    setIsPending(true);
    const formData = new FormData();
    if (image) formData.append("image", image);
    const response = await fetch(
      `${process.env.REACT_APP_API_URI}/connect/uploadImage`,
      {
        method: "POST",
        headers: { Authorization: `Bearers ${user?.token}` },
        body: formData,
      }
    );
    const file = await response.json();
    if (file.path) {
      togglePictureModal();
      const token: any = localStorage.getItem("user");
      const parse = JSON.parse(token);
      const newToken = {
        ...parse,
        avatar: file.path,
      };
      localStorage.setItem("user", JSON.stringify(newToken));
      const user = await get(`/connect/${id}`);
      if (!user.error) {
        setProfile(user);
      }
    }
    setIsPending(false);
  };

  return (
    <Modal isOpen={pictureModal} toggle={togglePictureModal}>
      <ModalHeader toggle={togglePictureModal}>Upload picture</ModalHeader>
      <ModalBody className="text-center">
        <img
          style={{ width: "200px", height: "170px" }}
          className="rounded-circle img-thumbnail mb-3"
          src={
            preview
              ? preview
              : avatar
              ? avatar
              : "https://res.cloudinary.com/dsjrdrewd/image/upload/c_scale,w_150/v1676885960/learning-management-system/assets/default-avatar_hk6j0v.png"
          }
          alt="profile"
        />
        <div className="d-flex gap-3">
          <Input type="file" onChange={(e) => setImage(e.target.files![0])} />
          <Button
            className="main-btn"
            disabled={isPending}
            onClick={handleAvatar}
          >
            {isPending ? <Spinner /> : "Save"}
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
}

export default UploadPicture;

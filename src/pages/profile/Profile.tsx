import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFetch } from "../../hooks/useFetch";
import { usePostsContext } from "../../hooks/usePostsContext";
import User from "../../models/User";
import { Request } from "../../models/Post";
import { Method } from "../../models/enums";
import Rooms from "./Rooms";
import Posts from "./Posts";
import Edit from "./Edit";
import UploadPicture from "./UploadPicture";
import {
  Card,
  CardBody,
  CardSubtitle,
  Col,
  Row,
  Button,
  ButtonGroup,
} from "reactstrap";

function Profile() {
  const [profile, setProfile] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [tab, setTab] = useState<"posts" | "rooms">("posts");
  const { posts, dispatch } = usePostsContext();
  const { id } = useParams();
  const { get, modify } = useFetch();
  const { user } = useAuthContext();
  const [nameModal, setNameModal] = useState(false);
  const [pictureModal, setPictureModal] = useState(false);
  const toggleNameModal = () => setNameModal(!nameModal);
  const togglePictureModal = () => setPictureModal(!pictureModal);

  useEffect(() => {
    const getUser = async () => {
      const user = await get(`/connect/${id}`);
      if (!user.error) {
        setProfile(user);
        setEmail(user.email);
      }
    };

    const getUserPosts = async () => {
      const posts = await get(`/connect/${id}/posts`);
      if (!posts.error) {
        dispatch!({ type: Request.GET_POSTS, payload: posts });
      }
    };

    if (user) {
      getUser();
      getUserPosts();
    }
  }, [user, dispatch, id]); // eslint-disable-line

  const handleUpdate = async () => {
    const user = await modify("/connect/update", Method.PUT, { email });
    if (user) {
      setProfile(user);
      toggleNameModal();
    }
  };

  return (
    <Col className="mt-3">
      <Row>
        <Col>
          <Card>
            <CardBody className="d-flex flex-column flex-md-row justify-content-center justify-content-md-between align-items-center px-md-5">
              {profile && (
                <>
                  <div className="d-flex flex-column flex-md-row align-items-center justify-content-center">
                    <img
                      style={{ width: "200px", height: "170px" }}
                      role="button"
                      className="rounded-circle img-thumbnail me-md-3"
                      src={
                        profile.avatar.path
                          ? profile.avatar.path
                          : "https://res.cloudinary.com/dsjrdrewd/image/upload/c_scale,w_150/v1676885960/learning-management-system/assets/default-avatar_hk6j0v.png"
                      }
                      alt="profile"
                      onClick={togglePictureModal}
                    />

                    <div className="text-center text-md-start">
                      <h1>
                        {profile.username}
                        <i
                          role="button"
                          className="fa-solid fa-pen-to-square fa-2xs ms-3"
                          onClick={toggleNameModal}
                        ></i>
                      </h1>
                      <CardSubtitle className="text-muted">
                        {profile.type}
                      </CardSubtitle>
                    </div>

                    <Edit
                      handleUpdate={handleUpdate}
                      email={email}
                      setEmail={setEmail}
                      nameModal={nameModal}
                      toggleNameModal={toggleNameModal}
                    />

                    <UploadPicture
                      setProfile={setProfile}
                      pictureModal={pictureModal}
                      togglePictureModal={togglePictureModal}
                    />
                  </div>
                  <div>
                    <Button
                      size="lg"
                      className="main-btn align-self-end mt-3 mt-md-0"
                    >
                      Message
                    </Button>
                  </div>
                </>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col className="text-center">
          <ButtonGroup>
            <Button active={tab === "posts"} onClick={() => setTab("posts")}>
              Posts
            </Button>
            <Button active={tab === "rooms"} onClick={() => setTab("rooms")}>
              Rooms
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
      <Row className="d-flex justify-content-center mb-5">
        {tab === "posts" && posts && <Posts posts={posts} />}
        {tab === "rooms" && profile?.rooms && <Rooms rooms={profile.rooms} />}
      </Row>
    </Col>
  );
}

export default Profile;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFetch } from "../../hooks/useFetch";
import { usePostsContext } from "../../hooks/usePostsContext";
import User from "../../models/User";
import { Request } from "../../models/Post";
import Rooms from "./Rooms";
import Posts from "./Posts";
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
  const [tab, setTab] = useState<"posts" | "rooms">("posts");
  const { posts, dispatch } = usePostsContext();
  const { id } = useParams();
  const { get } = useFetch();
  const { user } = useAuthContext();

  useEffect(() => {
    const getUser = async () => {
      const user = await get(`/connect/${id}`);
      if (!user.error) setProfile(user);
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
                      className="rounded-circle img-thumbnail me-md-3"
                      src="https://res.cloudinary.com/dsjrdrewd/image/upload/c_scale,w_150/v1676885960/learning-management-system/assets/default-avatar_hk6j0v.png"
                      alt=""
                    />
                    <div className="text-center text-md-start">
                      <h1>{profile.username}</h1>
                      <CardSubtitle className="text-muted">
                        {profile.type}
                      </CardSubtitle>
                    </div>
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

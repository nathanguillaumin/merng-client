import React, { useContext, useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Grid, Transition } from "semantic-ui-react";

import { AuthContext } from "../context/auth";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import { FETCH_POSTS_QUERY } from "../util/graphql";

function Home() {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  // eslint-disable-next-line no-unused-vars
  const [posts, setPosts] = useState({});

  useEffect(() => {
    data && setPosts(data.getPosts);
  }, [data]);

  if (loading) return <p>Loading...</p>;
  else
    return (
      <Grid columns={3}>
        <Grid.Row className="page-title">
          <h1>Recent Posts</h1>
        </Grid.Row>
        <Grid.Row>
          {user && (
            <Grid.Column>
              <PostForm setPosts={setPosts} />
            </Grid.Column>
          )}
          {loading ? (
            <h1>Loading posts...</h1>
          ) : (
            <Transition.Group>
              {data?.getPosts &&
                data?.getPosts?.map((post) => (
                  <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                    <PostCard post={post} setPosts={setPosts} />
                  </Grid.Column>
                ))}
            </Transition.Group>
          )}
        </Grid.Row>
      </Grid>
    );
}

export default Home;

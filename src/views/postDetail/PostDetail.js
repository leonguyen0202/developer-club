import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

// reactstrap components
import { Col } from "reactstrap";

import {
  getPostDetail,
  getMorePostsWithSameCategory,
} from "../../core/redux/actions/post.action.js";
import PostDetailContainer from "../../container/postDetail/PostDetailContainer.js";

const PostDetail = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  let { slug } = useParams();

  const fetchPost = (slug) => {
    if (isLoading) {
      props.getPostDetail(slug);

      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPost(slug);
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, slug]);

  return (
    <Col md="12">
      <PostDetailContainer data={props.postDetail} {...props} />
    </Col>
  );
};

const mapStateToProps = (state) => ({
  loading: state.ui.loading,
  postDetail: state.post.postDetail,
  morePostsWithSameCategory: state.post.morePostsWithSameCategory,
});

const mapDispatchToProps = {
  getPostDetail,
  getMorePostsWithSameCategory,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);

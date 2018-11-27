import { gql } from 'apollo-boost';

const createUser = gql`
  mutation($data: CreateUserInput!) {
    createUser(data: $data) {
      user {
        id
        name
        email
      }
      token
    }
  }
`;

const getUsers = gql`
  query {
    users {
      id
      name
      email
    }
  }
`;

const getPosts = gql`
  query {
    posts {
      id
      title
      body
      published
    }
  }
`;

const login = gql`
  mutation($data: LoginUserInput!) {
    login(data: $data) {
      user {
        id
        name
        email
      }
      token
    }
  }
`;

const getProfile = gql`
  query {
    me {
      id
      name
      email
    }
  }
`;

const getUserPosts = gql`
  query {
    myPosts {
      id
      title
      published
    }
  }
`;

const updatePost = gql`
  mutation($id: ID!, $data: UpdatePostInput!) {
    updatePost(id: $id, data: $data) {
      id
      title
      body
      published
    }
  }
`;

const createPost = gql`
  mutation($data: CreatePostInput!) {
    createPost(data: $data) {
      id
      title
      body
      published
    }
  }
`;

const deletePost = gql`
  mutation($id: ID!) {
    deletePost(id: $id) {
      id
      title
      body
      published
    }
  }
`;

const deleteComment = gql`
  mutation($id: ID!) {
    deleteComment(id: $id) {
      id
      text
    }
  }
`;

const subscribeToComments = gql`
  subscription($postId: ID!) {
    comment(postId: $postId) {
      mutation
      node {
        id
        text
      }
    }
  }
`;

const subscribeToPosts = gql`
  subscription {
    post {
      mutation
      node {
        id
        title
        body
      }
    }
  }
`;

const getComments = gql`
  query {
    comments {
      id
      text
    }
  }
`;

const createComment = gql`
  mutation($data: CreateCommentInput!) {
    createComment(data: $data) {
      id
      text
    }
  }
`;

export {
  createUser,
  login,
  getPosts,
  getProfile,
  getUsers,
  getUserPosts,
  updatePost,
  createPost,
  deletePost,
  deleteComment,
  subscribeToComments,
  subscribeToPosts,
  getComments,
  createComment
};

import 'cross-fetch/polyfill';

import seedDatabase, { userOne, postOne, postTwo } from './utils/seedDatabase';
import {
  getPosts,
  getUserPosts,
  updatePost,
  createPost,
  deletePost,
  subscribeToPosts
} from './utils/operations';
import getClient from './utils/getClient';
import prisma from '../src/prisma';

const client = getClient();

beforeEach(seedDatabase);

test('Should only return published posts', async () => {
  const response = await client.query({
    query: getPosts
  });

  expect(response.data.posts.length).toBe(1);
  expect(response.data.posts[0].published).toBe(true);
});

test('Should fetch all posts for a user', async () => {
  const client = getClient(userOne.jwt);

  const { data } = await client.query({
    query: getUserPosts
  });

  expect(data.myPosts.length).toBe(2);
});

test('should be able to update own post', async () => {
  const client = getClient(userOne.jwt);

  const variables = {
    id: postOne.post.id,
    data: {
      title: 'A new title',
      body: 'A new body'
    }
  };

  const { data } = await client.mutate({
    mutation: updatePost,
    variables
  });

  expect(data.updatePost.title).toBe('A new title');
});

test('Should be able to create a post', async () => {
  const client = getClient(userOne.jwt);

  const variables = {
    data: {
      title: 'Post 3 title',
      body: 'Post 3 body',
      published: true,
      commentsEnabled: true
    }
  };

  const { data } = await client.mutate({
    mutation: createPost,
    variables
  });

  expect(data.createPost.title).toBe('Post 3 title');
  expect(data.createPost.body).toBe('Post 3 body');
});

test('Should be able to delete my post', async () => {
  const client = getClient(userOne.jwt);

  const variables = {
    id: postTwo.post.id
  };

  await client.mutate({
    mutation: deletePost,
    variables
  });

  const postExists = await prisma.exists.Post({ id: postTwo.post.id });
  expect(postExists).toBe(false);
});

test('Should subscribe to published posts', async done => {
  client
    .subscribe({
      query: subscribeToPosts,
    })
    .subscribe({
      next({ data }) {
        expect(data.post.mutation).toBe('DELETED');
        done();
      }
    });

  await prisma.mutation.deletePost({
    where: {
      id: postOne.post.id
    }
  });
});

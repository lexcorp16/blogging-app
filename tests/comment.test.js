import 'cross-fetch/polyfill';

import getClient from './utils/getClient';
import seedDatabase, {
  userTwo,
  commentOne,
  commentTwo,
  postOne
} from './utils/seedDatabase';
import { deleteComment, subscribeToComments, getComments } from './utils/operations';
import prisma from '../src/prisma';

const client = getClient();

beforeEach(seedDatabase);

test('Should be able to delete own comment', async () => {
  const client = getClient(userTwo.jwt);
  const variables = {
    id: commentOne.comment.id
  };

  await client.mutate({
    mutation: deleteComment,
    variables
  });

  const commentExists = await prisma.exists.Comment({
    id: commentOne.comment.id
  });

  expect(commentExists).toBe(false);
});

test('Should not be able to delete other users comment', async () => {
  const client = getClient(userTwo.jwt);
  const variables = {
    id: commentTwo.comment.id
  };

  await expect(
    client.mutate({
      mutation: deleteComment,
      variables
    })
  ).rejects.toThrow();
});

test('should subscribe to comments for a post', async done => {
  const variables = {
    postId: postOne.post.id
  };

  client
    .subscribe({
      query: subscribeToComments,
      variables
    })
    .subscribe({
      next({ data }) {
        expect(data.comment.mutation).toBe('DELETED');
        done();
      }
    });

  await prisma.mutation.deleteComment({
    where: {
      id: commentOne.comment.id
    }
  });
});

test('Should fetch post comments', async () => {
  const { data } = await client.query({
    query: getComments
  });

  expect(data.comments.length).toBe(2);
});
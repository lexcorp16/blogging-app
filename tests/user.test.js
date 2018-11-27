import 'cross-fetch/polyfill';
import { gql } from 'apollo-boost';

import prisma from '../src/prisma';
import seedDatabase from './utils/seedDatabase';
import getClient from './utils/getClient';

const client = getClient();

beforeEach(seedDatabase);

test('Should create a new user', async () => {
  const createUser = gql`
    mutation {
      createUser(
        data: {
          name: "Fasoro Alexander"
          email: "meee@me.com"
          password: "mysecurepassword"
        }
      ) {
        user {
          id
          name
        }
        token
      }
    }
  `;

  const response = await client.mutate({
    mutation: createUser
  });

  const userexists = await prisma.exists.User({
    id: response.data.createUser.user.id
  });

  expect(userexists).toBe(true);
});

test('Should expose public author profiles', async () => {
  const getUsers = gql`
    query {
      users {
        id
        name
        email
      }
    }
  `;

  const response = await client.query({
    query: getUsers
  });

  expect(response.data.users.length).toBe(1);
  expect(response.data.users[0].email).toBe(null);
});

test('Should only return published posts', async () => {
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

  const response = await client.query({
    query: getPosts
  });

  expect(response.data.posts.length).toBe(1);
  expect(response.data.posts[0].published).toBe(true);
});

test('Should not login with bad credentials', async () => {
  const login = gql`
    mutation {
      login(data: { email: "non@existent.com", password: "badpassword" }) {
        user {
          id
          name
          email
        }
      }
    }
  `;

  await expect(
    client.mutate({
      mutation: login
    })
  ).rejects.toThrow();
});

test('Should not sign up with invalid password', async () => {
	const createUser = gql`
    mutation {
      createUser(
        data: {
          name: "Josh sanders"
          email: "josh@me.com"
          password: "short"
        }
      ) {
        user {
          id
          name
        }
        token
      }
    }
	`;
	
	await expect(
    client.mutate({
      mutation: createUser
    })
  ).rejects.toThrow();
});
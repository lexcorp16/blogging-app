import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../../src/prisma';

export const userOne = {
  input: {
    name: 'Jen',
    email: 'jen@example.com',
    password: bcrypt.hashSync('Red098!@#$')
  },
  user: undefined,
  jwt: undefined
};

export const userTwo = {
  input: {
    name: 'Bryan',
    email: 'bryan@example.com',
    password: bcrypt.hashSync('Blue098!@#$')
  },
  user: undefined,
  jwt: undefined
}

export const postOne = {
  input: {
    title: 'Post 1',
    body: 'Body for post 1',
    published: true,
    commentsEnabled: true
  },
  post: undefined
};

export const postTwo = {
  input: {
    title: 'Post 2',
    body: 'Body for post 2',
    published: false,
    commentsEnabled: true
  },
  post: undefined
};

export const commentOne = {
  input: {
    text: 'Text for comment one',
  },
  comment: undefined
}

export const commentTwo = {
  input: {
    text: 'Text for comment one'
  },
  comment: undefined
}


const seedDatabase = async () => {
  jest.setTimeout(30000);
  await prisma.mutation.deleteManyComments();
  await prisma.mutation.deleteManyPosts();
  await prisma.mutation.deleteManyUsers();

  userOne.user = await prisma.mutation.createUser({
    data: userOne.input
  });

  userTwo.user = await prisma.mutation.createUser({
    data: userTwo.input
  });

  userOne.jwt = jwt.sign({ userId: userOne.user.id }, process.env.JWT_SECRET);
  userTwo.jwt = jwt.sign({ userId: userTwo.user.id }, process.env.JWT_SECRET);


  postOne.post = await prisma.mutation.createPost({
    data: {
      ...postOne.input,
      author: {
        connect: {
          id: userOne.user.id
        }
      }
    }
  });

  postTwo.post = await prisma.mutation.createPost({
    data: {
      ...postTwo.input,
      author: {
        connect: {
          id: userOne.user.id
        }
      }
    }
  });

  commentOne.comment = await prisma.mutation.createComment({
    data: {
      ...commentOne.input,
      post: {
        connect: {
          id: postOne.post.id,
        }
      },
      author: {
        connect: {
          id: userTwo.user.id
        }
      }
    }
  });

  commentTwo.comment = await prisma.mutation.createComment({
    data: {
      ...commentTwo.input,
      post: {
        connect: {
          id: postOne.post.id,
        }
      },
      author: {
        connect: {
          id: userOne.user.id
        }
      }
    }
  });
};

export default seedDatabase;

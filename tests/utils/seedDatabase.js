import bcrypt from 'bcryptjs';
import prisma from '../../src/prisma';

const seedDatabase = async () => {
  jest.setTimeout(30000);
  await prisma.mutation.deleteManyPosts();
  await prisma.mutation.deleteManyUsers();

  const user = await prisma.mutation.createUser({
    data: {
      name: 'Jen',
      email: 'jen@example.com',
      password: bcrypt.hashSync('Red098!@#$')
    }
  });

  await Promise.all([
    prisma.mutation.createPost({
      data: {
        title: 'Post 1',
        body: 'Body for post 1',
        published: true,
        author: {
          connect: {
            id: user.id
          }
        }
      }
    }),
    prisma.mutation.createPost({
      data: {
        title: 'Post 2',
        body: 'Body for post 2',
        published: false,
        author: {
          connect: {
            id: user.id
          }
        }
      }
    })
  ]);
};

export default seedDatabase;

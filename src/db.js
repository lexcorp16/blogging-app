const users = [
  {
    id: 'she0pt0i',
    name: 'Joseph',
    email: 'Joseph@meme.com',
    age: 15
  },
  {
    id: 'ahe0po0i',
    name: 'Fasoro',
    email: 'alex@meme.com',
    age: 25
  }
];

const posts = [
  {
    id: 'ahedjo0i',
    title: 'Learning to Fly',
    body: 'Flying is possible...',
    published: false,
    author: 'she0pt0i'
  },
  {
    id: 'aheduo0i',
    title: 'Learning to Swim',
    body: 'Swimming is fun...',
    published: true,
    author: 'ahe0po0i'
  },
  {
    id: 'ahedet0i',
    title: 'Learning to Dance',
    body: 'Dancing is fun...',
    published: false,
    author: 'ahe0po0i'
  }
];

const comments = [
  {
    id: '1',
    text: 'Awesome sturvs',
    author: 'she0pt0i',
    post: 'aheduo0i'
  },
  {
    id: '2',
    text: 'Great post',
    author: 'ahe0po0i',
    post: 'aheduo0i'
  },
  {
    id: '3',
    text: 'Good job',
    author: 'she0pt0i',
    post: 'ahedjo0i'
  },
  {
    id: '4',
    text: 'Great stuff',
    author: 'ahe0po0i',
    post: 'ahedej0i'
  }
];

const db = {
  users,
  posts,
  comments
};

export default db;

import jwt from 'jsonwebtoken';

const generateToken = userId => {
  return jwt.sign({ userId }, 'mysuperstrongsecret', {
    expiresIn: '7days'
  });
};

export default generateToken;

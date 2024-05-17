import jwt from 'jsonwebtoken';

interface ITokenPayload {
  iat: number;
  exp: number;
  data: string;
}

const secret = process.env.JWT_SECRET || 'secret';

export default class Token {
  createToken = (id: string) => {
    const token = jwt.sign({ data: id }, secret, {
      expiresIn: '30d',
      algorithm: 'HS256',
    });
    return token;
  };

  validateToken = (token: string) => {
    try {
      const decoded = jwt.verify(token, secret);
      const { data } = decoded as ITokenPayload;
      return data;
    } catch (_err) {
      return undefined;
    }
  };
}

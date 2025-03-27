import jwt from 'jsonwebtoken';
import { NextFunction, Response, Request } from 'express';
import prisma from '../../prisma/db';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.path === '/api/login' || req.path === '/api/signup') {
      return next();
    }

    const token = req.headers.authorization?.split(' ')[1];

    if (!token) throw new Error();

    const payload: any = jwt.verify(token, process.env.JWT_SECRET!);

    const user = await prisma.user.findUnique({ where: { id: payload.id } });

    if (!user) throw new Error();

    req.userId = user.id;

    const updatedToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: '24h',
    });

    res.setHeader('Authorization', `Bearer ${updatedToken}`);

    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
};

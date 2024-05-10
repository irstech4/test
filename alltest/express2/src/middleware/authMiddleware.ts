import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import { UserPayload } from '../utils/authUtils';

interface AuthenticatedRequest extends Request {
  user?: UserPayload;
}

function authorize(...allowedRoles: string[]) {
  return async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) return res.sendStatus(401);

      const token = authHeader.split(' ')[1];
      if (!token) return res.sendStatus(401);

      const decoded = jwt.verify(token, config.jwtSecret!) as UserPayload;
      if (!decoded) return res.sendStatus(403);

      const { roles } = decoded;
      if (!allowedRoles.some(role => roles.includes(role))) {
        return res.sendStatus(403);
      }

      req.user = decoded;

      next();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
}

export default authorize;


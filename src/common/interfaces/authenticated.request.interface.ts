import type { Request } from 'express';
import { UserRole } from '../enum/user.enum.js';

export interface AuthenticatedRequest extends Request {
  user: {
    _id: string;
    fullName: string;
    userName: string;
    role: UserRole;
    studentCode?: string;
    classId?: string;
  };
}

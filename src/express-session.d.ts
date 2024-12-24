// src/express-session.d.ts or src/types/express-session.d.ts
import * as session from 'express-session';
import { Request } from 'express';

// Extend the Request interface to include session
declare module 'express' {
  interface Request {
    session: session.Session & Partial<session.SessionData>;
  }
}

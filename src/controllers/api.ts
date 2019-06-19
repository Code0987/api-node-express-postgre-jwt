import { Router, Request, Response } from 'express';
import { createToken, decodeToken, verifyToken } from './auth';
import * as db from '../utils/db';

export const apiRouter: Router = Router();

// GET /
apiRouter.get('/', async (req: Request, res: Response) => {
  res.status(200).json('hello');
});

// GET /token
apiRouter.get('/token', async (req: Request, res: Response) => {
  const token = await createToken();
  const decoded = await decodeToken(token);

  res.status(200).json({ token, decoded });
});

// POST /token
apiRouter.post('/token', async (req: Request, res: Response) => {
  // Get token data
  let token = (req.headers['authorization'] || '') as string;

  if (token && token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  const decoded = await decodeToken(token);

  res.status(200).json(decoded);
});

// GET /branch/:ifsc
apiRouter.get('/branch/:ifsc', verifyToken, async (req: Request, res: Response) => {
  try {
    if (!(req.params.ifsc)) {
      throw new Error('IFSC code is required.');
    }

    let ifsc = req.params.ifsc;

    let result = await db.query(
      'SELECT ifsc, branch, address, city, district, state ' +
      'FROM branches ' +
      'WHERE ifsc=$1;' +
      'LIMIT $2 OFFSET $3' +
      ';',
      [ifsc]
    );

    if (result && result.rows && result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      throw new Error('No record found.');
    }

  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// GET /branches/:name/:city/:limit?/:offset?
apiRouter.get('/branches/:name/:city/:limit?/:offset?', verifyToken, async (req: Request, res: Response) => {
  try {
    if (!(req.params.name)) {
      throw new Error('Bank name is required.');
    }
    if (!(req.params.city)) {
      throw new Error('Bank city is required.');
    }

    let name = req.params.name;
    let city = req.params.city;
    let limit = req.params.limit || 20; // items
    let offset = ((req.params.offset || 1) - 1) * limit; // (page - 1) * items

    let result = await db.query(
      'SELECT bank_name, ifsc, branch, address, city, district, state ' +
      'FROM bank_branches ' +
      'WHERE bank_name=$1 AND city=$2' +
      'LIMIT $3 OFFSET $4' +
      ';',
      [name, city, limit, offset]
    );

    if (result && result.rows && result.rows.length > 0) {
      res.status(200).json(result.rows);
    }
    else {
      throw new Error('No records found.');
    }

  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

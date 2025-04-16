// pages/api/products.js
import { NextApiRequest, NextApiResponse } from 'next';
import { promises as fs } from 'fs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const file = await fs.readFile(process.cwd() + '/app/products.json', 'utf8');
  const data = JSON.parse(file);
  res.status(200).json(data);
}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { IPerson } from '~/src/types/IPerson';

const handler = (req: NextApiRequest, res: NextApiResponse<IPerson>) => {
  res.status(200).json({ id: '1', age: 77, name: 'John Doe' });
};

export default handler;

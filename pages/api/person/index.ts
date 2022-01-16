// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { IResGetPerson } from '~/src/types/IGetPerson';

const handler = (req: NextApiRequest, res: NextApiResponse<IResGetPerson>) => {
  res.status(200).json({ id: '1', age: 77, name: 'John Doe' });
};

export default handler;

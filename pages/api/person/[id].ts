import { NextApiRequest, NextApiResponse } from 'next';
import { IResGetPerson } from '~/src/types/IGetPerson';

const handler = (
  req: NextApiRequest,
  res: NextApiResponse<IResGetPerson | Error>
): void => {
  const {
    query: { id }
  } = req;

  if (typeof id === 'string') {
    console.log(`getting person by id: ${id}`);
    res.status(200).json({ id, name: 'John Doe', age: 25 });
  } else {
    res.status(500).json(new Error('id is not of correct type'));
  }
};

export default handler;

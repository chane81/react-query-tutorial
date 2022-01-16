import { IResGetPerson } from '../types/IGetPerson';

export const fetchPersonDelay = async (): Promise<IResGetPerson> => {
  const res = await fetch(`http://localhost:3000/api/person`);

  await new Promise((r) => setTimeout(r, 3000));

  if (res.ok) {
    return res.json();
  }
  throw new Error('Network response not ok');
};

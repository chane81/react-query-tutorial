import { IResGetPerson } from '../types/IGetPerson';

export const fetchPerson = async (): Promise<IResGetPerson> => {
  const res = await fetch(`http://localhost:3000/api/person`);

  if (res.ok) {
    return res.json();
  }
  throw new Error('Network response not ok');
};

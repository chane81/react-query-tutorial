import { useQuery, UseQueryResult } from 'react-query';
import { IResGetPerson } from '~/src/types/IGetPerson';
import { fetchPerson } from '../api/getPerson';

const PersonInfo = () => {
  const { data }: UseQueryResult<IResGetPerson, Error> = useQuery<
    IResGetPerson,
    Error
  >('person', fetchPerson, {
    enabled: false
  });

  return (
    <>
      <p>{data?.id}</p>
      <p>{data?.name}</p>
      <p>{data?.age}</p>
    </>
  );
};

export default PersonInfo;

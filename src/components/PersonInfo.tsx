import { useQuery, UseQueryResult } from 'react-query';
import { fetchPerson } from '~/pages/person';
import { IPerson } from '~/types/IPerson';

const PersonInfo = () => {
  const { data }: UseQueryResult<IPerson, Error> = useQuery<IPerson, Error>(
    'person',
    fetchPerson,
    {
      enabled: false
    }
  );

  return (
    <>
      <p>{data?.id}</p>
      <p>{data?.name}</p>
      <p>{data?.age}</p>
    </>
  );
};

export default PersonInfo;

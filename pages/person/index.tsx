import { FC } from 'react';
import Link from 'next/link';
import { useQuery, UseQueryResult, useQueryClient } from 'react-query';
import PersonInfo from '~/components/PersonInfo';
import { IPerson } from '~/types/IPerson';

export const fetchPerson = async (): Promise<IPerson> => {
  const res = await fetch(`/api/person`);

  if (res.ok) {
    return res.json();
  }
  throw new Error('Network response not ok'); // need to throw because react-query functions need to have error thrown to know its in error state
};

const PersonPage: FC = () => {
  const queryClient = useQueryClient();
  const {
    isLoading,
    isError,
    error,
    data,
    refetch
  }: UseQueryResult<IPerson, Error> = useQuery<IPerson, Error>(
    'person',
    fetchPerson,
    {
      enabled: false
    }
    // {
    //   staleTime: 5 * 1000, // 5 seconds
    // }
  );

  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }
  if (isError) return <p>Boom boy: Error is -- {error?.message}</p>;

  const handleRefetch = () => {
    refetch();
  };

  const handleCacheUpdate = () => {
    queryClient.setQueryData<IPerson>('person', {
      age: 21,
      id: '2',
      name: '캐시 변경'
    });
  };

  return (
    <>
      <Link href='/'>
        <a>Home</a>
      </Link>
      <div>
        <button onClick={handleRefetch}>refetch</button>
      </div>
      <div>
        <button onClick={handleCacheUpdate}>cache update</button>
      </div>
      <p>{data?.id}</p>
      <p>{data?.name}</p>
      <p>{data?.age}</p>
      <br />
      <h1>Person Component</h1>
      <PersonInfo />
    </>
  );
};

export default PersonPage;

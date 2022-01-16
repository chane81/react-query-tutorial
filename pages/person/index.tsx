import { FC } from 'react';
import Link from 'next/link';
import { useQuery, UseQueryResult, useQueryClient } from 'react-query';
import PersonInfo from '~/components/PersonInfo';
import { IResGetPerson } from '~/src/types/IGetPerson';
import { fetchPerson } from '~/src/api/getPerson';

const PersonPage: FC = () => {
  const queryClient = useQueryClient();
  const {
    isLoading,
    isError,
    error,
    data,
    refetch,
    status,
    isFetching,
    isRefetching
  }: UseQueryResult<IResGetPerson, Error> = useQuery<IResGetPerson, Error>(
    'person',
    fetchPerson,
    {
      staleTime: 5000
    }
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
    //refetch();
    queryClient.fetchInfiniteQuery('person');
  };

  console.log('islo', isLoading, isFetching, isRefetching);

  const handleCacheUpdate = () => {
    queryClient.invalidateQueries('person');
    // queryClient.setQueryData<IResGetPerson>('person', {
    //   age: 21,
    //   id: '2',
    //   name: '캐시 변경'
    // });
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

import { FC, useState } from 'react';
import Link from 'next/link';
import { useQuery, UseQueryResult, useQueryClient } from 'react-query';
import PersonInfo from '~/components/PersonInfo';
import { IResGetPerson } from '~/src/types/IGetPerson';
//import { fetchPerson } from '~/src/api/getPerson';
import { fetchPosts } from '~/src/api/getPosts';
import { IResGetPosts } from '~/src/types/IGetPosts';
import { useRouter } from 'next/router';

const PersonPage: FC = () => {
  const [num, setNum] = useState<number>(1);
  const router = useRouter();
  const queryClient = useQueryClient();
  const queryKey = ['person', { id: num }];
  const {
    isLoading,
    isError,
    error,
    data,
    refetch,
    status,
    isFetching,
    isRefetching,
    isPreviousData
  }: UseQueryResult<IResGetPosts, Error> = useQuery<IResGetPosts, Error>(
    queryKey,
    async () => fetchPosts(num),
    {
      staleTime: 5000
    }
  );

  console.log('index page', isLoading, isFetching, isPreviousData);

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
    const cacheData = queryClient.getQueryData<IResGetPosts>(queryKey);

    console.log('cache data', cacheData);

    if (cacheData) {
      queryClient.setQueryData<IResGetPosts>(queryKey, {
        ...cacheData,
        title: '캐시변경'
      });
    }
  };

  const handleIncrease = () => {
    setNum((prev) => prev + 1);
  };

  const handleSameKeyCall = () => {
    queryClient.fetchInfiniteQuery(['person', { id: num }]);
  };

  const handleRoute = () => {
    router.push('/putData');
  };

  return (
    <>
      <Link href='/'>
        <a>Home</a>
      </Link>
      <div style={{ display: 'flex', gap: '0.5rem', padding: '1rem 0' }}>
        <div>
          <button onClick={handleSameKeyCall}>같은키에 대한 api 호출</button>
        </div>
        <div>
          <button onClick={handleRefetch}>리패치</button>
        </div>
        <div>
          <button onClick={handleCacheUpdate}>캐시 업데이트</button>
        </div>
        <div>
          <button onClick={handleIncrease}>increase({num})</button>
        </div>
        <div>
          <button onClick={handleRoute}>putData page로 라우트</button>
        </div>
      </div>

      <div>
        <h3>Title:</h3>
        {data?.title}
      </div>
      <div>
        <h3>Body:</h3> {data?.body}
      </div>
      <div>
        <h3>UserId:</h3> {data?.userId}
      </div>
      <br />
      <h1>Person Component</h1>
      <PersonInfo num={num} />
    </>
  );
};

export default PersonPage;

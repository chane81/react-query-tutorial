import { FC } from 'react';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { fetchPersonDelay } from '~/src/api/getPersonDelay';
import { IResGetPerson } from '~/src/types/IGetPerson';

const Delay: FC = () => {
  // This useQuery could just as well happen in some deeper child to
  // the "Posts"-page, data will be available immediately either way
  const { data, refetch, isLoading, isFetching } = useQuery<
    IResGetPerson,
    Error
  >('person', fetchPersonDelay);

  // console.log('data', isFetching);

  // This query was not prefetched on the server and will not start
  // fetching until on the client, both patterns are fine to mix
  // const { data: dataV2, isFetching: isFetchingV2 } = useQuery<
  //   IResGetPosts[],
  //   Error
  // >('posts-2', fetchPosts);

  const handleRefetch = async () => {
    refetch();
  };

  return (
    <div>
      <div>
        <button onClick={handleRefetch}>refetch</button>
      </div>
      <div>ssr</div>
      <div style={{ marginBottom: '1rem' }}>
        idFetching: {isFetching.toString()}
      </div>
      {JSON.stringify(data)}
    </div>
  );
};

export default Delay;

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery('person', fetchPersonDelay);

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  };
}

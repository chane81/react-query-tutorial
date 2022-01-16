import { FC } from 'react';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { fetchPosts } from '~/src/api/getPosts';
import { IResGetPosts } from '~/src/types/IGetPosts';

const Posts: FC = () => {
  // This useQuery could just as well happen in some deeper child to
  // the "Posts"-page, data will be available immediately either way
  const { data, refetch, isLoading, isFetching } = useQuery<
    IResGetPosts[],
    Error
  >('posts', fetchPosts);

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
      {data?.map((val) => (
        <div key={val.id}>
          <div>title: {val.title}</div>
          <div>body: {val.body}</div>
        </div>
      ))}
    </div>
  );
};

export default Posts;

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery('posts', fetchPosts);

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  };
}

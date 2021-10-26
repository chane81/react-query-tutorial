import { FC } from 'react';
import Link from 'next/link';
import {
  useQuery,
  QueryCache,
  UseQueryResult,
  useMutation,
  QueryClient
} from 'react-query';
import PersonInfo from '~/components/PersonInfo';
import { IReqPutPosts, IResPutPosts } from '~/types/IPutPosts';
import axios from 'axios';
import { IPerson } from '~/src/types/IPerson';

export const fetcher = async (params: IReqPutPosts): Promise<IResPutPosts> => {
  const { id, userId, title, body } = params;

  try {
    const res = await axios.put(
      `https://jsonplaceholder.typicode.com/posts/1`,
      {
        id,
        userId,
        title,
        body
      }
    );

    return res.data;
  } catch {
    throw new Error('Network response not ok'); // need to throw because react-query functions need to have error thrown to know its in error state
  }
};

const PutData: FC = () => {
  const { mutate, data, isLoading, isError, error } = useMutation<
    IResPutPosts,
    Error,
    IReqPutPosts
  >('putPosts', async (params) => fetcher(params));

  const queryCache = new QueryClient();

  const queryData = queryCache.getQueryData<IPerson>('person');

  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }
  if (isError) return <p>Boom boy: Error is -- {error?.message}</p>;

  const handleExec = () => {
    mutate({
      id: 1,
      body: '테스트',
      title: '111',
      userId: 22
    });

    const queryData = queryCache.getQueryData<IPerson>('person');
    console.log('qq', queryData);
  };

  return (
    <>
      <button onClick={handleExec}>put data</button>
      <p>{data?.id}</p>
      <p>{data?.userId}</p>
      <p>{data?.title}</p>
      <p>{data?.body}</p>
      <br />
      <h1>Person Component</h1>
      <div>{queryData?.name}</div>
    </>
  );
};

export default PutData;

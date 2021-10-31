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

const fetcher = async <Req, Res>(params: IMutateParams<Req>): Promise<Res> => {
  const { url, body } = params;

  try {
    const res = await axios.put(url, body);

    return res.data;
  } catch {
    throw new Error('Network response not ok');
  }
};

interface IMutateParams<T> {
  url: string;
  body: T;
}

const PUT_URL = (id: number) =>
  `https://jsonplaceholder.typicode.com/posts/${id}`;

const PutData: FC = () => {
  const { mutate, data, isLoading, isError, error } = useMutation<
    IResPutPosts,
    Error,
    IMutateParams<IReqPutPosts>
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
      url: PUT_URL(3),
      body: {
        id: 1,
        title: 'foo1',
        body: 'bar',
        userId: 1
      }
    });

    const queryData = queryCache.getQueryData<IPerson>('person');
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

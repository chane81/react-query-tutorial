import { FC } from 'react';
import { useQuery, UseQueryResult } from 'react-query';
import { IResGetPerson } from '~/src/types/IGetPerson';
import { fetchPerson } from '../api/getPerson';
import { fetchPosts } from '../api/getPosts';
import { IResGetPosts } from '../types/IGetPosts';

interface IProps {
  num: number;
}

const PersonInfo: FC<IProps> = ({ num }) => {
  const { data, isLoading, isFetching }: UseQueryResult<IResGetPosts, Error> =
    useQuery<IResGetPosts, Error>(
      ['person', { id: num }],
      () => fetchPosts(num),
      {
        enabled: false
      }
    );

  // console.log('personInfo component', isLoading, isFetching);

  return (
    <>
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
    </>
  );
};

export default PersonInfo;

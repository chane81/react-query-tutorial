import { IResGetPosts } from '../types/IGetPosts';

export const fetchPosts = async (id: number): Promise<IResGetPosts> => {
  console.log('fetchPost id', id);
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);

  if (res.ok) {
    return res.json();
  }
  throw new Error('Network response not ok');
};

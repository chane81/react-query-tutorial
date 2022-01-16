import { IResGetPosts } from '../types/IGetPosts';

export const fetchPosts = async (): Promise<IResGetPosts[]> => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);

  if (res.ok) {
    return res.json();
  }
  throw new Error('Network response not ok');
};

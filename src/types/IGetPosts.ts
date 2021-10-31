export interface IReqGetPosts {
  id: number;
  title: string;
}

export interface IResGetPosts {
  id: number;
  title: string;
  body: string;
  userId: number;
}

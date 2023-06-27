export interface AuthProps {
  email: string;
  password: string;
  username?: string;
}

export interface UserProps {
  email: string;
  password: string;
  username: string;
  bio: string;
  image: string;
}

export interface ProfileProps {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}

export interface ArticleProps {
  slug: string;
  title: string;
  description: string;
  tagsList: string[];
  createdAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: ProfileProps;
  body?: string;
}

export interface CommentProps {
  id: number;
  createdAt: string;
  body: string;
  author: ProfileProps;
}

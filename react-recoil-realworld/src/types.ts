export interface ArticleProps {
  slug: string;
  title: string;
  description: string;
  tagList: string[];
  createdAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: ProfileProps;
  body?: string;
}

export interface ProfileProps {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}

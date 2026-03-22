export type ProfileDB = {
  id: string;
  updated_at: string;
  username: string;
  avatar_url: string;
  birth_date: string;
  bio: string;
  website_url: string;
  social_links: {
    [key: string]: string;
  };
  is_author: boolean;
};

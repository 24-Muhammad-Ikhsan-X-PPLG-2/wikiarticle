export type SocialLink = {
  twitter?: string;
  github?: string;
  linkedin?: string;
  facebook?: string;
  instagram?: string;
};

export type ProfileDataType = {
  username?: string;
  bio?: string;
  website_url?: string;
  social_links?: SocialLink;
  is_author: boolean;
  avatar_url: string | null;
};

export type ProfilePasswordType = {
  currentPassword?: string;
  newPassword?: string;
  confirmNewPassword?: string;
};

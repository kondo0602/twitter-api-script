import { UserDTO } from "./get-users-by-word-in-tweet";

export type ITwitterApi = {
  getUserIdsByWordInTweet: (word: string) => Promise<string[]>;
  getUsersByUserIds: (userIds: string[]) => Promise<UserDTO[]>;
  // getUsersFollowingUser: (followedUserId: string) => Promise<User[] | null>;
};

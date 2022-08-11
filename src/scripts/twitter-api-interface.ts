import { UserDTO } from "../domain/user-dto";

export type ITwitterApi = {
  getUserIdsByWordInTweet: (
    word: string,
    maxResults: number
  ) => Promise<string[]>;
  getUsersByUserIds: (userIds: string[]) => Promise<UserDTO[]>;
  getUsersFollowingUser: (
    userId: string,
    maxResults: number
  ) => Promise<UserDTO[]>;
};

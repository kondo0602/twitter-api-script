import { Client } from "twitter-api-sdk";
import { ITwitterApi } from "../scripts/twitter-api-interface";
import { UserDTO } from "../scripts/get-users-by-word-in-tweet";

export class TwitterApi implements ITwitterApi {
  constructor(private readonly client: Client) {}

  /**
   * 指定された単語を含むツイートを行なったユーザのIDを返す.
   *
   * @param {string} word ツイートに含まれる単語
   * @param {number} maxResults ユーザ数
   */
  public getUserIdsByWordInTweet = async (
    word: string,
    maxResults: number
  ): Promise<string[]> => {
    const response = await this.client.tweets.tweetsRecentSearch({
      query: word,
      max_results: maxResults,
      expansions: ["author_id"],
    });

    const userIds: string[] = [];

    if (response.data) {
      response.data.map((data) => {
        if (!data.author_id) return;

        userIds.push(data.author_id);
      });
    }

    console.log(userIds);

    return userIds;
  };

  /**
   * 指定されたユーザIDのユーザを返す.
   *
   * @param {string[]} userIds
   */
  public getUsersByUserIds = async (userIds: string[]): Promise<UserDTO[]> => {
    const response = await this.client.users.findUsersById({
      ids: userIds,
    });

    const users: UserDTO[] = [];

    response.data?.map((user) => {
      return users.push(new UserDTO(user.id, user.name, user.username));
    });

    console.log(users);

    return users;
  };
}

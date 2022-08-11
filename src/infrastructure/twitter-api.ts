import { Client } from "twitter-api-sdk";
import { ITwitterApi } from "../scripts/twitter-api-interface";
import { UserDTO } from "../scripts/get-users-by-word-in-tweet";

export class TwitterApi implements ITwitterApi {
  constructor(private readonly client: Client) {}

  public getUserIdsByWordInTweet = async (word: string): Promise<string[]> => {
    const response = await this.client.tweets.tweetsRecentSearch({
      query: word,
      // max_results: MAX_RESULTS
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

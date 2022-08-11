import "dotenv/config";

import { Client } from "twitter-api-sdk";
import { ITwitterApi } from "./twitter-api-interface";
import { TwitterApi } from "../infrastructure/twitter-api";
import { UserDTO } from "../domain/user-dto";

class GetUsersByWordInTweet {
  constructor(private twitterApi: ITwitterApi) {}

  public execute = async (
    word: string,
    maxResults: number
  ): Promise<UserDTO[]> => {
    const userIds = await this.twitterApi.getUserIdsByWordInTweet(
      word,
      maxResults
    );
    const users = await this.twitterApi.getUsersByUserIds(userIds);

    return users;
  };
}

const client = new Client(process.env.BEARER_TOKEN as string);
const twitterApi = new TwitterApi(client);
const script = new GetUsersByWordInTweet(twitterApi);

script.execute("sample word", 100);

import "dotenv/config";

import { Client } from "twitter-api-sdk";
import { ITwitterApi } from "./twitter-api-interface";
import { TwitterApi } from "../infrastructure/twitter-api";
import { UserDTO } from "../domain/user-dto";

export class GetUsersByWordInTweet {
  constructor(private twitterApi: ITwitterApi) {}

  public execute = async (
    word: string,
    maxResults: number = 100
  ): Promise<UserDTO[]> => {
    if (word.length > 512) {
      throw new Error("検索する単語は512文字以内で指定してください.");
    }

    if (maxResults < 10 || 100 < maxResults) {
      throw new Error("表示するユーザ数は10〜100の範囲で指定してください.");
    }

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

script.execute(process.argv[2], Number(process.argv[3]));

import "dotenv/config";

import { Client } from "twitter-api-sdk";
import { ITwitterApi } from "./twitter-api-interface";
import { TwitterApi } from "../infrastructure/twitter-api";
import { UserDTO } from "../domain/user-dto";

class GetUsersFollowingUser {
  constructor(private twitterApi: ITwitterApi) {}

  public async do(
    userId: string,
    maxResults: number = 100
  ): Promise<UserDTO[]> {
    if (maxResults < 10 || 100 < maxResults) {
      throw new Error("表示するユーザ数は10〜100の範囲で指定してください.");
    }

    return await this.twitterApi.getUsersFollowingUser(userId, maxResults);
  }
}

const client = new Client(process.env.BEARER_TOKEN as string);
const twitterApi = new TwitterApi(client);
const script = new GetUsersFollowingUser(twitterApi);

script.do(process.argv[2], Number(process.argv[3]));

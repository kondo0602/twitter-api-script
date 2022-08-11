import "dotenv/config";

import { Client } from "twitter-api-sdk";
import { ITwitterApi } from "./twitter-api-interface";
import { TwitterApi } from "../infrastructure/twitter-api";
import { UserDTO } from "../domain/user-dto";

class GetUsersFollowingUser {
  constructor(private twitterApi: ITwitterApi) {}

  public do = async (username: string): Promise<UserDTO[]> => {
    return await this.twitterApi.getUsersFollowingUser(username);
  };
}

const client = new Client(process.env.BEARER_TOKEN as string);
const twitterApi = new TwitterApi(client);
const script = new GetUsersFollowingUser(twitterApi);

script.do(process.argv[2]);

export default interface IAccount {
  username: string;
  email: string;
  password: string;
  passwordSalt: string;
  twitchBotSettings: object;
  discordBotSettings: object;
  viewers: any[];
  viewerRanks: any[];
}

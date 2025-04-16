// src/types/account.ts
export interface Account {
  id: number;
  account: string;
  userGroup: string; // Allow any string for userGroup
  ctime: string;
  imgUrl: string;
}

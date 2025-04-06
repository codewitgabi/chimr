/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */

import { Document } from "mongoose";
import { DefaultEventsMap, Socket } from "socket.io";
import { IUserSchema } from "../models/user.model";

export type TExtendedSocket = {
  user?: IUser;
} & Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;

export type IUser = Document<unknown, {}, IUserSchema> &
  IUserSchema &
  Required<{
    _id: unknown;
  }>;

export interface IActiveUser {
  id: string;
  user: IUser;
  socketId: string;
}

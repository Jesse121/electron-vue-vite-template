import { app } from "electron";
import path from "path";

export const getUserDataPath = () => app.getPath("userData");

export const pathJoin = (...p: string[]): string => path.join(...p);

import { Request, Response } from "express";
import path from "path";

export const signup = async (_req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../index.html"));
}
import { Request, Response, NextFunction } from "express";

export default async function cacheControl(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  response.set("Cache-Control", "public, max-age=120");
  return next();
}

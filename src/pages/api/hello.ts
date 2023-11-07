import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
type ResponseData = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });
  console.log("====================================");
  console.log(req.headers.cookie);
  console.log("====================================");
  res.status(200).json({ message: "hello world" });
}

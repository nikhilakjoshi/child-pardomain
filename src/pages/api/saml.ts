import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
type ResponseData = {
  samlToken?: string;
  message?: string;
};

const rand = function () {
  return Math.random().toString(36).substr(2); // remove `0.`
};

const token = function () {
  return rand() + rand(); // to make it longer
};

const cors = Cors({
  methods: ["POST"],
  origin: ["https://parent-pardomain.vercel.app"],
  credentials: true,
});

function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: typeof cors,
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });
  runMiddleware(req, res, cors);
  res.setHeader(
    "Set-Cookie",
    `token=${new Date()
      .getTime()
      .toString(
        36,
      )};domain=.vercel.app;Secure;Expires=Sat, 01 Dec 2023 00:00:00 GMT;HttpOnly;SameSite=None;`,
  );
  res.status(200).json({ samlToken: token() });
}

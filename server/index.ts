// import app from "./server";
// import { createServer } from "http";

// const server = createServer(app);

// export default server;

import { VercelRequest, VercelResponse } from "@vercel/node";
import app from "./server";

export default function handler(req: VercelRequest, res: VercelResponse) {
  return app(req, res);
}

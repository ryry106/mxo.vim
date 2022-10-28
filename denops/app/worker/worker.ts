// deno-lint-ignore-file

import { http } from "../deps.ts";
import { NewRouter } from "./router.ts";
import { NewEditFileApi } from "../api/edit_file.ts";
import { NewPreviewApi } from "../api/preview.ts";
import { NewLogger } from "../log/log.ts";

const port = 8080;
let router = NewRouter({});
const handler = (req: Request): Response => {
  return router.request(new URL(req.url).pathname);
};
const server = new http.Server({ port, handler });

self.onmessage = async (e) => {
  const { status, filePath, isDebug } = e.data;
  if (status === "on") {
    const logger = NewLogger(isDebug);
    router = NewRouter(
      {
        "/mermaid": NewEditFileApi(filePath, logger),
        "/preview": NewPreviewApi(logger),
      },
    );

    server.listenAndServe();
  } else if (status == "off") {
    server.close();
    self.close();
  }
};

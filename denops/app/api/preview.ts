import { Api } from "./api.ts";
import { Logger } from "../log/log.ts";

type PreviewApi = Api & { logger: Logger };

export const NewPreviewApi = (logger: Logger): PreviewApi => {
  return {
    logger: logger,
    api: function (): Response {
      this.logger.log("/preview called");
      const response = (new TextDecoder("utf-8")).decode(
        Deno.readFileSync("public/template.html"),
      );
      return new Response(
        response,
        {
          status: 200,
          headers: { "Content-Type": "text/html; charset=UTF-8" },
        },
      );
    },
  };
};

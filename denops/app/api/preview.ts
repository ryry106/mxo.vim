import { Api } from "./api.ts";
import { Logger } from "../log/log.ts";

type PreviewApi = Api & { logger: Logger };

export const NewPreviewApi = (logger: Logger): PreviewApi => {
  return {
    logger: logger,
    api: function (): Response {
      this.logger.log("/preview called");
      const templatePath = new URL(import.meta.resolve("./template.html")).pathname
      const response = (new TextDecoder("utf-8")).decode(
        Deno.readFileSync(templatePath),
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

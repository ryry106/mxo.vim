import { Api } from "./api.ts";
import { Logger } from "../log/log.ts";

type EditFileApi = Api & { filePath: string; logger: Logger };

export const NewEditFileApi = (
  filePath: string,
  logger: Logger,
): EditFileApi => {
  return {
    filePath: filePath,
    logger: logger,
    api: function (): Response {
      this.logger.log("/edit_file called");
      return new Response(_internals.w_readTextFileSync(filePath), {
        status: 200,
      });
    },
  };
};

const w_readTextFileSync = (filePath: string): string => {
  return Deno.readTextFileSync(filePath);
};

export const _internals = { w_readTextFileSync };

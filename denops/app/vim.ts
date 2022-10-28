import { Denops } from "https://deno.land/x/denops_std@v3.8.2/mod.ts";
import { globals } from "https://deno.land/x/denops_std@v3.8.2/variable/mod.ts";
export type Vim = {
  denops: Denops | null;
  getBufferText: () => Promise<string[]>;
  getFilePath: () => Promise<string>;
  isDebug: () => Promise<boolean>;
};

export const NewVim = (denops: Denops): Vim => {
  return {
    denops: denops,
    getBufferText: async (): Promise<string[]> => {
      const lastline = await denops.call("line", "$");
      const res = await denops.call("getline", 0, lastline);
      if (Array.isArray(res)) {
        return Promise.resolve(res);
      }
      return Promise.resolve([]);
    },
    getFilePath: async (): Promise<string> => {
      const res = await denops.call("expand", "%:p");
      if (typeof res == "string") {
        return Promise.resolve(res);
      }
      return Promise.resolve("");
    },
    isDebug: async (): Promise<boolean> => {
      try {
        const res = await globals.get(denops, "prevmermaid#debug");
        if (typeof res == "number" && res === 1) {
          return Promise.resolve(true);
        }
      } catch (e) {
        // g:prevmermaid#debug is not defined
      }
      return Promise.resolve(false);
    },
  };
};

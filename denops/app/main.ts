// deno-lint-ignore-file

import { Denops } from "https://deno.land/x/denops_std@v3.8.2/mod.ts";
import { execute } from "https://deno.land/x/denops_std@v3.8.2/helper/mod.ts";
import { NewVim } from "./vim.ts";
import { NewPreviewServer, PreviewServer } from "./preview_server.ts";

export async function main(denops: Denops): Promise<void> {
  const previewServer: PreviewServer = NewPreviewServer();
  const vim = NewVim(denops);

  denops.dispatcher = {
    async on(): Promise<void> {
      previewServer.on({
        filePath: await vim.getFilePath(),
        isDebug: await vim.isDebug(),
      });
    },
    async off(): Promise<void> {
      previewServer.off();
    },
  };

  // localhost:8080/preview でプレビューページを表示
  // 今開いているファイルをlocalhost:8080/mermaidで返すようにしているので、それをポーリングしている
  await execute(
    denops,
    `command! MermaidPreviewOn call denops#request('${denops.name}', 'on', [])`,
  );
  // サーバストップ
  await execute(
    denops,
    `command! MermaidPreviewOff call denops#request('${denops.name}', 'off', [])`,
  );
}

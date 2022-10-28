import { assert } from "./deps.ts";
import { NewPreviewServer, PreviewServer } from "./preview_server.ts";

Deno.test("PreviewServer. on > off > on > off", async () => {
  const testHelper = new PreviewServerTestHelper();

  await testHelper.serverOn("dummy_first");
  await checkServerOnHelper();

  await testHelper.serverOff();
  await checkServerOffHelper();

  await testHelper.serverOn("fummy_second");
  await checkServerOnHelper();

  await testHelper.serverOff();
  await checkServerOffHelper();
});

const requestUrl = "http://localhost:8080/health";
const checkServerOnHelper = async () => {
  const response = await fetch(requestUrl);
  assert.assertEquals(200, response.status);
  if (response.body != null) {
    response.body.cancel();
  }
};

const checkServerOffHelper = async () => {
  try {
    await fetch(requestUrl);
    throw new Error("fail");
  } catch (e) {
    assert.assertMatch(e.message, new RegExp(".*Connection refused.*"));
  }
};

class PreviewServerTestHelper {
  private previewServer: PreviewServer;
  constructor() {
    this.previewServer = NewPreviewServer();
  }

  public async serverOn(filePath: string) {
    this.previewServer.on({ filePath: filePath, isDebug: true });
    await this.wait();
  }

  public async serverOff() {
    this.previewServer.off();
    await this.wait();
  }

  private async wait() {
    await new Promise((r) => setTimeout(r, 800));
  }
}

import { assert, mock } from "../deps.ts";
import { _internals, NewEditFileApi } from "./edit_file.ts";

const mockLogger = {
  isDebug: true,
  log: function (_: string) {},
  _fmt: function (_: string) {
    return "";
  },
};

Deno.test("api returns filePath contents text", async () => {
  const stubRead = mock.stub(
    _internals,
    "w_readTextFileSync",
    mock.returnsNext([
      "dummy file contents",
    ]),
  );
  try {
    const newEditFileApi = NewEditFileApi("dummy", mockLogger);
    const res = newEditFileApi.api();
    assert.assertEquals("dummy file contents", await res.text());
    assert.assertEquals(200, res.status);
  } finally {
    stubRead.restore();
  }
});

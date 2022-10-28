import { assert, mock } from "../deps.ts";
import { _internals, NewLogger } from "./log.ts";

Deno.test("Logger.isDebug setting", () => {
  assert.assertEquals(true, NewLogger(true).isDebug);
  assert.assertEquals(false, NewLogger(false).isDebug);
});

Deno.test("Logger log isDebug=true output on ", () => {
  const spy = mock.spy(_internals, "wrap_stdout");
  try {
    NewLogger(true).log("this is out putmessage");
    mock.assertSpyCall(spy, 0, { args: ["[prev-vim]this is out putmessage"] });
  } finally {
    spy.restore();
  }
});

Deno.test("Logger log isDebug=false output off", () => {
  const spy = mock.spy(_internals, "wrap_stdout");
  try {
    NewLogger(false).log("dummy");
    mock.assertSpyCalls(spy, 0);
  } finally {
    spy.restore();
  }
});

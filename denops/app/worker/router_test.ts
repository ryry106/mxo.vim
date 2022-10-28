import { assert } from "../deps.ts";
import { NewRouter } from "./router.ts";

Deno.test("Router.", async () => {
  const dummyRule = {
    "dummy1": {
      config: {},
      api: () => {
        return new Response("dummy1 contents", { status: 200 });
      },
      "dummy2": {
        config: {},
        api: () => {
          return new Response("dummy2 contents", { status: 200 });
        },
      },
    },
  };
  const router = NewRouter(dummyRule);

  let res = router.request("dummy1");

  assert.assertEquals("dummy1 contents", await res.text());
  assert.assertEquals(200, res.status);

  res = router.request("dummy1");

  assert.assertEquals("dummy1 contents", await res.text());
  assert.assertEquals(200, res.status);
});

Deno.test("router endpoint health", async () => {
  const res = NewRouter({}).request("/health");
  assert.assertEquals("ok", await res.text());
  assert.assertEquals(200, res.status);
});

Deno.test("router endpoint notfound", async () => {
  const res = NewRouter({}).request("/notfound");
  assert.assertEquals("", await res.text());
  assert.assertEquals(404, res.status);
});

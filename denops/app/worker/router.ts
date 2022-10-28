import { Api } from "../api/api.ts";

type Rules = {
  [kye: string]: Api;
};

export const NewRouter = (rules: Rules) => {
  rules["/health"] = healthApi();
  return {
    rules: rules,
    // array?.[key] ?? defaultvalue
    request: function (path: string): Response {
      return (this.rules?.[path] ?? notfoundApi()).api();
    },
  };
};

const healthApi = (): Api => {
  return {
    api: function (): Response {
      return new Response("ok", { status: 200 });
    },
  };
};

const notfoundApi = (): Api => {
  return {
    api: function (): Response {
      return new Response("", { status: 404 });
    },
  };
};

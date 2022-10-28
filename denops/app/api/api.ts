export type Api = {
  api: () => Response;
  [prop: string]: unknown;
};

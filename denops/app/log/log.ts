import { printf } from "../deps.ts";

export type Logger = {
  isDebug: boolean;
  log: (msg: string) => void;
  _fmt: (msg: string) => string;
};
export const NewLogger = (isDebug: boolean): Logger => {
  return {
    isDebug: isDebug,
    log: function (msg: string): void {
      if (this.isDebug) {
        _internals.wrap_stdout(this._fmt(msg));
      }
    },
    _fmt: function (msg: string): string {
      return printf.sprintf("[prev-vim]%s", msg);
    },
  };
};

const wrap_stdout = (text: string) => {
  console.log(text);
};

export const _internals = { wrap_stdout };

export type Config = {
  filePath: string;
  isDebug: boolean;
};

export type PreviewServer = {
  worker: ServWorker;
  on(config: Config): void;
  off(): void;
};

export const NewPreviewServer = (): PreviewServer => {
  return {
    worker: NewServWorker(),
    on: function (config: Config) {
      console.log("http://localhost:8080/preview")
      this.worker.workerActive(config.filePath, config.isDebug);
    },
    off: function () {
      this.worker.workerDeactive();
    },
  };
};

type ServWorker = {
  worker: Worker | null;
  workerActive(filePath: string, isDebug: boolean): void;
  workerDeactive(): void;
  createWorker(): void;
  _servOn(filePath: string, isDebug: boolean): void;
  _servOff(): void;
};

const NewServWorker = (): ServWorker => {
  return {
    worker: null,
    workerActive: function (filePath: string, isDebug: boolean) {
      this.createWorker();
      this._servOn(filePath, isDebug);
    },
    workerDeactive: function () {
      this._servOff();
    },
    createWorker: function () {
      this.worker = new Worker(
        new URL("./worker/worker.ts", import.meta.url).href,
        {
          type: "module",
        },
      );
    },
    _servOn: function (filePath: string, isDebug: boolean) {
      if (this.worker == null) {
        return;
      }
      this.worker.postMessage({
        status: "on",
        filePath: filePath,
        isDebug: isDebug,
      });
    },
    _servOff: function () {
      if (this.worker == null) {
        return;
      }
      this.worker.postMessage({ status: "off" });
    },
  };
};

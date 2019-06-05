export default class Signal<T = void> {
  private finished: boolean;
  private error?: Error;
  private result?: T;
  private promise: Promise<T>;
  private resolve?: (v?: T) => void;
  private reject?: (e: Error) => void;

  constructor() {
    this.finished = false;

    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }

  public wait = (): Promise<T> => {
    if (!this.finished) {
      return this.promise;
    }

    if (this.error) {
      return Promise.reject(this.error);
    }

    return Promise.resolve(this.result!);
  }

  public emit = (v?: T) => {
    if (!this.finished) {
      this.finished = true;
      this.result = v;
      this.resolve!(v);
    }
  };

  public cancel = (e: Error) => {
    if (!this.finished) {
      this.finished = true;
      this.error = e;
      this.reject!(e);
    }
  };
}

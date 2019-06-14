export default class Signal<T = void> {
    private finished;
    private error?;
    private result?;
    private promise;
    private resolve?;
    private reject?;
    constructor();
    wait: () => Promise<T>;
    emit: (v?: T | undefined) => void;
    cancel: (e: Error) => void;
}

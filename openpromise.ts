export function getOpenPromise () {
    const wrapper = {
        isResolved: false,
        isPending: true,
        isRejected: false,
        resolve: {} as (value: any) => void,
        reject: {} as (reason?: any) => void
    };
    const promise: Promise<any> & {
        isResolved?: boolean,
        isPending?: boolean,
        isRejected?: boolean,
    } = new Promise((resolve, reject) => {
        wrapper.resolve = resolve;
        wrapper.reject = reject;
    })
    Object.assign(promise, wrapper);
    promise.then(
        function (v) {
            promise.isResolved = true;
            promise.isPending = false;
            promise.isRejected = false;
            return v;
        },
        function (e) {
            promise.isResolved = false;
            promise.isPending = false;
            promise.isRejected = true;
            throw (e);
        }
    );
    return promise as Promise<any> & typeof wrapper;
}

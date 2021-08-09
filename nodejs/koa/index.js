function compose(middleware) {
    return function (context, next) {
        function dispatch(i) {
            index = i;
            let fn = middleware[i];
            if (!fn) {
                return Promise.resolve();
            }
            try {
                return Promise.resolve(fn(context, () => {
                    return dispatch(i + 1);
                }));
            } catch (err) {
                return Promise.reject(err);
            }
        }
    };
}
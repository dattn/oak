export default class Controller {
    constructor(ctx) {
        this.ctx = ctx;
    }

    async before(action) {
        await action();
    }

    async after() {}
}

export const load = async function load(controllerName) {
    return new Promise((resolve, reject) => {
        try {
            resolve(require(`./controller/${controllerName}.js`).default);
        } catch (e) {
            reject(`Could not load controller "${controllerName}": ${e}`);
        }
    });
};

export const action = function action(controllerAction) {
    return async (ctx, next) => {
        const [controllerName, actionName] = controllerAction.split('@', 2);

        // init controller
        const ControllerClass = await load(controllerName);
        const controller = new ControllerClass(ctx);

        // execute action
        let action = async () => {
            await controller[actionName](ctx.params || {});
            await controller.after();
        };
        await controller.before(action);

        await next();
    };
};

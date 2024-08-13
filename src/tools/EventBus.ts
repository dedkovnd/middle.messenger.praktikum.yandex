export default class EventBus<E extends string> { 
    listeners: {[key in E]?: Array<(...args: object[]) => void>} = {}

    on<F extends (...args: any) => void>(event: E, callback: F) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event]!.push(callback);
    }
    off<F extends (...args: any) => void>(event: E, callback: F) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }
        this.listeners[event] = this.listeners[event]!.filter(listener => listener !== callback);
    }
    emit<F extends (...args: any) => void>(event: E, ...args: Parameters<F>) {
        if (!this.listeners[event]) {
            return;
            // throw new Error(`Нет события: ${event}`);
        }
        this.listeners[event]!.forEach(function (listener) {
            listener(...args);
        });
    }
}

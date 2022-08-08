type EventType = string | symbol;
type Handler<T = unknown> = (event: T) => void;

function eventBus() {
	const all = new Map();
	return {
		on(type: EventType, handler: Handler) {
			const handlers = all!.get(type);
			if (handlers) {
				handlers.push(handler);
			} else {
				all!.set(type, [handler]);
			}
		},
		emit(type: EventType, arg: any) {
			(all!.get(type) || []).forEach((handler: Handler) => handler(arg));
		},
		off(type: EventType, handler?: Handler) {
			const handlers = all!.get(type);
			if (!handlers) return;
			if (handler) {
				// handlers.indexOf(handler) >>> 0
				// 当handlers不包含handler时，确保handlers不会变
				handlers.splice(handlers.indexOf(handler) >>> 0, 1);
			} else {
				all!.set(type, []);
			}
		},
		once(type: EventType, handler: Handler) {
			const fn = (args: any) => {
				this.off(type, fn);
				handler(args);
			};

			this.on(type, fn);
		}
	};
}

export default eventBus();

// src\vs\base\common\async.ts
class ResourceQueue { // 827
    constructor() {
        this.queues = new Map();
        this.drainers = new Set();
        this.drainListeners = undefined;
        this.drainListenerCount = 0;
    }
	async whenDrained() {
		if (this.isDrained()) {
			return;
		}
		const promise = new DeferredPromise();
		this.drainers.add(promise);
		return promise.p;
	}
	isDrained() {
		for (const [, queue] of this.queues) {
			if (queue.size > 0) {
				return false;
			}
		}
		return true;
	}
	queueSize(resource, extUri) {
		const key = extUri.getComparisonKey(resource);
		return this.queues.get(key)?.size ?? 0;
	}
	queueFor(resource, factory, extUri) {
		const key = extUri.getComparisonKey(resource);

		let queue = this.queues.get(key);
		if (!queue) {
			queue = new Queue();
			const drainListenerId = this.drainListenerCount++;
			const drainListener = Event.once(queue.onDrained)(() => {
				queue?.dispose();
				this.queues.delete(key);
				this.onDidQueueDrain();

				this.drainListeners?.deleteAndDispose(drainListenerId);

				if (this.drainListeners?.size === 0) {
					this.drainListeners.dispose();
					this.drainListeners = undefined;
				}
			});

			if (!this.drainListeners) {
				this.drainListeners = new DisposableMap();
			}
			this.drainListeners.set(drainListenerId, drainListener);

			this.queues.set(key, queue);
		}
		return queue.queue(factory);
	}
	onDidQueueDrain() {
		if (!this.isDrained()) {
			return;
		}
		this.releaseDrainers();
	}
	releaseDrainers() {
		for (const drainer of this.drainers) {
			drainer.complete();
		}
		this.drainers.clear();
	}
	dispose() {
		for (const [, queue] of this.queues) {
			queue.dispose();
		}
		this.queues.clear();
		this.releaseDrainers();
		this.drainListeners?.dispose();
	}
}

function test() {
    const resourceQueue = new ResourceQueue()
    resourceQueue.queueFor()
}
test()

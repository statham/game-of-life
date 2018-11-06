class GameLoop {
  subscribers: any[];
  loopId?: number;

  constructor() {
    this.subscribers = [];
    this.loopId = undefined;
    this.loop = this.loop.bind(this);
  }

  loop() {
    this.subscribers.forEach(subscriber => {
      subscriber.call();
    });

    this.loopId = window.requestAnimationFrame(this.loop);
  }

  start() {
    if(!this.loopId) {
      this.loop()
    }
  }

  stop() {
    if(this.loopId) {
      window.cancelAnimationFrame(this.loopId);
      this.loopId = undefined;
    }
  }

  subscribe(callback: () => any): number {
    return this.subscribers.push(callback);
  }

  unsubscribe(id: number) {
    this.subscribers.splice((id - 1), 1);
  }
}

export default GameLoop;

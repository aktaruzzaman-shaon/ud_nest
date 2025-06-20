export class WrongTaskStatusException extends Error {
  constructor() {
    super('Wrong task status transition');
    this.name = 'wrong task status exception';
  }
}

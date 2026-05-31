export class MrBusinessException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'MrBusinessException';
  }
}

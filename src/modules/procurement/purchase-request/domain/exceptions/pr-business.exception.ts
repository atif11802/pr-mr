export class PrBusinessException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PrBusinessException';
  }
}

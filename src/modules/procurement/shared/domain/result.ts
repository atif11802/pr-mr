export class Result<T, E = Error> {
  private constructor(
    public readonly isSuccess: boolean,
    public readonly value?: T,
    public readonly error?: E,
  ) {
    if (isSuccess && error) {
      throw new Error('Successful result cannot contain an error');
    }

    if (!isSuccess && !error) {
      throw new Error('Failed result must contain an error');
    }
  }

  public get isFailure(): boolean {
    return !this.isSuccess;
  }

  public static ok<T>(value?: T): Result<T> {
    return new Result<T>(true, value);
  }

  public static fail<E = Error>(error: E): Result<never, E> {
    return new Result<never, E>(false, undefined, error);
  }
}

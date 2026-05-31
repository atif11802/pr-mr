export class Department {
  private constructor(public readonly value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('Department is required');
    }
  }

  public static create(value: string): Department {
    return new Department(value.trim());
  }
}

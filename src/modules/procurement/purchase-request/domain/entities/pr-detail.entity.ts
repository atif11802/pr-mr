export class PrDetail {
  constructor(
    public readonly itemCode: string,
    public readonly description: string,
    public readonly quantity: number,
    public readonly unitOfMeasure: string,
  ) {
    if (!itemCode || itemCode.trim().length === 0) {
      throw new Error('Purchase request item code is required');
    }
    if (!description || description.trim().length === 0) {
      throw new Error('Purchase request item description is required');
    }
    if (quantity <= 0) {
      throw new Error('Purchase request item quantity must be greater than zero');
    }
    if (!unitOfMeasure || unitOfMeasure.trim().length === 0) {
      throw new Error('Purchase request item unit of measure is required');
    }
  }
}

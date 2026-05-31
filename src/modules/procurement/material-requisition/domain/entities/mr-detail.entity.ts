export class MrDetail {
  constructor(
    public readonly itemCode: string,
    public readonly description: string,
    public readonly quantity: number,
    public readonly unitOfMeasure: string,
  ) {
    if (!itemCode || itemCode.trim().length === 0) {
      throw new Error('Material requisition item code is required');
    }
    if (!description || description.trim().length === 0) {
      throw new Error('Material requisition item description is required');
    }
    if (quantity <= 0) {
      throw new Error('Material requisition item quantity must be greater than zero');
    }
    if (!unitOfMeasure || unitOfMeasure.trim().length === 0) {
      throw new Error('Material requisition item unit of measure is required');
    }
  }
}

export class MrPrMapping {
  constructor(
    public mrDetailId: number,
    public prDetailId: number | null,
    public mappedQty: number,
    public prLineIndex?: number,
  ) {}
}

export class ApproveMaterialRequisitionCommand {
  constructor(public readonly requisitionId: string, public readonly approvedBy: string) {}
}

import { MaterialRequisition } from '../aggregates/mr-header.aggregate';

export interface MaterialRequisitionRepository {
  save(materialRequisition: MaterialRequisition): Promise<void>;
  findById(id: string): Promise<MaterialRequisition | null>;
}

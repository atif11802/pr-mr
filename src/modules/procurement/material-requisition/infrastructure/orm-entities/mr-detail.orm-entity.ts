import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { MrHeaderOrmEntity } from './mr-header.orm-entity';

@Entity({ name: 'material_requisition_details' })
export class MrDetailOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  itemCode!: string;

  @Column()
  description!: string;

  @Column('double precision')
  quantity!: number;

  @Column()
  unitOfMeasure!: string;

  @ManyToOne(() => MrHeaderOrmEntity, (header) => header.details, { onDelete: 'CASCADE' })
  requisition!: MrHeaderOrmEntity;
}

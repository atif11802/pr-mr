import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PrHeaderOrmEntity } from './pr-header.orm-entity';

@Entity({ name: 'purchase_request_details' })
export class PrDetailOrmEntity {
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

  @ManyToOne(() => PrHeaderOrmEntity, (header) => header.details, { onDelete: 'CASCADE' })
  purchaseRequest!: PrHeaderOrmEntity;
}

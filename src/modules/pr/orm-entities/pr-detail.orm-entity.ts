import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PrHeaderOrmEntity } from './pr-header.orm-entity';
import { MrPrMappingOrmEntity } from './mr-pr-mapping.orm-entity';

const decimalTransformer = {
  to: (value: number | string) => value ?? 0,
  from: (value: string | null) => (value !== null ? Number(value) : 0),
};

@Entity('pr_details')
export class PrDetailOrmEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'pr_detail_id' })
  prDetailId!: number;

  @ManyToOne(() => PrHeaderOrmEntity, (header) => header.details, { nullable: false })
  @JoinColumn({ name: 'pr_id' })
  header!: PrHeaderOrmEntity;

  @Column({ type: 'bigint', name: 'item_id' })
  itemId!: number;

  @Column({ type: 'bigint', name: 'uom_id' })
  uomId!: number;

  @Column('numeric', {
    precision: 18,
    scale: 4,
    name: 'request_qty',
    transformer: decimalTransformer,
    default: 0,
  })
  requestQty!: number;

  @Column('numeric', {
    precision: 18,
    scale: 4,
    name: 'rfq_qty',
    transformer: decimalTransformer,
    default: 0,
  })
  rfqQty!: number;

  @Column('numeric', {
    precision: 18,
    scale: 4,
    name: 'po_qty',
    transformer: decimalTransformer,
    default: 0,
  })
  poQty!: number;

  @Column('numeric', {
    precision: 18,
    scale: 4,
    name: 'remaining_po_qty',
    transformer: decimalTransformer,
    default: 0,
  })
  remainingPoQty!: number;

  @Column('numeric', {
    precision: 18,
    scale: 4,
    name: 'estimated_price',
    transformer: decimalTransformer,
    default: 0,
  })
  estimatedPrice!: number;

  @Column({ type: 'varchar', name: 'line_status', length: 30 })
  lineStatus!: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt!: Date;

  @OneToMany(() => MrPrMappingOrmEntity, (mapping) => mapping.prDetail, {
    cascade: false,
    eager: false,
  })
  mappings!: MrPrMappingOrmEntity[];
}

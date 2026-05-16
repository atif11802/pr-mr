import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MrHeaderOrmEntity } from './mr-header.orm-entity';
import { MrPrMappingOrmEntity } from '../../pr/orm-entities/mr-pr-mapping.orm-entity';

const decimalTransformer = {
  to: (value: number | string) => value ?? 0,
  from: (value: string | null) => (value !== null ? Number(value) : 0),
};

@Entity('mr_details')
export class MrDetailOrmEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'mr_detail_id' })
  mrDetailId!: number;

  @ManyToOne(() => MrHeaderOrmEntity, (header) => header.details, { nullable: false })
  @JoinColumn({ name: 'mr_id' })
  header!: MrHeaderOrmEntity;

  @Column({ type: 'bigint', name: 'item_id' })
  itemId!: number;

  @Column({ type: 'bigint', name: 'uom_id' })
  uomId!: number;

  @Column('numeric', {
    precision: 18,
    scale: 4,
    name: 'required_qty',
    transformer: decimalTransformer,
    default: 0,
  })
  requiredQty!: number;

  @Column('numeric', {
    precision: 18,
    scale: 4,
    name: 'approved_qty',
    transformer: decimalTransformer,
    default: 0,
  })
  approvedQty!: number;

  @Column('numeric', {
    precision: 18,
    scale: 4,
    name: 'pr_created_qty',
    transformer: decimalTransformer,
    default: 0,
  })
  prCreatedQty!: number;

  @Column('numeric', {
    precision: 18,
    scale: 4,
    name: 'remaining_pr_qty',
    transformer: decimalTransformer,
    default: 0,
  })
  remainingPrQty!: number;

  @Column('numeric', {
    precision: 18,
    scale: 4,
    name: 'stock_qty',
    transformer: decimalTransformer,
    default: 0,
  })
  stockQty!: number;

  @Column({ type: 'date', name: 'expected_date' })
  expectedDate!: Date;

  @Column({ type: 'varchar', name: 'purpose', length: 255, nullable: true })
  purpose!: string | null;

  @Column({ type: 'varchar', name: 'line_status', length: 30 })
  lineStatus!: string;

  @Column({ type: 'boolean', name: 'is_closed', default: false })
  isClosed!: boolean;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt!: Date;

  @OneToMany(() => MrPrMappingOrmEntity, (mapping) => mapping.mrDetail, {
    cascade: false,
    eager: false,
  })
  mappings!: MrPrMappingOrmEntity[];
}

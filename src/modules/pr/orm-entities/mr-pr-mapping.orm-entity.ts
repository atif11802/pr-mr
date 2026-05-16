import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { MrDetailOrmEntity } from '../../mr/orm-entities/mr-detail.orm-entity';
import { PrDetailOrmEntity } from './pr-detail.orm-entity';

const decimalTransformer = {
  to: (value: number | string) => value ?? 0,
  from: (value: string | null) => (value !== null ? Number(value) : 0),
};

@Entity('mr_pr_mapping')
export class MrPrMappingOrmEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'mapping_id' })
  mappingId!: number;

  @ManyToOne(() => MrDetailOrmEntity, (mrDetail) => mrDetail.mappings, { nullable: false })
  @JoinColumn({ name: 'mr_detail_id' })
  mrDetail!: MrDetailOrmEntity;

  @ManyToOne(() => PrDetailOrmEntity, (prDetail) => prDetail.mappings, { nullable: false })
  @JoinColumn({ name: 'pr_detail_id' })
  prDetail!: PrDetailOrmEntity;

  @Column('numeric', {
    precision: 18,
    scale: 4,
    name: 'mapped_qty',
    transformer: decimalTransformer,
    default: 0,
  })
  mappedQty!: number;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt!: Date;

  @Column({ type: 'bigint', name: 'created_by' })
  createdBy!: number;
}

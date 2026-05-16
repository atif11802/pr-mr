import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PrDetailOrmEntity } from './pr-detail.orm-entity';

@Entity('pr_header')
export class PrHeaderOrmEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'pr_id' })
  prId!: number;

  @Column({ type: 'varchar', name: 'pr_no', length: 50 })
  prNo!: string;

  @Column({ type: 'timestamp', name: 'pr_date' })
  prDate!: Date;

  @Column({ type: 'bigint', name: 'buyer_id' })
  buyerId!: number;

  @Column({ type: 'bigint', name: 'supplier_id', nullable: true })
  supplierId!: number | null;

  @Column({ type: 'varchar', name: 'status', length: 30 })
  status!: string;

  @Column({ type: 'text', name: 'remarks', nullable: true })
  remarks!: string | null;

  @Column({ type: 'varchar', name: 'approval_status', length: 20 })
  approvalStatus!: string;

  @Column({ type: 'bigint', name: 'approved_by', nullable: true })
  approvedBy!: number | null;

  @Column({ type: 'timestamp', name: 'approved_date', nullable: true })
  approvedDate!: Date | null;

  @Column({ type: 'bigint', name: 'company_id' })
  companyId!: number;

  @Column({ type: 'bigint', name: 'created_by' })
  createdBy!: number;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt!: Date;

  @OneToMany(() => PrDetailOrmEntity, (detail) => detail.header, {
    cascade: true,
    eager: false,
  })
  details!: PrDetailOrmEntity[];
}

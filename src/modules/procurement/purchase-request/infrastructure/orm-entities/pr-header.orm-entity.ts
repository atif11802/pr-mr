import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { PrDetailOrmEntity } from './pr-detail.orm-entity';

@Entity({ name: 'purchase_request_headers' })
export class PrHeaderOrmEntity {
  @PrimaryColumn('uuid')
  id!: string;

  @Column('uuid')
  mrId!: string;

  @Column()
  mrNumber!: string;

  @Column()
  requestedBy!: string;

  @Column()
  status!: string;

  @VersionColumn()
  version!: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt?: Date;

  @Column({ name: 'approved_at', nullable: true })
  approvedAt?: Date;

  @Column({ name: 'rejected_at', nullable: true })
  rejectedAt?: Date;

  @Column({ name: 'rejection_reason', nullable: true })
  rejectionReason?: string;

  @Column({ name: 'cancelled_at', nullable: true })
  cancelledAt?: Date;

  @Column({ name: 'cancellation_reason', nullable: true })
  cancellationReason?: string;

  @OneToMany(() => PrDetailOrmEntity, (detail) => detail.purchaseRequest, {
    cascade: true,
    eager: true,
  })
  details!: PrDetailOrmEntity[];
}

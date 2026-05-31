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
import { MrDetailOrmEntity } from './mr-detail.orm-entity';

@Entity({ name: 'material_requisition_headers' })
export class MrHeaderOrmEntity {
  @PrimaryColumn('uuid')
  id!: string;

  @Column({ unique: true })
  mrNumber!: string;

  @Column()
  department!: string;

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

  @Column({ name: 'submitted_at', nullable: true })
  submittedAt?: Date;

  @Column({ name: 'approved_at', nullable: true })
  approvedAt?: Date;

  @Column({ name: 'rejected_at', nullable: true })
  rejectedAt?: Date;

  @OneToMany(() => MrDetailOrmEntity, (detail) => detail.requisition, {
    cascade: true,
    eager: true,
  })
  details!: MrDetailOrmEntity[];
}

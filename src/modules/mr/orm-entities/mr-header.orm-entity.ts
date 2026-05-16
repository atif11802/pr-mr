import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { MrDetailOrmEntity } from './mr-detail.orm-entity';

@Entity('mr_header')
export class MrHeaderOrmEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'mr_id' })
  mrId!: number;

  @Column({ type: 'varchar', name: 'mr_no', length: 50 })
  mrNo!: string;

  @Column({ type: 'timestamp', name: 'mr_date' })
  mrDate!: Date;

  @Column({ type: 'bigint', name: 'request_by_emp_id' })
  requestByEmpId!: number;

  @Column({ type: 'bigint', name: 'department_id' })
  departmentId!: number;

  @Column({ type: 'bigint', name: 'project_id', nullable: true })
  projectId!: number | null;

  @Column({ type: 'bigint', name: 'warehouse_id' })
  warehouseId!: number;

  @Column({ type: 'varchar', name: 'priority', length: 20 })
  priority!: string;

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

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt!: Date;

  @OneToMany(() => MrDetailOrmEntity, (detail) => detail.header, {
    cascade: true,
    eager: false,
  })
  details!: MrDetailOrmEntity[];
}

import type { FairModel } from '@/data/fair/model'
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm'

@Entity('fairItem')
export class FairItemModel {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  name: string

  @Column({ nullable: true })
  brand?: string

  @Column({ type: 'float' })
  price: number

  @Column({ nullable: true })
  code?: string

  @ManyToOne("FairModel", (fair: FairModel) => fair.fairList, {
    onDelete: 'CASCADE',
  })
  fair: FairModel

  @Column({ default: true })
  isActive: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date
}

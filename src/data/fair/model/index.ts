import type { FairItemModel } from '@/data/fairItem/model'
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm'

@Entity('fair')
export class FairModel {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ nullable: true })
  name?: string

  @OneToMany("FairItemModel", (fairItem: FairItemModel) => fairItem.fair, {
    nullable: true,
    cascade: true,
  })
  fairList: FairItemModel[]

  @Column({ default: true })
  isActive: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date
}

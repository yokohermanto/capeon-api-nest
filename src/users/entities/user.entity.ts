import { Exclude, Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user', { schema: 'public' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  public firstname: string;

  @Column({ nullable: true })
  public lastname: string;

  @Exclude()
  @Column()
  public email: string;

  @Exclude()
  @Column()
  public password: string;

  @Column({ nullable: true })
  public avatar: string;

  @Column({ nullable: true })
  public phone: string;

  @Exclude()
  @Column({ nullable: true })
  public rememberToken: string;

  @Exclude()
  @Column({
    nullable: true,
    // type: 'timestamp',
  })
  public verifiedAt: Date;

  @Expose()
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP()',
  })
  public createdAt: Date;

  @Exclude()
  @UpdateDateColumn()
  public updatedAt: Date;

  @Exclude()
  @DeleteDateColumn()
  public deletedAt: Date;
}

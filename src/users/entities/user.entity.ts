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
  public id!: string;

  @Column()
  public firstname!: string;

  @Column({ nullable: true })
  public lastname?: string;

  @Exclude()
  @Column()
  public email!: string;

  @Exclude({ toPlainOnly: true })
  @Column()
  public password!: string;

  @Column({ nullable: true })
  public avatar?: string;

  @Column({ nullable: true })
  public phone?: string;

  @Exclude()
  @Column({ nullable: true })
  public rememberToken?: string;

  @Exclude()
  @Column({ nullable: true })
  public verifiedAt?: Date;

  @Expose()
  @CreateDateColumn()
  public createdAt!: Date;

  @Exclude()
  @UpdateDateColumn()
  public updatedAt!: Date;

  @Exclude()
  @DeleteDateColumn({ nullable: true })
  public deletedAt?: Date;
}

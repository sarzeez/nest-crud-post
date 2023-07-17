import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'posts' })
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  body: string;

  @Column({ name: 'created_at' })
  createdAt: number;

  @Column({ name: 'updated_at', nullable: true })
  updatedAt: number;
}

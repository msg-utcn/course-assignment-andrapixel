import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { QuestionModel } from './question.model';
import { UserModel } from '../../users/model/user.model';

@Entity()
export class AnswerModel {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @ManyToOne(() => QuestionModel, (question) => question.answers, {
    nullable: false,
    cascade: true,
  })
  parent: QuestionModel;

  @ManyToOne(() => UserModel, (user) => user.answers, { nullable: false })
  postedBy: UserModel;

  @Column({ nullable: false })
  content: string;

  @Column({ nullable: false })
  rating?: number;

  @Column({ nullable: false, type: 'date' })
  creationDate: Date;

  constructor(values: Partial<AnswerModel>) {
    if (values) {
      this.id = values.id;
      this.parent = values.parent;
      this.postedBy = values.postedBy;
      this.content = values.content;
      this.rating = values.rating;
      this.creationDate = values.creationDate;
    }
  }
}

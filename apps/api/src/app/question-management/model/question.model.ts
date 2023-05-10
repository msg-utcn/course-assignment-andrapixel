import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { QuestionTopic } from './question-topic';
import { AnswerModel } from './answer.model';
import { UserModel } from '../../users/model/user.model';

@Entity()
export class QuestionModel {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ nullable: false })
  title: string;

  @ManyToOne(() => UserModel, (user) => user.questions, {
    nullable: false,
    cascade: true,
  })
  postedBy: UserModel;

  @Column({ nullable: false })
  content: string;

  @Column({ nullable: false, enum: QuestionTopic, type: 'enum' })
  topic: QuestionTopic;

  @Column({ nullable: false })
  rating: number;

  @Column({ nullable: false })
  creationDate: string;

  @OneToMany(() => AnswerModel, (answer) => answer.parent)
  answers?: AnswerModel[];

  constructor(values: Partial<QuestionModel>) {
    if (values) {
      this.id = values.id;
      this.title = values.title;
      this.postedBy = values.postedBy;
      this.content = values.content;
      this.topic = values.topic;
      this.rating = values.rating;
      this.creationDate = values.creationDate;
      this.answers = values.answers;
    }
  }
}

import { QuestionTopic } from './question-topic';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class QuestionModel {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: true })
  postedBy: string;

  @Column({ nullable: false })
  content: string;

  @Column({ nullable: false, enum: QuestionTopic, type: 'enum' })
  topic: QuestionTopic;

  @Column({ nullable: false })
  rating: number;

  @Column({ nullable: false })
  creationDate: string;

  constructor(values: Partial<QuestionModel>) {
    if (values) {
      this.id = values.id;
      this.title = values.title;
      this.postedBy = values.postedBy;
      this.content = values.content;
      this.topic = values.topic;
      this.rating = values.rating;
      this.creationDate = values.creationDate;
    }
  }
}

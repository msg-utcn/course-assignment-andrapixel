import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from './user-role';
import { AnswerModel } from '../../question-management/model/answer.model';
import { QuestionModel } from '../../question-management/model/question.model';

@Entity()
export class UserModel {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false, enum: UserRole, type: 'enum', array: true })
  roles: UserRole[];

  @OneToMany(() => AnswerModel, (answer) => answer.postedBy, { lazy: true })
  answers?: AnswerModel[];

  @OneToMany(() => QuestionModel, (question) => question.postedBy, {
    lazy: true,
  })
  questions?: QuestionModel[];

  constructor(values: Partial<UserModel>) {
    if (values) {
      this.id = values.id;
      this.name = values.name;
      this.email = values.email;
      this.password = values.password;
      this.roles = values.roles;
      this.answers = values.answers;
      this.questions = values.questions;
    }
  }
}

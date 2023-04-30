import { QuestionTopic } from '../model/question-topic';

export class QuestionDto {
  id?: string;
  title: string;
  postedBy: string;
  content: string;
  topic: QuestionTopic;
  rating: number;
  creationDate: string;

  constructor(values: Partial<QuestionDto>) {
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

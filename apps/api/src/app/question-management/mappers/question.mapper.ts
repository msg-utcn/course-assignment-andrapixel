import { CreateQuestionDto } from '../dtos/create-question.dto';
import { QuestionModel } from '../model/question.model';
import { UpdateQuestionDto } from '../dtos/update-question.dto';
import { QuestionDto } from '../dtos/question.dto';
import { UserModel } from '../../users/model/user.model';

export class QuestionMapper {
  static mapCreateQuestionDtoToModel(
    dto: CreateQuestionDto,
    postedByUser: UserModel
  ): QuestionModel {
    return new QuestionModel({
      id: undefined,
      postedBy: postedByUser,
      rating: 0,
      title: dto.title,
      content: dto.content,
      topic: dto.topic,
      creationDate: new Date().toISOString(),
      answers: [],
    });
  }

  static mapUpdateQuestionDtoToModel(
    dto: UpdateQuestionDto,
    oldModel: QuestionModel
  ): QuestionModel {
    return new QuestionModel({
      ...oldModel,
      title: dto.title,
      content: dto.content,
    });
  }

  static mapToDto(model: QuestionModel): QuestionDto {
    return new QuestionDto({
      id: model.id,
      title: model.title,
      postedBy: model.postedBy.id,
      content: model.content,
      topic: model.topic,
      rating: model.rating,
      creationDate: model.creationDate,
    });
  }
}

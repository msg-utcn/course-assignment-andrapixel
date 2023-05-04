import { CreateAnswerDto } from '../dtos/create-answer.dto';
import { AnswerModel } from '../model/answer.model';
import { UpdateAnswerDto } from '../dtos/update-answer.dto';
import { AnswerDto } from '../dtos/answer.dto';
import { QuestionModel } from '../model/question.model';
import { UserModel } from '../../users/model/user.model';

export class AnswerMapper {
  static mapCreateAnswerDtoToModel(
    dto: CreateAnswerDto,
    parent: QuestionModel,
    postedByUser: UserModel
  ): AnswerModel {
    return new AnswerModel({
      id: undefined,
      parent,
      postedBy: postedByUser,
      content: dto.content,
      rating: 0,
      creationDate: new Date(),
    });
  }

  static mapUpdateAnswerDtoToModel(
    dto: UpdateAnswerDto,
    oldModel: AnswerModel
  ): AnswerModel {
    return new AnswerModel({
      ...oldModel,
      content: dto.content,
      //parent: oldModel.parent,
    });
  }

  static mapToDto(model: AnswerModel): AnswerDto {
    return new AnswerDto({
      id: model.id,
      parentId: model.parent.id,
      content: model.content,
      rating: model.rating,
      creationDate: new Date(model.creationDate).toISOString(),
    });
  }
}

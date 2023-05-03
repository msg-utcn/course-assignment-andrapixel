import { CreateAnswerDto } from '../dtos/create-answer.dto';
import { AnswerModel } from '../model/answer.model';
import { UpdateAnswerDto } from '../dtos/update-answer.dto';
import { AnswerDto } from '../dtos/answer.dto';

export class AnswerMapper {
  static mapCreateAnswerDtoToModel(dto: CreateAnswerDto): AnswerModel {
    return new AnswerModel({
      id: undefined,
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
    });
  }

  static mapToDto(model: AnswerModel): AnswerDto {
    return new AnswerDto({
      id: model.id,
      content: model.content,
      rating: model.rating,
      creationDate: new Date(model.creationDate).toISOString(),
    });
  }
}

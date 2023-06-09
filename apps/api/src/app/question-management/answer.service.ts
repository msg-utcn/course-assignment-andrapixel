import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnswerModel } from './model/answer.model';
import { Repository } from 'typeorm';
import { AnswerDto } from './dtos/answer.dto';
import { CreateAnswerDto } from './dtos/create-answer.dto';
import { UpdateAnswerDto } from './dtos/update-answer.dto';
import { AnswerMapper } from './mappers/answer.mapper';
import { QuestionModel } from './model/question.model';
import { UserModel } from '../users/model/user.model';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(AnswerModel)
    private answerModelRepository: Repository<AnswerModel>,
    @InjectRepository(QuestionModel)
    private questionModelRepository: Repository<QuestionModel>,
    @InjectRepository(UserModel)
    private userModelRepository: Repository<UserModel>
  ) {}

  async readById(id: string): Promise<AnswerDto> {
    const foundModel = await this.readModelById(id);
    return AnswerMapper.mapToDto(foundModel);
  }

  async readAllByQuestionId(questionId: string): Promise<AnswerDto[]> {
    const foundModels = await this.answerModelRepository.find({
      where: { parent: { id: questionId } },
      relations: ['postedBy', 'parent'],
    });

    if (!foundModels) {
      return [];
    }

    return foundModels.map((model) => AnswerMapper.mapToDto(model));
  }

  async create(questionId: string, dto: CreateAnswerDto): Promise<AnswerDto> {
    const foundQuestion = await this.questionModelRepository.findOneBy({
      id: questionId,
    });
    if (!foundQuestion) {
      throw new BadRequestException();
    }

    const foundUser = await this.userModelRepository.findOneBy({
      id: dto.postedBy,
    });
    if (!foundUser) {
      throw new NotFoundException();
    }

    try {
      const model = AnswerMapper.mapCreateAnswerDtoToModel(
        dto,
        foundQuestion,
        foundUser
      );
      const savedModel = await this.answerModelRepository.save(model);
      return AnswerMapper.mapToDto(savedModel);
    } catch (error) {
      Logger.log(error, 'AnswerService.create');
      throw new BadRequestException();
    }
  }

  async update(id: string, dto: UpdateAnswerDto): Promise<AnswerDto> {
    const foundModel = await this.readModelById(id);

    try {
      const updatedModel = AnswerMapper.mapUpdateAnswerDtoToModel(
        dto,
        foundModel
      );
      const savedModel = await this.answerModelRepository.save(updatedModel);
      return AnswerMapper.mapToDto(savedModel);
    } catch (error) {
      Logger.log(error, 'AnswerService.update');
      throw new BadRequestException();
    }
  }

  async delete(id: string): Promise<void> {
    const deleteResult = await this.answerModelRepository.delete({ id });

    if (deleteResult.affected === 0) {
      throw new BadRequestException();
    }
  }

  private async readModelById(id: string): Promise<AnswerModel> {
    const foundModel = await this.answerModelRepository.findOne({
      where: { id },
      relations: ['postedBy', 'parent'],
    });

    if (!foundModel) {
      throw new NotFoundException();
    }

    return foundModel;
  }

  async deleteAll(): Promise<boolean> {
    const deleteResult = await this.answerModelRepository.delete({});

    if (deleteResult.affected === 0) {
      throw new BadRequestException();
    }

    return true;
  }
}

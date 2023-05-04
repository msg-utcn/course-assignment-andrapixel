import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionModel } from './model/question.model';
import { Repository } from 'typeorm';
import { QuestionMapper } from './mappers/question.mapper';
import { CreateQuestionDto } from './dtos/create-question.dto';
import { UpdateQuestionDto } from './dtos/update-question.dto';
import { QuestionDto } from './dtos/question.dto';
import { AnswerModel } from './model/answer.model';
import { UserModel } from '../users/model/user.model';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(QuestionModel)
    private questionModelRepository: Repository<QuestionModel>,
    @InjectRepository(AnswerModel)
    private answerModelRepository: Repository<AnswerModel>,
    @InjectRepository(UserModel)
    private userModelRepository: Repository<UserModel>
  ) {}

  async readAll(): Promise<QuestionDto[]> {
    const foundModels = await this.questionModelRepository.find({
      relations: ['postedBy'],
    });

    if (!foundModels) {
      return [];
    }

    return foundModels.map((model) => QuestionMapper.mapToDto(model));
  }

  async readById(id: string): Promise<QuestionDto> {
    const foundModel = await this.readModelById(id);
    return QuestionMapper.mapToDto(foundModel);
  }

  async create(dto: CreateQuestionDto): Promise<QuestionDto> {
    const userModel = await this.userModelRepository.findOneBy({
      id: dto.postedBy,
    });
    if (!userModel) {
      throw new NotFoundException();
    }
    const model = QuestionMapper.mapCreateQuestionDtoToModel(dto, userModel);

    try {
      const savedModel = await this.questionModelRepository.save(model);
      return QuestionMapper.mapToDto(savedModel);
    } catch (error) {
      Logger.log(error, 'QuestionService.create');
      throw new BadRequestException();
    }
  }

  async update(id: string, dto: UpdateQuestionDto): Promise<QuestionDto> {
    const foundModel = await this.readModelById(id);
    const updatedModel = QuestionMapper.mapUpdateQuestionDtoToModel(
      dto,
      foundModel
    );

    try {
      const savedModel = await this.questionModelRepository.save(updatedModel);
      return QuestionMapper.mapToDto(savedModel);
    } catch (error) {
      Logger.log(error, 'QuestionService.update');
      throw new BadRequestException();
    }
  }

  async delete(id: string): Promise<void> {
    const answerDeleteResult = await this.answerModelRepository.delete({
      parent: { id },
    });
    const deleteResult = await this.questionModelRepository.delete({ id });

    if (deleteResult.affected === 0 && answerDeleteResult.affected === 0) {
      throw new BadRequestException();
    }
  }

  private async readModelById(id: string): Promise<QuestionModel> {
    const foundModel = await this.questionModelRepository.findOne({
      where: { id },
      relations: ['postedBy'],
    });

    if (!foundModel) {
      throw new NotFoundException();
    }

    return foundModel;
  }
}

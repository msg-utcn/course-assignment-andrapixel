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

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(AnswerModel)
    private answerModelRepository: Repository<AnswerModel>
  ) {}

  async readById(id: string): Promise<AnswerDto> {
    const foundModel = await this.readModelById(id);
    return AnswerMapper.mapToDto(foundModel);
  }

  async readAll(): Promise<AnswerDto[]> {
    const foundModels = await this.answerModelRepository.find();

    if (!foundModels) {
      return [];
    }

    return foundModels.map((model) => AnswerMapper.mapToDto(model));
  }

  async create(dto: CreateAnswerDto): Promise<AnswerDto> {
    const model = AnswerMapper.mapCreateAnswerDtoToModel(dto);

    try {
      const savedModel = await this.answerModelRepository.save(model);
      return AnswerMapper.mapToDto(savedModel);
    } catch (error) {
      Logger.log(error, 'AnswerService.create');
      throw new BadRequestException();
    }
  }

  async update(id: string, dto: UpdateAnswerDto): Promise<AnswerDto> {
    const foundModel = await this.readModelById(id);
    const updatedModel = AnswerMapper.mapUpdateAnswerDtoToModel(
      dto,
      foundModel
    );

    try {
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
    });

    if (!foundModel) {
      throw new NotFoundException();
    }

    return foundModel;
  }
}

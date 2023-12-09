import { DataSource, Repository } from 'typeorm'
import { FairModel } from '@/data/fair/model'
import { FairCreateDto } from '../dto/index.dto'

export class FairRepository {
  private ormRepository: Repository<FairModel>

  constructor(connection: DataSource) {
    this.ormRepository = connection.getRepository(FairModel)
  }

  public async getAll(order: 'ASC' | 'DESC' = 'DESC'): Promise<FairModel[]> {
    const fairs = await this.ormRepository.find({
      order: {
        id: order,
      },
    })
    return fairs
  }

  public async create({ name }: FairCreateDto): Promise<FairModel> {
    const fair = this.ormRepository.create({
      name,
    })
    await this.ormRepository.save(fair)
    return fair
  }

  public async update(id: number, name: string): Promise<FairModel | null> {
    const fair = await this.ormRepository.findOne({
      where: { id },
    })
    if (!fair) {
      return null
    }
    fair.name = name
    await this.ormRepository.save(fair)
    return fair
  }

  public async getById(id: number): Promise<FairModel | null> {
    const fair = await this.ormRepository.findOne({
      where: { id },
      relations: ['fairList'],
    })
    return fair
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.delete(id)
  }
}

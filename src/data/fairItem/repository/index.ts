import { DataSource, Repository } from 'typeorm'
import { FairItemModel } from '../model'
import { FairItemCreateDto } from '../dto/index.dto'
import { FairModel } from '@/data/fair/model'

export class FairItemRepository {
  private ormRepository: Repository<FairItemModel>

  constructor(connection: DataSource) {
    this.ormRepository = connection.getRepository(FairItemModel)
  }

  public async getAll(): Promise<FairItemModel[]> {
    const fairs = await this.ormRepository.find()
    return fairs
  }

  public async getNames(): Promise<string[]> {
    const fairs = await this.ormRepository
      .createQueryBuilder('fairItem')
      .select('fairItem.name')
      .groupBy('fairItem.name')
      .getMany()
    return fairs.map(({ name }) => name)
  }

  public async create(
    item: FairItemCreateDto,
    fair: FairModel,
  ): Promise<FairItemModel> {
    const { name, price, brand, weight, unit } = item
    const fairItem = this.ormRepository.create({
      name,
      price,
      fair,
      brand,
      weight,
      unit,
    })
    await this.ormRepository.save(fairItem)
    return fairItem
  }

  public async getById(id: number): Promise<FairItemModel | null> {
    const fair = await this.ormRepository.findOne({
      where: { id },
    })
    return fair
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.delete(id)
  }
}

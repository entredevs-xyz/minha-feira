import { useDatabaseConnection } from '@/data/connection'
import { FairItemCreateDto } from '../dto/index.dto'
import { FairModel } from '@/data/fair/model'
import { useRef } from 'react'

export const useFairItemService = () => {
  const { fairItemRepository } = useDatabaseConnection()

  const getAll = () => {
    return fairItemRepository.getAll()
  }
  const create = (dto: FairItemCreateDto, fair: FairModel) => {
    console.log('dto', dto)
    return fairItemRepository.create(dto, fair)
  }
  const getById = (id: number) => {
    return fairItemRepository.getById(id)
  }
  const remove = (id: number) => {
    return fairItemRepository.delete(id)
  }

  const getNames = () => {
    return fairItemRepository.getNames()
  }

  return useRef({
    getAll,
    create,
    getById,
    remove,
    getNames,
  }).current
}

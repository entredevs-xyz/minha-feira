import { useDatabaseConnection } from '@/data/connection'
import { FairCreateDto, FairUpdateDto } from '../dto/index.dto'
import { useRef } from 'react'

export const useFairService = () => {
  const { fairRepository } = useDatabaseConnection()

  const getAll = () => {
    return fairRepository.getAll()
  }

  const create = (dto: FairCreateDto) => {
    return fairRepository.create(dto)
  }
  const getById = (id: number) => {
    return fairRepository.getById(id)
  }

  const update = (id: number, dto: FairUpdateDto) => {
    return fairRepository.update(id, dto)
  }

  const remove = (id: number) => {
    return fairRepository.delete(id)
  }

  return useRef({
    getAll,
    create,
    getById,
    remove,
    update,
  }).current
}

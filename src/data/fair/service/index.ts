import { useDatabaseConnection } from '@/data/connection'
import { FairCreateDto } from '../dto/index.dto'
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

  const update = (id: number, description: string) => {
    return fairRepository.update(id, description)
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

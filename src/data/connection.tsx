import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { FairRepository } from '@/data/fair/repository'
import { DataSource } from 'typeorm'
import { ActivityIndicator } from 'react-native-paper'
import { FairModel } from '@/data/fair/model'
import { FairItemModel } from '@/data/fairItem/model'
import { FairItemRepository } from '@/data/fairItem/repository'

interface DatabaseConnectionContextData {
  fairRepository: FairRepository
  fairItemRepository: FairItemRepository
}

const DatabaseConnectionContext = createContext<DatabaseConnectionContextData>(
  {} as DatabaseConnectionContextData,
)

export const DatabaseConnectionProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [connection, setConnection] = useState<DataSource | null>(null)

  const connect = useCallback(async () => {
    const createdConnection = new DataSource({
      type: 'expo',
      database: 'minhaFeira.db',
      driver: require('expo-sqlite'),
      entities: [FairModel, FairItemModel],
      migrations: [],
      logger: 'simple-console',
      migrationsRun: false,
      synchronize: true,
    })

    setConnection(createdConnection)
  }, [])

  useEffect(() => {
    if (!connection) {
      connect()
        .then(() => {
          console.log('Conectado!')
        })
        .catch((err) => {
          console.log('Erro ao conectar: ', err)
        })
      return
    }

    if (!connection?.isInitialized) connection?.initialize()
  }, [connect, connection])

  if (!connection) {
    return <ActivityIndicator />
  }

  return (
    <DatabaseConnectionContext.Provider
      value={{
        fairRepository: new FairRepository(connection),
        fairItemRepository: new FairItemRepository(connection),
      }}
    >
      {children}
    </DatabaseConnectionContext.Provider>
  )
}

export function useDatabaseConnection() {
  const context = useContext(DatabaseConnectionContext)

  return context
}

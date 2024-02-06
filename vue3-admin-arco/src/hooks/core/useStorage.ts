import { db } from '@/utils/db'

export function useStorage() {
  return {
    localSet({ dbName = 'user', path, value, user = true }: any) {
      db.dbSet({ dbName, path, value, user })
    },
    localGet({ dbName = 'user', path, defaultValue = {}, user = true }: any) {
      return db.dbGet({ dbName, path, defaultValue, user })
    },
  }
}

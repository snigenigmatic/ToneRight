interface CacheEntry {
  data: unknown
  timestamp: number
}

const cache = new Map<string, CacheEntry>()
const CACHE_TTL = 1000 * 60 * 60 // 1 hour

export function getCacheKey(email: string): string {
  return `tone-analysis:${Buffer.from(email).toString("base64")}`
}

export function getFromCache(key: string): unknown | null {
  const entry = cache.get(key)
  if (!entry) return null

  const now = Date.now()
  if (now - entry.timestamp > CACHE_TTL) {
    cache.delete(key)
    return null
  }

  return entry.data
}

export function setInCache(key: string, data: unknown): void {
  cache.set(key, {
    data,
    timestamp: Date.now(),
  })
}

export function clearCache(): void {
  cache.clear()
}

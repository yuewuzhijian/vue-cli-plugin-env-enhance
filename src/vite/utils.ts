import path from 'node:path'
import fs from 'node:fs'

export const isWindows = typeof process !== 'undefined' && process.platform === 'win32'

const windowsSlashRE = /\\/g
export function slash(p: string): string {
  return p.replace(windowsSlashRE, '/')
}

export function arraify<T>(target: T | T[]): T[] {
  return Array.isArray(target) ? target : [target]
}

export function normalizePath(id: string): string {
  return path.posix.normalize(isWindows ? slash(id) : id)
}

export function tryStatSync(file: string): fs.Stats | undefined {
  try {
    // The "throwIfNoEntry" is a performance optimization for cases where the file does not exist
    return fs.statSync(file, { throwIfNoEntry: false })
  } catch {
    // Ignore errors
  }
}

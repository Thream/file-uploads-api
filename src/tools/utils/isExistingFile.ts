import fs from "node:fs"

export const isExistingFile = async (path: string): Promise<boolean> => {
  try {
    await fs.promises.access(path, fs.constants.F_OK)
    return true
  } catch {
    return false
  }
}

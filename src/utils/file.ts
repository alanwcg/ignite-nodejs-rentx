import fs from 'fs';

async function deleteFile(fileName: string): Promise<void> {
  try {
    await fs.promises.stat(fileName);
  } catch (err) {
    return;
  }

  await fs.promises.unlink(fileName);
}

export default deleteFile;

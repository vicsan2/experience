import type { VoiceNote } from "@prisma/client"
import { prisma } from "~/db.server"

export async function getVoiceNotesByUsername(username: VoiceNote["username"]) {
  return prisma.voiceNote.findMany({
    where: { username },
  })
}

export async function deleteVoiceNoteByUsername(
  username: VoiceNote["username"]
) {
  return prisma.voiceNote.delete({
    where: { username },
  })
}

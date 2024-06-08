import type { User, VoiceNote } from "@prisma/client"

import { prisma } from "~/db.server"

export async function getVoiceNotesByUsername(username: User["username"]) {
  return prisma.voiceNote.findFirst({
    where: { provider: { user: { username } } },
  })
}

export async function deleteVoiceNoteById(
  id: VoiceNote["id"]
) {
  return prisma.voiceNote.delete({
    where: { id },
  })
}

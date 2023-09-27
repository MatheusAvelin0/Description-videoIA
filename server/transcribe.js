import { pipeline } from "@xenova/transformers"
import { transcriptionExample } from "./utils/transcription.js";
export async function transcribe(audio) {
  

try {
  //return transcriptionExample


  console.log('Realizando a transcrição')
  const transcribe = await pipeline(
    "automatic-speech-recognition", 
  "Xenova/whisper-small"
  )

  const transcription = await transcribe(audio, {
    chunk_leght_s: 30,
    stride_leght_s: 5,
    languages: "portuguese",
      task: "transcribe"
  })

  console.log("transcrição finalizada com sucesso...")
  return transcription?.text.replace("[Música]", "")
} catch (error) {
  throw new Error(error)
}

}
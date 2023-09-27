import ydtl from "ytdl-core"
import fs from "fs"


export const download = (videosId)  => new Promise((resolve, reject) =>  {
  const videoURL = "https://youtube.com/shorts/" + videosId
  console.log("Realizando o download do video: ", videosId)

ydtl(videoURL, {quality: "lowestaudio", filter: "audioonly"})
.on("info", 
(info) => {
  const seconds = info.formats[0].approxDurationMs / 1000
  

  if (seconds > 60) {
    throw new Error("A duração desse video é maior que 60 segundos")
  }
}
).on("end", () =>   {
  console.log("download do video finalizado")
  resolve()
})
.on("error", (error) => {
console.log("Não foi possivel fazer o download do video. detalhes do erro:",
  error
)
reject(error)
}).pipe(fs.createWriteStream("./tmp/audio.mp4"))


})  

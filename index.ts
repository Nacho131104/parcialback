import cors from "cors"
import express from "express"

const app = express()
const puerto = 3000


type LD = {
    id: number,
    filmName: string,
    rotationType: string,
    region: string,
    lengthMinutes: number,
    videoFormat: string
}


let LDS = [
    {id:1,filmName:"Primera",rotationType: "CLV",region:"España",lenghtMinutes:23,videoFomart:"PAL"},
    {id:2,filmName:"xd",rotationType: "CAL",region:"Francia",lenghtMinutes:18,videoFomart:"NTSC"},
    {id:3,filmName:"Tercera",rotationType: "CAL",region:"Marruecos",lenghtMinutes:23,videoFomart:"PAL"}
]

app.use(cors())
app.use(express.json())


//ruta para todos los discos
app.get("/ld",(req,res)=>{
    return res.status(200).json(LDS)
})


app.get("/id/:id",(req,res)=>{
    const id = req.params.id
    if(id == undefined) return res.status(400).send("Error, se necesita un id")

    const disco = LDS.filter((disc)=> disc.id.toString() === id)
    if(!disco) return res.status(404).send("Error, dispositivo no encontrado")

    return res.status(200).json(disco)
})

app.post("/ld",(req,res)=>{
    const {filmName,rotationType,region,lenghtMinutes,videoFomart} = req.body

    //al añadir uno siempre tendra el id del tamaño +1
    const nuevoId = LDS.length +1 

    //hay que tener todos los parametros para poder añadir un ld
    if(!filmName || !rotationType || !region || !lenghtMinutes || !videoFomart){
        return res.status(400).send("Error, se necesitan todos los parametros")
    }

    //los tipos rotationType y videoFormat solo tienen dos opciones
    if(rotationType.toUpperCase() != "CAV" && rotationType.toUpperCase() != "CLV"){
        return res.status(404).send("Error, tipo de rotationType no disponible")
    }
    if(videoFomart.toUpperCase() !="NTSC" && videoFomart.toUpperCase() !="PAL"){
        return res.status(404).send("Error,tipo de videoFormat no disponible")
    }

    const nuevoLd = {
        id:nuevoId,
        ...req.body
    }

    LDS.push(nuevoLd)
    return res.status(200).json(nuevoLd)

})

app.listen(puerto, () => {
    console.log("Server started at port " + puerto)
})
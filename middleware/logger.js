const  {format} = require('date-fns')
const {v4:uuid} = require('uuid')
const fs = require('fs')
const path = require('path')
const fsPromises = require('fs').promises 

const logEvents = async(message, logFileName) => {
    const dateTime = `${format(new Date(), "yyyyMMdd HH:mm:ss.SSS")}`
    const logItem = `${dateTime} - ${uuid()} - ${message}\n`

    try {
        if(!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'))
        }
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFileName), logItem)
    } catch (error) {  
        console.log(error)
    }
}

const logger = (req, res, next) => {    
    logEvents(`${req.method} ${req.url} ${req.headers.origin}`, `reqLog.log`)
    console.log(`${req.method} ${req.path}`)
    next()

}    

module.exports = {logEvents, logger}
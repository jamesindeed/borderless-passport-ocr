import express from 'express'
import * as mindee from 'mindee'
import fs from 'fs'
import path from 'path'
import * as dotenv from 'dotenv'

dotenv.config()

type PassportInfo = {
  birthDate: string
  expiryDate: string
}

const client = new mindee.Client({
  apiKey: process.env.MINDEE_API_KEY,
})

const app = express()
const port = 3000

app.get('/extract-passport-info/:passportImagePath(*)', async (req, res) => {
  const passportImagePath = req.params.passportImagePath

  try {
    const isPassportImageExists = fs.existsSync(passportImagePath)

    if (!isPassportImageExists) {
      console.error(`Passport image '${passportImagePath}' does not exist.`)
      res
        .status(404)
        .send(`Passport image '${passportImagePath}' does not exist.`)
      return
    }

    const passportImageExt = path.extname(passportImagePath)

    if (passportImageExt !== '.jpg' && passportImageExt !== '.jpeg') {
      console.error(
        `Passport image '${passportImagePath}' must be a JPEG file.`
      )
      res
        .status(400)
        .send(`Passport image '${passportImagePath}' must be a JPEG file.`)
      return
    }

    // * Not sure if Mindee provides the return type for this
    const apiResponse = await client
      .docFromPath(passportImagePath)
      .parse(mindee.PassportV1)

    if (apiResponse.document === undefined) {
      console.error(`Failed to get passport data from '${passportImagePath}'.`)
      res
        .status(500)
        .send(`Failed to get passport data from '${passportImagePath}'.`)
      return
    }

    const birthDate = apiResponse.document.birthDate.value
    const expiryDate = apiResponse.document.expiryDate.value

    console.log('Date of Birth:', birthDate)
    console.log('Expiry Date:', expiryDate)

    const passportInfo: PassportInfo = { birthDate, expiryDate }

    res.send(passportInfo)
  } catch (error) {
    console.error(
      `An error occurred while extracting passport data from '${passportImagePath}':`,
      error
    )
    res
      .status(500)
      .send(
        `An error occurred while extracting passport data from '${passportImagePath}'.`
      )
    return
  }
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})

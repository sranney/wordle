// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next'
import pickNewWord from '../../backend-operations/pick-new-word'

/**
 * api endpoint is run on a cron schedule set up in github actions (see .github/workflows)
 * @param {NextApiRequest} req 
 * @param {NextApiResponse} res 
 */
export default async function handler(
  req,
  res,
) {
  if (req.method === 'POST') {
    try {
      const { authorization } = req.headers

      if (authorization === `Bearer ${process.env.AUTH_TOKEN_SELECT_NEW_WORD}`) {
        pickNewWord()
        res.status(200).json({ success: true })
      } else {
        res.status(401).json({ success: false })
      }
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next'
import submitGuess from '../../backend-operations/submit-guess'

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
      submitGuess(req.body.guess)
      res.status(200).json({ success: true })
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}

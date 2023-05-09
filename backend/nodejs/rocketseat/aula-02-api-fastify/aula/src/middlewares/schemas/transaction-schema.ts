import { FastifyRequest } from 'fastify'
import { z } from 'zod'

export const transactionSchema = (request: FastifyRequest) => {
  const createTransactionBodySchema = z.object({
    title: z.string(),
    amount: z.number(),
    type: z.enum(['credit', 'debit']),
  })

  return createTransactionBodySchema.parse(request.body)
}

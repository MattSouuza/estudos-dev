import { FastifyRequest } from 'fastify'
import { z } from 'zod'

export const transactionParamsSchema = async (request: FastifyRequest) => {
  const transactionParamsSchema = z.object({
    id: z.string().uuid(),
  })

  return transactionParamsSchema.parse(request.params)
}

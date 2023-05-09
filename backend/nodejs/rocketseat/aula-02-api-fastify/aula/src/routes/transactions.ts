import { FastifyInstance } from 'fastify'
import { transactionSchema } from '../middlewares/schemas/transaction-schema'
import { knex } from '../database'
import { randomUUID } from 'crypto'
import { transactionParamsSchema } from '../middlewares/schemas/transaction-params-schema'
import { checkSessionIdExists } from '../middlewares/check-session-id-exists'

// 'plugin' do fastify
export async function transactionsRoutes(app: FastifyInstance) {
  app.get('/', async (request, reply) => {
    const sessionId = await checkSessionIdExists(request, reply)

    const transactions = await knex('transactions')
      .where('session_id', sessionId)
      .select()

    return { transactions }
  })

  app.get('/:id', async (request, reply) => {
    const sessionId = await checkSessionIdExists(request, reply)

    const { id } = await transactionParamsSchema(request)

    const transaction = await knex('transactions')
      .where('id', id)
      .where('session_id', sessionId)
      .first()

    return { transaction }
  })

  app.get('/summary', async (request, reply) => {
    const sessionId = await checkSessionIdExists(request, reply)

    const summaryAmount = await knex('transactions')
      .where('session_id', sessionId)
      .sum('amount', { as: 'amount' })
      .first()

    return { summaryAmount }
  })

  app.post('/', async (request, reply) => {
    const { title, amount, type } = transactionSchema(request)

    let sessionId = request.cookies.sessionId

    if (!sessionId) {
      sessionId = randomUUID()

      reply.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      })
    }

    await knex('transactions').insert({
      id: randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
      session_id: sessionId,
    })

    return reply.status(201).send()
  })
}

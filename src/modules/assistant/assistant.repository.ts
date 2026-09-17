import { prisma } from '../../config/prisma.js';

const MAX_STORED_EXCHANGES = 20;

export async function saveAssistantExchange(question: string, answer: string) {
  await prisma.$transaction(async (tx) => {
    await tx.assistantExchange.create({
      data: {
        question,
        answer,
      },
    });

    const outdated = await tx.assistantExchange.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      skip: MAX_STORED_EXCHANGES,
      select: {
        id: true,
      },
    });

    if (outdated.length === 0) {
      return;
    }

    await tx.assistantExchange.deleteMany({
      where: {
        id: {
          in: outdated.map((exchange) => exchange.id),
        },
      },
    });
  });
}

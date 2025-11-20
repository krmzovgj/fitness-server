import { Prisma } from '@prisma/client';

export function removePasswordMiddleware() {
  return Prisma.defineExtension({
    result: {
      user: {
        password: {
          needs: {},
          compute() {
            return undefined;
          },
        },
      },
    },
  });
}

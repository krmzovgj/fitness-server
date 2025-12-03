import { Prisma } from "src/generated/client/client";

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

import { NextRequest, NextResponse } from 'next/server';

export type NextFunction = () => void;
export type Middleware = (
  request: NextRequest,
  next: NextFunction,
  params?: any
) => Promise<NextResponse | void>;

export const handler =
  (...middleware: Middleware[]) =>
  async (request: NextRequest, {params}: {params: any}) => {
    let result;

    for (let i = 0; i < middleware.length; i++) {
      let nextInvoked = false;

      const next = async () => {
        nextInvoked = true;
      };

      result = await middleware[i](request, next, params);

      if (!nextInvoked) {
        break;
      }
    }

    if (result) return result;

    throw new Error('Your handler or middleware must return a NextResponse!');
  };
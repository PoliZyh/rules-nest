import { LoggerRequestMiddleware } from './logger-request.middleware';

describe('LoggerRequestMiddleware', () => {
  it('should be defined', () => {
    expect(new LoggerRequestMiddleware()).toBeDefined();
  });
});

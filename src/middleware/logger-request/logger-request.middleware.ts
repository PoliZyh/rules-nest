import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LoggerRequestMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const logMessage = `
      请求时间: ${new Date().toISOString()}
      请求URL: ${req.originalUrl}
      请求方法: ${req.method}
      请求参数: ${JSON.stringify(req.body)}
      查询参数: ${JSON.stringify(req.query)}
      路径参数: ${JSON.stringify(req.params)}
    `;

    // 指定日志文件夹和日志文件名
    const logFolder = path.resolve(__dirname, '../../../', 'logs');

    if (!fs.existsSync(logFolder)) {
      fs.mkdirSync(logFolder);  // 如果文件夹不存在，创建文件夹
    }

    const logFile = path.join(logFolder, 'request-log.txt');

    // 写入日志到文件
    fs.appendFileSync(logFile, logMessage + '\n\n', 'utf8');

    // 继续执行请求
    next();
  }
}

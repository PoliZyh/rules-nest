

import { Injectable, NestInterceptor, CallHandler, ExecutionContext } from "@nestjs/common";
import { map, Observable, catchError, throwError } from "rxjs";


interface data<T> {
    data: T
}

@Injectable()
export class Response<T = any> implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<data<T>> {
        return next.handle().pipe(map(data => {
            return {
                data,
                status: 0,
                success: true,
                message: '返回成功',
                code: 200
            }
        }), catchError(error => {
            const response = {
                data: null,
                status: -1,
                success: false,
                message: error.message || '请求失败'
            };
            return throwError(() => response);
        }))

    }
}
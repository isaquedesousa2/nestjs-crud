import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";


export class LogInterceptor implements NestInterceptor {

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        
        return next.handle().pipe(tap(() => {
            const dt = Date.now()
            console.log(`Execução levou: ${Date.now() - dt} milisegundos`)
        }))
    }
}
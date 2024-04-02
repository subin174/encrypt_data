import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // log the request
    // console.log("ResponseInterceptor: " + context.switchToHttp().getRequest().url);
    return next.handle().pipe(
      map((data) => (this.buildResp(data))),
    );
  }

  buildResp(obj:any){
    if(obj?.status === 'ERROR') return obj;
    let resp:any = {
      status: 'SUCCESS'
    };
    if(obj?.data){
      resp.data = obj.data;
    }else{
      resp.data = obj;
    }
    if(obj?.paginate){
      resp.paginate = obj.paginate;
    }
    // fix
    if(obj?.content)
      return obj;
    if(obj?.bgmode){
      resp.data = {
        status:obj.status,
        content:obj.bgmode
      };
    }
    return resp;
  }
}

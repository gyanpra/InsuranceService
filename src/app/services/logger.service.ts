import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor() { }

  log(msg:any){
    let msgForLog = new Date() + " "+ msg;
    console.log(msgForLog);
  }
}

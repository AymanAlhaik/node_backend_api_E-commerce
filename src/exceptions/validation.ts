import { ErrorCode, HttpException } from "./root";

export class UnprocessableEntity extends HttpException{
    constructor(errors:any, message:string, errorCode:ErrorCode){
        super(message, errorCode, 422, errors )
    }
}
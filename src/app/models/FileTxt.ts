export class FileTxt{
    id:number=0;
    base64:string = "";
    name:string = "";

    constructor(name:string, base64:string, id:number = 0)
    {
        this.name = name;
        this.base64 = base64;
    }
}
export class UserDto {
  id:number;
  // name:string;
  // firstName:string;
  // lastName:string;
  // role:string;
  // iss:string;
  // avatar:string;
  exp:number;
  // email:string;
  // presenterId:number;
  token:string;

  constructor(data:any,token:string){
    this.id = Number(data.sub);
    // this.firstName = data.firstName;
    // this.lastName = data.lastName;
    // this.name = data.lastName + ' ' + data.firstName;
    // this.role = data.role;
    // this.iss = data.iss;
    // this.avatar = data.avatar;
    // this.email = data.email;
    // this.firstName = data.firstName;
    this.exp = data.exp;
    // this.presenterId = data.presenterId;
    this.token = token;
  }
}

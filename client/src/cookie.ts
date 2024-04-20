import Cookie  from "universal-cookie";

const newcookie = new Cookie();

export default function setcookie (token:string):void{
    newcookie.set('jwt',token);
}
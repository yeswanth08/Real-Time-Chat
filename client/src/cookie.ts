import Cookie  from "universal-cookie";

const newcookie = new Cookie();

export default function setcookie (token:string):void{
    try{
        newcookie.set('jwt',token);
    }catch(err){
        console.log(err);
    }
}
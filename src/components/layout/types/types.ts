import type { ReactElement } from "react"

export interface userMenuProps{
  signIn:()=>void,
  signUp:()=>void,
  logOut:()=>void
}
export interface logoButtonProps{
  handleClick:()=>void
}
export interface contactType{
  text:string,
  icon:ReactElement
}
export interface iconsType{
  link:string,
  icon:ReactElement
}
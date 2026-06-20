import type { ReactElement } from "react"

export interface categoryItemProps{
  category:string,
  imgUrl:string
}
export interface specificationCardProps{
  icon:ReactElement,
  title:string,
  text:string,
  bgColor:string,
  border:string,
  color:string,

}
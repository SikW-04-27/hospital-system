export interface hospitalInfoType {
  id: number
  hospName: string
  hospPhone: string
  hospAddress: string
  hospIntroduce: string
  hospLevel: string
}

export interface departInfoType {
  id: number
  hospId: number
  departName: string
  createTime: string
  updateTime: string
}

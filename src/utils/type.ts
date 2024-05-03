export interface hospitalInfoType {
  id: number
  hospName: string
  hospPhone: string
  hospAddress: string
  hospIntroduce: string
  hospLevel: string
  createTime: string
}

export interface departInfoType {
  id: number
  hospId: number
  departName: string
  createTime: string
  updateTime: string
}

export interface appointmentType {
  id: number
  departmentId: number
  doctorName: string
  doctorIntroduce: string
  doctorPro: string
  scheDate: string
  scheNumber: number
  scheMoney: number
  createTime: string
  updateTime: string
  deleted: number
}

export interface userAppointmentRecordType {
  departmentName: string
  doctorName: string
  id: number
  resMoney: number
  resStatus: number
  userName: string
  visitorDate: string
  visitorName: string
}

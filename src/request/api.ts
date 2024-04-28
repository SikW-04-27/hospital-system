import { del, get, patch, post, responseType } from './http'
import * as pageInfo from './api/pageInfo'

export function getHospitals(data: any) {
  return post('hos/hosp/showHosp', data).then((res) => {
    return res.data
  })
}

export function getDepart(data?: any) {
  return post('/hos/depart/showDepart', data).then((res) => {
    return res.data
  })
}

export function getHospById(id?: any) {
  return get(`/hos/hosp/showHospById/${id}`).then((res) => {
    return res.data
  })
}

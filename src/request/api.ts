import { get, post } from './http'

export function login(data: any) {
  return post('/hos/user/login', data).then((res) => {
    return res.data
  })
}

export function getCode() {
  return get('/hos/user/getCode').then((res) => {
    return res.data
  })
}

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

export function getSchedule(data?: any) {
  return post(`/hos/schedule/showSchedule`, data).then((res) => {
    return res.data
  })
}

export function addOrder(data?: any) {
  return post(`/hos/order/addOrder`, data).then((res) => {
    return res.data
  })
}

export function cancelOrder(id?: any) {
  return get(`/hos/order/cancelOrder/${id}`).then((res) => {
    return res.data
  })
}

export function getUserOrder(data?: any) {
  return post(`/hos/order/showOrderByUserId`, data).then((res) => {
    return res.data
  })
}

export function delHosp(ids: string) {
  return get(`hos/hosp/delHosp/${ids}`).then((res) => {
    return res.data
  })
}

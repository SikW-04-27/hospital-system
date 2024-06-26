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

export function getDepartment(data?: any) {
  return post('/hos/department/showDepartment', data).then((res) => {
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

export function editHosp(data?: any) {
  return post(`hos/hosp/editHosp`, data).then((res) => {
    return res.data
  })
}

export function exportHosp(ids?: string) {
  return get(`/hos/dict/hos/exportHosp/${ids}`).then((res) => {
    return res.data
  })
}

export function exportDepartment(ids?: string) {
  return get(`/hos/dict/hos/exportDepartment/${ids}`).then((res) => {
    return res.data
  })
}

export function exportSchedule(ids?: string) {
  return get(`/hos/dict/hos/exportSchedule/${ids}`).then((res) => {
    return res.data
  })
}

export function getAllUser(data?: any) {
  return post(`/hos/user/showUser`, data).then((res) => {
    return res.data
  })
}

export function delSchedule(ids: string) {
  return get(`/hos/schedule/delSchedule/${ids}`).then((res) => {
    return res.data
  })
}

export function editDepartment(data?: any) {
  return post(`/hos/department/editDepartment`, data).then((res) => {
    return res.data
  })
}

export function delDepartment(ids: string) {
  return get(`/hos/department/delDepartment/${ids}`).then((res) => {
    return res.data
  })
}

export function getAllOrder(data?: any) {
  return post(`/hos/order/showOrderByUserId`, data).then((res) => {
    return res.data
  })
}

export function countOrder(data?: any) {
  return post(`/hos/order/countOrder`, data).then((res) => {
    return res.data
  })
}
export function showMessage(data?: any) {
  return post(`/hos/order/showMessage`, data).then((res) => {
    return res.data
  })
}

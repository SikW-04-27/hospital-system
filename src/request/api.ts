import { del, get, patch, post, responseType } from './http'
import * as pageInfo from './api/pageInfo'

export function getHospitals(data: any) {
  return post('hos/hosp/showHosp', data).then((res) => {
    return res.data
  })
}

export function getAllPages(data?: any) {
  return get('pageInfo', data).then((res) => {
    return res.data
  })
}

export function getOnePage(id?: string) {
  return get(`pageInfo/page/${id}`).then((res) => {
    return res.data
  })
}

export function updatePageInfo(id: number, data: any) {
  return patch(`pageInfo/${id}`, data).then((res) => {
    return res.data
  })
}

export function removeOnePage(id: number) {
  return del(`pageInfo/${id}`).then((res) => {
    return res.data
  })
}

export function getUserPages(params: any) {
  return get(`pageInfo/getUserPages`, params).then((res) => {
    return res.data
  })
}

export function login(data: any) {
  return post('user/login', data).then((res) => {
    return res.data
  })
}

export function register(data: any) {
  return post('user/register', data).then((res) => {
    return res.data
  })
}

export function findCollaborator(params: any) {
  return get('pageInfo/collaborators', params).then((res) => {
    return res.data
  })
}

export function addCollaborator(data: any) {
  return post('pageInfo/addCollaborator', data).then((res) => {
    return res.data
  })
}

export function removeCollaborator(data: any) {
  return post('pageInfo/removeCollaborator', data).then((res) => {
    return res.data
  })
}

export function updateUserInfo(data: any) {
  return post('user/updateUserInfo', data).then((res) => {
    return res.data
  })
}

export function getDSLWithTag(tag: string) {
  return get(`pageInfo/getDSLWithTag/${tag}`).then((res) => {
    return res.data
  })
}

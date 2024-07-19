// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** Tugas List Get All Tugass
:return: GET /api/v1/tugas/tugas */
export async function tugasListApiV1TugasTugasGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.tugasListApiV1TugasTugasGetParams,
  options?: { [key: string]: any },
) {
  return request<API.TugasListData>('/api/v1/tugas/tugas', {
    method: 'GET',
    params: {
      // pageSize has a default value: 10
      pageSize: '10',
      // current has a default value: 1
      current: '1',

      ...params,
    },
    ...(options || {}),
  });
}

/** Tugas Add Tugas Add
:param post: CreateTugas
:return: POST /api/v1/tugas/tugas */
export async function tugasAddApiV1TugasTugasPost(
  body: API.CreateTugas,
  options?: { [key: string]: any },
) {
  return request<any>('/api/v1/tugas/tugas', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Data Sub Project GET /api/v1/tugas/tugas/data-subproject */
export async function dataSubprojectApiV1TugasTugasDataSubprojectGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.dataSubprojectApiV1TugasTugasDataSubprojectGetParams,
  options?: { [key: string]: any },
) {
  return request<any>('/api/v1/tugas/tugas/data-subproject', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** Data Gantt Task GET /api/v1/tugas/tugas/gantt-task */
export async function ganttTaskApiV1TugasTugasGanttTaskGet(options?: { [key: string]: any }) {
  return request<any>('/api/v1/tugas/tugas/gantt-task', {
    method: 'GET',
    ...(options || {}),
  });
}

/** Hapus Data Hapus Data
:param req:
:return: DELETE /api/v1/tugas/tugas/hapus-data */
export async function hapusDataApiV1TugasTugasHapusDataDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.hapusDataApiV1TugasTugasHapusDataDeleteParams,
  options?: { [key: string]: any },
) {
  return request<any>('/api/v1/tugas/tugas/hapus-data', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** Data Project GET /api/v1/tugas/tugas/project */
export async function projectApiV1TugasTugasProjectGet(options?: { [key: string]: any }) {
  return request<any>('/api/v1/tugas/tugas/project', {
    method: 'GET',
    ...(options || {}),
  });
}

/** Update Tugas Update tugas information
:param post:
:return: PUT /api/v1/tugas/tugas/update */
export async function tugasUpdateApiV1TugasTugasUpdatePut(
  body: API.UpdateTugas,
  options?: { [key: string]: any },
) {
  return request<any>('/api/v1/tugas/tugas/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

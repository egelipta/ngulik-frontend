// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** Permission query Get all permissions
:return: GET /api/v1/admin/access */
export async function getAllAccessApiV1AdminAccessGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAllAccessApiV1AdminAccessGetParams,
  options?: { [key: string]: any },
) {
  return request<any>('/api/v1/admin/access', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** Permission settings Set role permission
:param post:
:return: PUT /api/v1/admin/access */
export async function setRoleAccessApiV1AdminAccessPut(
  body: API.SetAccess,
  options?: { [key: string]: any },
) {
  return request<API.BaseResp>('/api/v1/admin/access', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 权限创建 创建权限
:param post: CreateAccess
:return: POST /api/v1/admin/access */
export async function createAccessApiV1AdminAccessPost(
  body: API.CreateAccess,
  options?: { [key: string]: any },
) {
  return request<API.BaseResp>('/api/v1/admin/access', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

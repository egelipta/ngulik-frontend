// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** Corner list Corner list
:param role_status:
:param pageSize:
:param current:
:param role_name:
:param create_time:
:return: GET /api/v1/admin/role */
export async function getAllRoleApiV1AdminRoleGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAllRoleApiV1AdminRoleGetParams,
  options?: { [key: string]: any },
) {
  return request<API.RoleList>('/api/v1/admin/role', {
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

/** Role modification Update role
:param post:
:return: PUT /api/v1/admin/role */
export async function updateRoleApiV1AdminRolePut(
  body: API.UpdateRole,
  options?: { [key: string]: any },
) {
  return request<any>('/api/v1/admin/role', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Character add Creating a Role
:param post: CreateRole
:return: POST /api/v1/admin/role */
export async function createRoleApiV1AdminRolePost(
  body: API.CreateRole,
  options?: { [key: string]: any },
) {
  return request<any>('/api/v1/admin/role', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Character delete Delete the role
:param role_id:
:return: DELETE /api/v1/admin/role */
export async function deleteRoleApiV1AdminRoleDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteRoleApiV1AdminRoleDeleteParams,
  options?: { [key: string]: any },
) {
  return request<any>('/api/v1/admin/role', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** All characters are dedicated to pull off options GET /api/v1/admin/role/all */
export async function allRolesOptionsApiV1AdminRoleAllGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.allRolesOptionsApiV1AdminRoleAllGetParams,
  options?: { [key: string]: any },
) {
  return request<any>('/api/v1/admin/role/all', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

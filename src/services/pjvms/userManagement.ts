// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** user list Get all administrators
:return: GET /api/v1/admin/user */
export async function userListApiV1AdminUserGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.userListApiV1AdminUserGetParams,
  options?: { [key: string]: any },
) {
  return request<API.UserListData>('/api/v1/admin/user', {
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

/** User modification Update user information
:param post:
:return: PUT /api/v1/admin/user */
export async function userUpdateApiV1AdminUserPut(
  body: API.UpdateUser,
  options?: { [key: string]: any },
) {
  return request<any>('/api/v1/admin/user', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** User add Create users
:param post: CreateUser
:return: POST /api/v1/admin/user */
export async function userAddApiV1AdminUserPost(
  body: API.CreateUser,
  options?: { [key: string]: any },
) {
  return request<any>('/api/v1/admin/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** User delete delete users
:param req:
:param user_id: int
:return: DELETE /api/v1/admin/user */
export async function userDelApiV1AdminUserDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.userDelApiV1AdminUserDeleteParams,
  options?: { [key: string]: any },
) {
  return request<any>('/api/v1/admin/user', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** User access record Query current user access record
:param req:
:return: GET /api/v1/admin/user/access/log */
export async function getAccessLogApiV1AdminUserAccessLogGet(options?: { [key: string]: any }) {
  return request<any>('/api/v1/admin/user/access/log', {
    method: 'GET',
    ...(options || {}),
  });
}

/** user login user login
:param req:
:param post:
:return: jwt token POST /api/v1/admin/user/account/login */
export async function accountLoginApiV1AdminUserAccountLoginPost(
  body: API.AccountLogin,
  options?: { [key: string]: any },
) {
  return request<API.UserLogin>('/api/v1/admin/user/account/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Avatar modification Avatar upload
:param req:
:param avatar:
:return: PUT /api/v1/admin/user/avatar/upload */
export async function avatarUploadApiV1AdminUserAvatarUploadPut(
  body: API.BodyAvatarUploadApiV1AdminUserAvatarUploadPut,
  avatar?: File,
  options?: { [key: string]: any },
) {
  const formData = new FormData();

  if (avatar) {
    formData.append('avatar', avatar);
  }

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele];

    if (item !== undefined && item !== null) {
      if (typeof item === 'object' && !(item instanceof File)) {
        if (item instanceof Array) {
          item.forEach((f) => formData.append(ele, f || ''));
        } else {
          formData.append(ele, JSON.stringify(item));
        }
      } else {
        formData.append(ele, item);
      }
    }
  });

  return request<any>('/api/v1/admin/user/avatar/upload', {
    method: 'PUT',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

/** Data User GET /api/v1/admin/user/data-user */
export async function getDataUserApiV1AdminUserDataUserGet(options?: { [key: string]: any }) {
  return request<any>('/api/v1/admin/user/data-user', {
    method: 'GET',
    ...(options || {}),
  });
}

/** Get the current user information Get the current login user information
:return: GET /api/v1/admin/user/info */
export async function userInfoApiV1AdminUserInfoGet(options?: { [key: string]: any }) {
  return request<API.CurrentUser>('/api/v1/admin/user/info', {
    method: 'GET',
    ...(options || {}),
  });
}

/** Basic user information modification edit personal information
:param req:
:param post:
:return: PUT /api/v1/admin/user/info */
export async function updateUserInfoApiV1AdminUserInfoPut(
  body: API.UpdateUserInfo,
  options?: { [key: string]: any },
) {
  return request<any>('/api/v1/admin/user/info', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** User mobile phone number modification Modify the binding mobile phone number
:param req:
:param post:
:return: PUT /api/v1/admin/user/modify/mobile */
export async function updateUserInfoApiV1AdminUserModifyMobilePut(
  body: API.ModifyMobile,
  options?: { [key: string]: any },
) {
  return request<any>('/api/v1/admin/user/modify/mobile', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Photo real cuy POST /api/v1/admin/user/photo/upload_tes */
export async function downloadImageApiV1AdminUserPhotoUploadTesPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.downloadImageApiV1AdminUserPhotoUploadTesPostParams,
  options?: { [key: string]: any },
) {
  return request<any>('/api/v1/admin/user/photo/upload_tes', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** Role Assignments Role Assignments
:param post:
:return: PUT /api/v1/admin/user/set/role */
export async function setRoleApiV1AdminUserSetRolePut(
  body: API.SetRole,
  options?: { [key: string]: any },
) {
  return request<any>('/api/v1/admin/user/set/role', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** Home Home
:param request:
:return: GET / */
export async function homeGet(options?: { [key: string]: any }) {
  return request<string>('/', {
    method: 'GET',
    ...(options || {}),
  });
}

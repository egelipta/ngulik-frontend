// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** Get Heatmap List GET /api/v1/heat_map/heat_map/heat-map */
export async function getHeatmapListApiV1HeatMapHeatMapHeatMapGet(options?: {
  [key: string]: any;
}) {
  return request<any>('/api/v1/heat_map/heat_map/heat-map', {
    method: 'GET',
    ...(options || {}),
  });
}

/** Get Heatmap Datacenter List GET /api/v1/heat_map/heat_map/heat-map-datacenter */
export async function getHeatmapDatacenterListApiV1HeatMapHeatMapHeatMapDatacenterGet(options?: {
  [key: string]: any;
}) {
  return request<any>('/api/v1/heat_map/heat_map/heat-map-datacenter', {
    method: 'GET',
    ...(options || {}),
  });
}

/** Get Heatmap Lantai1 List GET /api/v1/heat_map/heat_map/heat-map-lantai1 */
export async function getHeatmapLantai1ListApiV1HeatMapHeatMapHeatMapLantai1Get(options?: {
  [key: string]: any;
}) {
  return request<any>('/api/v1/heat_map/heat_map/heat-map-lantai1', {
    method: 'GET',
    ...(options || {}),
  });
}

/** Get Heatmap Lantai2 List GET /api/v1/heat_map/heat_map/heat-map-lantai2 */
export async function getHeatmapLantai2ListApiV1HeatMapHeatMapHeatMapLantai2Get(options?: {
  [key: string]: any;
}) {
  return request<any>('/api/v1/heat_map/heat_map/heat-map-lantai2', {
    method: 'GET',
    ...(options || {}),
  });
}

/** Get Heatmap Lantai3 List GET /api/v1/heat_map/heat_map/heat-map-lantai3 */
export async function getHeatmapLantai3ListApiV1HeatMapHeatMapHeatMapLantai3Get(options?: {
  [key: string]: any;
}) {
  return request<any>('/api/v1/heat_map/heat_map/heat-map-lantai3', {
    method: 'GET',
    ...(options || {}),
  });
}

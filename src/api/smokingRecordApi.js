// src/api/smokingRecordApi.js
import baseApi from './baseApi';
import API_PATHS from './apiPaths';

// Lấy record hiện tại
export const getCurrentSmokingRecord = (customerId) => {
  return baseApi
    .get(API_PATHS.SMOKING_RECORD_CURRENT(customerId))
    .then((res) => res.data.result ?? res.data);
};

// Lấy lịch sử
export const getSmokingHistory = (customerId) => {
  return baseApi
    .get(API_PATHS.SMOKING_RECORD_HISTORY(customerId))
    .then((res) => res.data.result ?? res.data);
};

// Tạo record mới (POST)
export const createSmokingRecord = (data) => {
  return baseApi
    .post(API_PATHS.SMOKING_RECORD, data)
    .then((res) => res.data.result ?? res.data);
};

// Cập nhật record (PUT)
export const updateSmokingRecord = (id, data) => {
  return baseApi
    .put(API_PATHS.SMOKING_RECORD_ID(id), data)
    .then((res) => res.data.result ?? res.data);
};

// Xoá record (DELETE)
export const deleteSmokingRecord = (id) => {
  return baseApi
    .delete(API_PATHS.SMOKING_RECORD_ID(id))
    .then((res) => res.data.result ?? res.data);
};

// Ghi nhận quit (PATCH, không cần body)
export const patchQuitSmoking = (id) => {
  return baseApi
    .patch(API_PATHS.SMOKING_RECORD_QUIT(id))
    .then((res) => res.data.result ?? res.data);
};

// Lấy chi tiết 1 record (GET by id)
export const getSmokingRecordById = (id) => {
  return baseApi
    .get(API_PATHS.SMOKING_RECORD_ID(id))
    .then((res) => res.data.result ?? res.data);
};

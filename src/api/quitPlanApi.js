// src/api/quitPlanApi.js
import baseApi from './baseApi';
import API_PATHS from './apiPaths';

// Danh sách các hàm gọi API tương ứng
export const createQuitPlan = (data) =>
  baseApi.post(API_PATHS.QUITPLAN, data).then(res => res.data.result ?? res.data);

export const getMyQuitPlans = () =>
  baseApi.get(API_PATHS.QUITPLAN_MY_PLANS).then(res => res.data.result ?? res.data);

export const getQuitPlanById = (id) =>
  baseApi.get(API_PATHS.QUITPLAN_ID(id)).then(res => res.data.result ?? res.data);

export const updateQuitPlan = (id, data) =>
  baseApi.put(API_PATHS.QUITPLAN_ID(id), data).then(res => res.data.result ?? res.data);

export const deleteQuitPlan = (id) =>
  baseApi.delete(API_PATHS.QUITPLAN_ID(id)).then(res => res.data.result ?? res.data);

export const startQuitPlan = (id) =>
  baseApi.post(API_PATHS.QUITPLAN_START(id)).then(res => res.data.result ?? res.data);

export const pauseQuitPlan = (id) =>
  baseApi.post(API_PATHS.QUITPLAN_PAUSE(id)).then(res => res.data.result ?? res.data);

export const resumeQuitPlan = (id) =>
  baseApi.post(API_PATHS.QUITPLAN_RESUME(id)).then(res => res.data.result ?? res.data);

export const completeQuitPlan = (id) =>
  baseApi.post(API_PATHS.QUITPLAN_COMPLETE(id)).then(res => res.data.result ?? res.data);

export const failQuitPlan = (id) =>
  baseApi.post(API_PATHS.QUITPLAN_FAIL(id)).then(res => res.data.result ?? res.data);

export const getQuitPlanStatistics = (id) =>
  baseApi.get(API_PATHS.QUITPLAN_STATISTICS(id)).then(res => res.data.result ?? res.data);

export const getRecommendedQuitPlans = () =>
  baseApi.get(API_PATHS.QUITPLAN_RECOMMENDED).then(res => res.data.result ?? res.data);

// Phases
export const getQuitPlanPhases = (planId) =>
  baseApi.get(API_PATHS.QUITPLAN_PHASES(planId)).then(res => res.data.result ?? res.data);

export const createQuitPlanPhase = (planId, data) =>
  baseApi.post(API_PATHS.QUITPLAN_PHASES(planId), data).then(res => res.data.result ?? res.data);

export const updateQuitPlanPhase = (phaseId, data) =>
  baseApi.put(API_PATHS.QUITPLAN_PHASE_ID(phaseId), data).then(res => res.data.result ?? res.data);

export const deleteQuitPlanPhase = (phaseId) =>
  baseApi.delete(API_PATHS.QUITPLAN_PHASE_ID(phaseId)).then(res => res.data.result ?? res.data);

export const postPhaseStatus = (phaseId, data) =>
  baseApi.post(API_PATHS.QUITPLAN_PHASE_STATUS(phaseId), data).then(res => res.data.result ?? res.data);

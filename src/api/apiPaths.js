// src/api/apiPaths.js
const API_PATHS = {
  // Auth
  LOGIN: '/api/v1/Auth/login',
  REGISTER_CUSTOMER: '/api/v1/Auth/register-customer',
  PROFILE: '/api/v1/Auth/profile',

  // SmokingRecord
  SMOKING_RECORD: '/api/v1/SmokingRecord',
  SMOKING_RECORD_ID: (id) => `/api/v1/SmokingRecord/${id}`,
  SMOKING_RECORD_CURRENT:`/api/v1/SmokingRecord/current`,
  SMOKING_RECORD_HISTORY: (customerId) => `/api/v1/SmokingRecord/history/${customerId}`,
  SMOKING_RECORD_QUIT: (id) => `/api/v1/SmokingRecord/${id}/quit`,
  // QuitPlan
  QUITPLAN: '/api/v1/QuitPlan',
  QUITPLAN_ID: (planId) => `/api/v1/QuitPlan/${planId}`,
  QUITPLAN_MY_PLANS: '/api/v1/QuitPlan/my-plans',
  QUITPLAN_RECOMMENDED: '/api/v1/QuitPlan/recommended',
  QUITPLAN_STATISTICS: (planId) => `/api/v1/QuitPlan/${planId}/statistics`,
  QUITPLAN_PHASES: (planId) => `/api/v1/QuitPlan/${planId}/phases`,
  QUITPLAN_PHASE_ID: (phaseId) => `/api/v1/QuitPlan/phases/${phaseId}`,
  QUITPLAN_PHASE_STATUS: (phaseId) => `/api/v1/QuitPlan/phases/${phaseId}/status`,
  QUITPLAN_START: (planId) => `/api/v1/QuitPlan/${planId}/start`,
  QUITPLAN_PAUSE: (planId) => `/api/v1/QuitPlan/${planId}/pause`,
  QUITPLAN_RESUME: (planId) => `/api/v1/QuitPlan/${planId}/resume`,
  QUITPLAN_COMPLETE: (planId) => `/api/v1/QuitPlan/${planId}/complete`,
  QUITPLAN_FAIL: (planId) => `/api/v1/QuitPlan/${planId}/fail`,

  MEMBERSHIPPACKAGE: '/api/MembershipPackage',

  PAYMENT: '/api/Payment/purchase-package',

  USERFLOW: '/api/v1/UserFlow/status'
};

export default API_PATHS;

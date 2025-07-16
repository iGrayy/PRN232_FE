// src/api/apiPaths.js
const API_PATHS = {
  // Auth
  LOGIN: '/api/v1/Auth/login',
  REGISTER_CUSTOMER: '/api/v1/Auth/register-customer',
  PROFILE: '/api/v1/Auth/profile',

  // SmokingRecord
  SMOKING_RECORD: '/api/v1/SmokingRecord',
  SMOKING_RECORD_ID: (id) => `/api/v1/SmokingRecord/${id}`,
  SMOKING_RECORD_CURRENT: (customerId) => `/api/v1/SmokingRecord/current/${customerId}`,
  SMOKING_RECORD_HISTORY: (customerId) => `/api/v1/SmokingRecord/history/${customerId}`,
  SMOKING_RECORD_QUIT: (id) => `/api/v1/SmokingRecord/${id}/quit`,

  MEMBERSHIPPACKAGE: '/api/MembershipPackage',

  PAYMENT: '/api/Payment/purchase-package'

};

export default API_PATHS;

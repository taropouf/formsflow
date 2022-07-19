import ACTION_CONSTANTS from "../actions/actionConstants";
import { setShowApplications, setShowViewSubmissions, setUserRolesToObject } from "../helper/user";
import { LANGUAGE } from "../constants/constants";
import { setFormAndSubmissionAccess } from "../helper/access";
const initialState = {
  bearerToken: "",
  roles: "",
  roleIds: localStorage.getItem("roleIds") ? 
  setUserRolesToObject(JSON.parse(localStorage.getItem("roleIds"))) : {},
  formAccess: localStorage.getItem("roleIds") ? 
  setFormAndSubmissionAccess("formAccess",JSON.parse(localStorage.getItem("roleIds"))) : [],
  submissionAccess: localStorage.getItem("roleIds") ? 
  setFormAndSubmissionAccess("submissionAccess",JSON.parse(localStorage.getItem("roleIds"))) : [],
  userDetail: null,
  isAuthenticated: false,
  currentPage: "",
  showApplications: false,
  showViewSubmissions: false,
  lang: localStorage.getItem("lang") ? localStorage.getItem("lang") : LANGUAGE,
  selectLanguages: [],
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_CONSTANTS.SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload };
    case ACTION_CONSTANTS.SET_USER_TOKEN:
      localStorage.setItem("authToken", action.payload);
      return { ...state, bearerToken: action.payload };
    case ACTION_CONSTANTS.SET_USER_ROLES:
      return { ...state, roles: action.payload };
    case ACTION_CONSTANTS.SET_USER_DETAILS:
      return {
        ...state,
        userDetail: action.payload,
        showApplications: setShowApplications(action.payload?.groups || []),
        showViewSubmissions: setShowViewSubmissions(
          action.payload?.groups || []
        ),
      };
    case ACTION_CONSTANTS.SET_USER_AUTHENTICATION:
      return { ...state, isAuthenticated: action.payload };
    case ACTION_CONSTANTS.SET_LANGUAGE:
      localStorage.setItem("lang", action.payload);
      return { ...state, lang: action.payload };
    case ACTION_CONSTANTS.SET_SELECT_LANGUAGES:
      return { ...state, selectLanguages: action.payload };
    case ACTION_CONSTANTS.ROLE_IDS:
      return { ...state, roleIds: setUserRolesToObject(action.payload)};
    case ACTION_CONSTANTS.ACCESS_ADDING:
        return { ...state, formAccess: setFormAndSubmissionAccess("formAccess",action.payload), 
        submissionAccess:setFormAndSubmissionAccess("submissionAccess",action.payload)};
    default:
      return state;
  }
};

export default user;

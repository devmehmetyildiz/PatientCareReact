import { ACTION_TYPES } from "../actions/FileActions"

const INITIAL_STATE = {
  list: [],
  selected_file: {
    id: 0,
    name: "",
    filename:'',
    filefolder: "",
    filepath: "",
    filetype: "",
    downloadedcount: "",
    lastdownloadeduser: "",
    lastdownloadedip: "",
    concurrencyStamp: null,
    createdUser: "",
    updatedUser: null,
    deleteUser: null,
    createTime: "0000-00-00 00:00:00",
    updateTime: "0000-00-00 00:00:00",
    deleteTime: "0000-00-00 00:00:00",
    isActive: true,
    file:{}
  },
  errmsg: "",
  isLoading: false,
  isSelected: false,
  isModalOpen: false
}

export const FileReducer = (state = INITIAL_STATE, { type, payload }) => {

  switch (type) {
    case ACTION_TYPES.GET_ALLFILES_INIT:
      return { ...state, isLoading: true };
    case ACTION_TYPES.GET_ALLFILES_SUCCESS:
      return { ...state, list: payload, isLoading: false }
    case ACTION_TYPES.GET_ALLFILES_ERROR:
      return { ...state, errmsg: payload, isLoading: false }
    case ACTION_TYPES.GET_SELECTEDFILE_INIT:
      return { ...state, isLoading: true }
    case ACTION_TYPES.GET_SELECTEDFILE_SUCCESS:
      return { ...state, selected_file: payload, isSelected: true, isLoading: false }
    case ACTION_TYPES.GET_SELECTEDFILE_ERROR:
      return { ...state, errmsg: payload, isLoading: true }
    case ACTION_TYPES.REMOVE_SELECTEDFILE:
      return { ...state, selected_file: {}, isSelected: false }
    case ACTION_TYPES.EDIT_FILE_INIT:
      return { ...state, isLoading: true }
    case ACTION_TYPES.EDIT_FILE_SUCCESS:
      return { ...state, isLoading: false }
    case ACTION_TYPES.EDIT_FILE_ERROR:
      return { ...state, errmsg: payload, isLoading: false }
    case ACTION_TYPES.ADD_FILE_INIT:
      return { ...state, isLoading: true }
    case ACTION_TYPES.ADD_FILE_SUCCESS:
      return { ...state, isLoading: false }
    case ACTION_TYPES.ADD_FILE_ERROR:
      return { ...state, errmsg: payload, isLoading: false }
    case ACTION_TYPES.DELETE_FILE_INIT:
      return { ...state, isLoading: true }
    case ACTION_TYPES.DELETE_FILE_SUCCESS:
      return { ...state, isLoading: false, isModalOpen: false }
    case ACTION_TYPES.DELETE_FILE_ERROR:
      return { ...state, errmsg: payload, isLoading: false }
    case ACTION_TYPES.DELETE_MODAL_OPEN:
      return { ...state, isModalOpen: true }
    case ACTION_TYPES.DELETE_MODAL_CLOSE:
      return { ...state, isModalOpen: false }
    default:
      return state;
  }
}
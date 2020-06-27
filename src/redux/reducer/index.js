import {type} from './../action'

export default (state, action) => {
  switch (action.type) {
    case type.SWITCH_MENU:
      return {
        ...state,
        menuName: action.menuName
      }
    default:
      return {...state}
  }
}
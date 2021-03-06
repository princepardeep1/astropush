import {actionTypes} from '../../utilities/constants';

const getLoginUserProfile = params => ({
  type: actionTypes.GET_PROFILE_REQUESTED,
  params,
});

const updateProfile = params => ({
  type: actionTypes.UPDATE_PROFILE_REQUESTED,
  params,
});

const memberInfo = params => ({
  type: actionTypes.MEMBER_REGISTER_INFO_REQUESTED,
  params,
});
const friendRequest = params => ({
  type: actionTypes.GET_FRIEND_REQUESTED,
  params,
});
const respondRequest = params => ({
  type: actionTypes.RESPOND_FRIEND_REQUESTED,
  params,
});
const friendlist = params => ({
  type: actionTypes.GET_FRIEND_LIST_REQUESTED,
  params,
});

const updateBoatInfo = params => ({
  type: actionTypes.UPDATE_EDIT_BOAT_INFO_REQUESTED,
  params,
});

const updatecontacts = params => ({
  type: actionTypes.UPDATE_EDIT_CONTACT_REQUESTED,
  params,
});
 
const updateProfleInfo = (params, token) => {
    return {
      type: actionTypes.UPDATE_PROFILE_INFO_REQUESTED,
      params,
      token,
    };
  };

export {
  updateProfleInfo,
  // astropush
  getLoginUserProfile,
  updateProfile,
  memberInfo,
  friendRequest,
  respondRequest,
  friendlist,
  updateBoatInfo,
  updatecontacts,
};

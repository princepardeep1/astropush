import AsyncStorage from '@react-native-async-storage/async-storage';

import { USER_DATA } from '../constants/otherConstants';

const getLocalUserData = () =>
  AsyncStorage.getItem(USER_DATA).then((data) => JSON.parse(data));

const setLocalUserData = (data) =>
  AsyncStorage.setItem(USER_DATA, JSON.stringify(data));

const deleteUserDataFromLocal = () => AsyncStorage.removeItem(USER_DATA);

const extractUserDataFromDBResponse = (userData = {}, defaultValues) => {
  const {
    email,
    email_verified_at,
    name,
    id,
    user_name,
    access_token,
    userName,
    role,
    phoneNumber,
    profilePic
  } = userData;

  return {
    email,
    email_verified_at,
    name,
    id,
    user_name,
    access_token,
    userName,
    role,
    phoneNumber,
    profilePic,
    ...defaultValues,
  };
};

export {
  getLocalUserData,
  setLocalUserData,
  deleteUserDataFromLocal,
  extractUserDataFromDBResponse,
};

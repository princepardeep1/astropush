import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useSelector } from 'react-redux';
//navigation screens
import ForgotPassword from '../screens/AuthScreens/ForgotPassword/ForgotPassword';
import Signin from '../screens/AuthScreens/Signin/Signin';
/************ Screens *************** */
//authScreen
import Signup from '../screens/AuthScreens/Signup/Signup';
import DrawerComp from '../screens/NavigationScreens/Home/DrawerComp';
import Home from '../screens/NavigationScreens/Home/Home';
import { navigationRef } from '../store/NavigationService';
import Blogs from '../screens/Drawerscreens/Blogs/Blogs';
import CallHistory from '../screens/Drawerscreens/CallHistory/CallHistory';
import CallHistoryDetails from '../screens/Drawerscreens/CallHistory/CallHistoryDetails';
import Remedies from '../screens/Drawerscreens/Remedies/Remedies';
import Notifications from '../screens/Drawerscreens/NoticeBoard/Notifications';
import CreateBlog from '../screens/Drawerscreens/Blogs/CreateBlog';
import Profile from '../screens/Drawerscreens/Profile/Profile';
import ChangePassword from '../screens/Drawerscreens/ChangePassword/ChangePassword';
import EditProfile from '../screens/Drawerscreens/Edit /EditProfile/EditProfile';
import Webviewer from '../components/common/Webviewer';


const Stack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();


const HomeStackScreen = props => {
  // console.log(props, 'porps sednn');
  let auth = useSelector(state => state.auth);
  // console.log(auth, 'auth in navigator');
  return (
    <Drawer.Navigator
      initialRouteName="Drawer"
      drawerContent={props => {
        props.useDetails = auth && auth.userDetails;
        return DrawerComp({ ...props });
      }}
      screenOptions={{
        headerShown: false,
        swipeEnabled: false
      }}

    >
      <Drawer.Screen name="Home" component={Home} options={{}} />
      <Drawer.Screen name="Blogs" component={Blogs} options={{}} />
      <Drawer.Screen name="CreateBlog" component={CreateBlog} options={{}} />
      <Drawer.Screen name="CallHistoryStack" component={CallHistoryStack} options={{}} />
      <Drawer.Screen name="RemediesStack" component={RemediesStack} options={{}} />
      <Drawer.Screen name="Notifications" component={Notifications} options={{}} />
      <Drawer.Screen name="ProfileStack" component={ProfileStack} options={{}} />
    </Drawer.Navigator>
  );
};

const MainNavigator = props => {
  return (
    // <NavigationContainer ref={navigationRef}>
    <NavigationContainer initialRouteName={'AuthStack'} ref={navigationRef}>
      <MainStack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <MainStack.Screen name="AuthStack" component={AuthStack} />
        <MainStack.Screen name="HomeStack" component={HomeStackScreen} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

const AuthStack = props => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={'Signin'}>
      <Stack.Screen name="Signin" component={Signin} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
};

const ProfileStack = props => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={'Profile'}>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Webviewer" component={Webviewer} />
    </Stack.Navigator>
  );
};

const CallHistoryStack = props => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={'CallHistory'}>
      <Stack.Screen name="CallHistory" component={CallHistory} />
      <Stack.Screen name="CallHistoryDetails" component={CallHistoryDetails} />
    </Stack.Navigator>
  );
};

const RemediesStack = props => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={'Remedies'}>
      <Stack.Screen name="Remedies" component={Remedies} />
    </Stack.Navigator>
  );
};

export default MainNavigator;

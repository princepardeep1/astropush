import React, { PureComponent } from 'react';
import { SafeAreaView, View } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { Provider } from 'react-redux';
import MainNavigator from './navigation/navigator';
import AuthLoading from './screens/AuthScreens/AuthLoading';
import store from './store';


class App extends PureComponent {
  constructor(props) { 
    super(props);
  }

  componentDidMount() {
  }

  render() {
    if (!__DEV__) {
      console.log = () => {};
    }
    return (
      <Provider store={store}>
        <View
          style={{
            flex: 1,
          }}>
          <SafeAreaView
            style={{
              flex: 1,
            }}>
            <AuthLoading />
            <MainNavigator />
            <FlashMessage position={'top'} />
          </SafeAreaView>
        </View>
      </Provider>
    );
  }
}

export default App;


// http://65.1.136.190:4001/api/AstrologerUpdate/AstrologerUpdateProfile

// {"UpdateName": "Shashi Pandeyi", "UpdatePhone": "6280853602", "UpdateEmail": "support@astropus.com"}
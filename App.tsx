import React, {useEffect} from 'react';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {MD3LightTheme, PaperProvider} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useUser} from './src/hooks/user/useUser';
import {UserContextProvider} from './src/context/userContext';
import {RootStackNavigator} from './src/navigations/Root/root-stack';
import {theme} from './constants/Theme';
import GlobalContextProvider from './context/GlobalStates';
import {getToken, notificationListener, requestUserPermission} from './utils';
import {firebase} from '@react-native-firebase/database';
import {PermissionsAndroid} from 'react-native';

const queryClient = new QueryClient();
export default function App() {
  const paperTheme = {...MD3LightTheme, colors: theme.light};
  const user = useUser();
  const NotificationDb = firebase
    .app()
    .database(
      'https://geomedlink-a59fa-default-rtdb.asia-southeast1.firebasedatabase.app/',
    );

  const requestNotificationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );

      return granted === 'granted';
    } catch (err) {
      console.log(err);
      return false;
    }
  };
  useEffect(() => {
    // requestUserPermission();
    requestNotificationPermission();
    notificationListener({NotificationDb});
    getToken();
  }, []);
  return (
    <GlobalContextProvider>
      <QueryClientProvider client={queryClient}>
        <UserContextProvider value={user}>
          <GestureHandlerRootView style={{flex: 1}}>
            <PaperProvider theme={paperTheme}>
              <BottomSheetModalProvider>
                <SafeAreaProvider>
                  <NavigationContainer>
                    <RootStackNavigator />
                  </NavigationContainer>
                </SafeAreaProvider>
              </BottomSheetModalProvider>
            </PaperProvider>
          </GestureHandlerRootView>
        </UserContextProvider>
      </QueryClientProvider>
    </GlobalContextProvider>
  );
}

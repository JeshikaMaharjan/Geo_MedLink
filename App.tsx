// import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
// import {NavigationContainer} from '@react-navigation/native';
// import {SafeAreaProvider} from 'react-native-safe-area-context';
// import {MD3LightTheme, PaperProvider} from 'react-native-paper';
// import {firebase} from '@react-native-firebase/database';
// import {theme} from './constants/Theme';
// import GlobalContextProvider from './context/GlobalStates';
// import {getToken, notificationListener, requestUserPermission} from './utils';
// import {PermissionsAndroid} from 'react-native';
// import RootStack from './navigation/RootStack';

// function App() {
//   const paperTheme = {...MD3LightTheme, colors: theme.light};
//   const NotificationDb = firebase
//     .app()
//     .database(
//       'https://geomedlink-a59fa-default-rtdb.asia-southeast1.firebasedatabase.app/',
//     );

//   const requestNotificationPermission = async () => {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
//       );

//       return granted === 'granted';
//     } catch (err) {
//       console.log(err);
//       return false;
//     }
//   };

//   useEffect(() => {
//     // requestUserPermission();
//     requestNotificationPermission();
//     notificationListener({NotificationDb});
//     getToken();
//   }, []);
//   return (
//     <GlobalContextProvider>
//       <PaperProvider theme={paperTheme}>
//         <NavigationContainer>
//           <SafeAreaProvider>
//             <RootStack />
//           </SafeAreaProvider>
//         </NavigationContainer>
//       </PaperProvider>
//     </GlobalContextProvider>
//   );
// }

// export default App;
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

const queryClient = new QueryClient();
export default function App() {
  const paperTheme = {...MD3LightTheme, colors: theme.light};
  const user = useUser();
  return (
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
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

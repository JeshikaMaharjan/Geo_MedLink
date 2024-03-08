import {BottomSheetModal, BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {useNavigation} from '@react-navigation/native';
import {useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {IconButton, Text, TouchableRipple} from 'react-native-paper';
import Iconll from 'react-native-vector-icons/AntDesign';
import {useFetchUser} from '../../hooks/user/useUserApi';
import {UserFeed} from './userFeed';
import {
  ProfileProps,
  RootStackNavigationProps,
} from '../../navigations/Root/root-stack.types';
import {ProfileStackProps} from '../../navigations/Bottom/bottom-stack.types';
import {useUserContext} from '../../context/userContext';
import {Header} from '../../components';
import {Loader} from '../../helper/loader';

export const Profile = ({route}: ProfileProps | ProfileStackProps) => {
  const {username: usernameParam} = route.params ?? {username: undefined};
  const {username: currentUsername, setUsername, setToken} = useUserContext();
  const {data: response, isLoading} = useFetchUser(usernameParam);

  const navigation = useNavigation<RootStackNavigationProps>();
  const [isVisible, setIsVisible] = useState(false);
  const data = response?.data;
  console.log('This is profile');
  // console.log({ data });

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const handlePress = () => {
    if (isVisible) bottomSheetModalRef.current?.dismiss();
    else bottomSheetModalRef.current?.present();
    setIsVisible(isVisible => !isVisible);
  };

  if (isLoading) return <Loader />;

  // if (!data) return <Text> No data</Text>;

  return (
    <View style={{backgroundColor: '#87CEEB', flex: 1}}>
      <Header style={{backgroundColor: '#87CEEB'}}>
        <Text style={{fontSize: 25, fontWeight: 'bold', color: 'white'}}>
          Profile
        </Text>
        {((usernameParam && usernameParam === currentUsername) ||
          !usernameParam) && (
          <IconButton
            icon={() => (
              <Iconll
                name="menuunfold"
                size={20}
                style={{transform: [{rotate: '180deg'}]}}
              />
            )}
            style={{margin: 0}}
            onPress={() => bottomSheetModalRef.current?.present()}
          />
        )}
      </Header>

      {<UserFeed userData={data} />}

      <BottomSheetModal
        ref={bottomSheetModalRef}
        onDismiss={() => setIsVisible(false)}
        enableDynamicSizing
        enablePanDownToClose
        enableOverDrag={false}
        handleStyle={{
          backgroundColor: '#FAF7F0',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}>
        <BottomSheetScrollView
          bounces={false}
          style={{flex: 1, backgroundColor: '#FAF7F0'}}>
          <TouchableRipple
            style={style.bottomSheetContent}
            onPress={() => {
              bottomSheetModalRef.current?.dismiss(),
                navigation.navigate('ChangePassword');
            }}>
            <Text style={style.bottomSheetContentText}>Change Password</Text>
          </TouchableRipple>
          <TouchableRipple
            style={style.bottomSheetContent}
            onPress={() => {
              bottomSheetModalRef.current?.dismiss(),
                navigation.navigate('EditProfile');
            }}>
            <Text style={style.bottomSheetContentText}>Edit Profile</Text>
          </TouchableRipple>
          {data.user.type === 1 && (
            <>
              <TouchableRipple
                style={style.bottomSheetContent}
                onPress={() => {
                  bottomSheetModalRef.current?.dismiss(),
                    navigation.navigate('EditDonor');
                }}>
                <Text style={style.bottomSheetContentText}>
                  Update Blood Donor
                </Text>
              </TouchableRipple>
              <TouchableRipple
                style={style.bottomSheetContent}
                onPress={() => {
                  bottomSheetModalRef.current?.dismiss(),
                    navigation.navigate('EditDoctor');
                }}>
                <Text style={style.bottomSheetContentText}>Update Doctor</Text>
              </TouchableRipple>
            </>
          )}

          <TouchableRipple
            style={style.bottomSheetContent}
            onPress={() => {
              bottomSheetModalRef.current?.dismiss();
              setToken('');
            }}>
            <Text style={style.bottomSheetContentText}>Logout</Text>
          </TouchableRipple>
        </BottomSheetScrollView>
      </BottomSheetModal>
    </View>
  );
};

const style = StyleSheet.create({
  topSection: {
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  informationSection: {
    backgroundColor: 'red',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  surface: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: 40,
    marginBottom: 5,
  },
  container: {
    flex: 1,
    padding: 24,
    // backgroundColor: "grey",
    backgroundColor: 'red',
  },
  bottomSheetContent: {
    padding: 10,
  },
  bottomSheetContentText: {
    // backgroundColor:'red', // yo chai tyo option kholda aaune wala ko list ko bg color
    fontSize: 15,
    fontWeight: '600',
  },
});

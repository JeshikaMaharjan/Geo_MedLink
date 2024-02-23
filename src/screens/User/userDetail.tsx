import {EvilIcons, MaterialCommunityIcons} from '@expo/vector-icons';
import {StyleSheet, View} from 'react-native';
import {Avatar, Divider, Surface, Text} from 'react-native-paper';
export enum services {
  MRI = 1,
  CT_SCAN = 2,
  ULTRA_SOUND = 3,
  BLOOD_BANKS = 4,
  DIALYSIS = 5,
  AMBULANCE = 6,
  PHYSIOTHERAPY = 7,
}

export const UserDetail = (userData: any) => {
  const data = userData?.userData?.userData;
  const services = data?.services;
  if (services) {
    const mapServiceToLetter = (service: string): string => {
      switch (service) {
        case '1':
          return 'a ';
        case '2':
          return 'b';
        default:
          return ''; // or throw an error for unexpected values
      }
    };
    const mappedServices = services.map((service: any) =>
      mapServiceToLetter(service),
    );
  }
  // console.log(mappedServices);

  return (
    <>
      <View style={style.topSection}>
        <View style={style.imageBox}>
          {!data.user.user_photo ? (
            <Avatar.Image size={120} source={require('../mydp.png')} />
          ) : (
            <Avatar.Image
              size={120}
              source={{uri: `data:image/png;base64,${data.user.user_photo}`}}
            />
          )}
        </View>
        <View style={style.informationSection}>
          {data.user.type === 1 ? (
            <Text style={style.fullName}>
              {data.firstName} {data.middleName !== null && data.middleName}{' '}
              {data.lastName}
            </Text>
          ) : (
            <Text style={style.fullName}>{data.name}</Text>
          )}
          <Text variant="bodySmall">{data.user.userName}</Text>
          {data.user.type === 2 && (
            <>
              <Text variant="bodyMedium">{data.user.phoneNumber}</Text>
              <View style={{flexDirection: 'row', margin: 5}}>
                <EvilIcons name="location" size={20} color="blue" />
                <Text>{data.user.address}</Text>
              </View>
              <>
                {data.services.map((a: any) => (
                  <Text>
                    {(a === '1' && 'MRI') || (a === '2' && 'Ambulance')}
                  </Text>
                ))}
              </>
            </>
          )}

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <MaterialCommunityIcons
              name="email-outline"
              size={18}
              color="blue"
            />
            <Text>{data.user.email}</Text>
          </View>
          <Divider
            horizontalInset={true}
            bold={true}
            style={{marginBottom: 20}}
          />
        </View>
      </View>
      <Divider />

      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <Surface style={style.surface}>
          <Text>My Post</Text>
        </Surface>
      </View>
    </>
  );
};

const style = StyleSheet.create({
  topSection: {
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  fullName: {
    margin: 5,
    fontSize: 22,
    fontWeight: '700',
    color: 'black',
  },
  informationSection: {
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
    // marginBottom: 5,
  },
  imageBox: {
    width: 125,
    height: 125,
    borderWidth: 2,
    borderColor: 'pink',
    borderRadius: 70,
  },
});

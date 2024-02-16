import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import {RootStackNavigationProps} from '../../navigations/Root/root-stack.types';
import {useDoctor, useFetchDoctor} from '../../hooks/user/useDoctorApi';
import {Loader} from '../../helper/loader';

export const EditDoctor = () => {
  const navigation = useNavigation<RootStackNavigationProps>();
  const {data: response, isLoading} = useFetchDoctor();
  const {mutate: updateDoctor} = useDoctor();
  const data = response?.data;
  const [NMC, setNMC] = useState<string>('');
  const [degree, setDegree] = useState<string>('');
  const disableButton = () => {
    return NMC === '' || degree === '';
  };
  console.log({data});
  const onSubmit = () => {
    updateDoctor({NMC, degree});
    // navigation.navigate("Profile", { username: data?.user.userName });
  };
  if (isLoading)
    <>
      <Loader />
    </>;

  return (
    <>
      <View
        style={{
          padding: 20,
          gap: 20,
        }}>
        <View>
          <Text style={{marginBottom: 8, fontSize: 14}}>NMC</Text>
          <TextInput
            placeholder={!data ? 'NMC' : `${data?.NMC}`}
            mode="outlined"
            value={NMC}
            keyboardType="numeric"
            onChangeText={NMC => setNMC(NMC)}
          />
        </View>
        <View>
          <Text style={{marginBottom: 8, fontSize: 14}}>Degree</Text>
          <TextInput
            placeholder={!data ? 'degree' : data?.degree}
            mode="outlined"
            value={degree}
            onChangeText={degree => setDegree(degree)}
          />
        </View>
        <Button
          mode="elevated"
          style={{alignSelf: 'center'}}
          onPress={onSubmit}
          disabled={disableButton()}>
          Submit
        </Button>
      </View>
    </>
  );
};

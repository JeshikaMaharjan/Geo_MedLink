import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, RadioButton, Text} from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
import {useUserContext} from '../../context/userContext';
import {RootStackNavigationProps} from '../../navigations/Root/root-stack.types';
import {useFetchUser} from '../../hooks/user/useUserApi';
import {useUpdateBloodDonor} from '../../hooks/user/useBloodDonorApi';
import {Loader} from '../../helper/loader';
import {Row} from '../../components';

export const EditDonor = () => {
  const {username} = useUserContext();
  const navigation = useNavigation<RootStackNavigationProps>();
  const {data: response, isLoading} = useFetchUser(username);
  const data = response?.data;
  console.log({dara: data.firstName});
  const [bloodGroup, setBloodGroup] = useState(
    data.blood_Group === null ? 'No blood group' : data.blood_Group,
  );
  const [showDropDown, setShowDropDown] = useState(false);
  const {mutate: updateDonorStatus} = useUpdateBloodDonor();
  const [checked, setChecked] = useState(data?.is_donor === true);
  const bloodGroupList = [
    {
      label: 'A+',
      value: 'A+',
    },
    {
      label: 'A-',
      value: 'A-',
    },
    {
      label: 'B+',
      value: 'B+',
    },
    {
      label: 'B-',
      value: 'B-',
    },
    {
      label: 'O+',
      value: 'O+',
    },
    {
      label: 'O-',
      value: 'O-',
    },
    {
      label: 'AB+',
      value: 'AB+',
    },
    {
      label: 'AB-',
      value: 'AB-',
    },
  ];
  const onSubmit = () => {
    updateDonorStatus({is_donor: checked, blood_Group: bloodGroup});
    navigation.navigate('Profile', {username: data?.user.userName});
  };
  if (isLoading) return <Loader />;
  return (
    <View style={{padding: 20, gap: 10}}>
      <View style={{marginBottom: 10}}>
        <Text style={{marginBottom: 8, fontSize: 14}}>Blood Group</Text>
        <DropDown
          label={'bloodGroup'}
          mode={'outlined'}
          visible={showDropDown}
          showDropDown={() => setShowDropDown(true)}
          onDismiss={() => setShowDropDown(false)}
          value={bloodGroup}
          setValue={setBloodGroup}
          list={bloodGroupList}
        />
      </View>
      <View>
        <Text>Do you want to be a Donor?</Text>
        <Row style={{alignItems: 'center'}}>
          <RadioButton
            value="Yes"
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => setChecked(true)}
          />
          <Text>Yes</Text>
        </Row>
        <Row style={{alignItems: 'center'}}>
          <RadioButton
            value="Yes"
            status={!checked ? 'checked' : 'unchecked'}
            onPress={() => setChecked(false)}
          />
          <Text>No</Text>
        </Row>
      </View>
      <Button
        mode="contained"
        style={{width: 100, alignSelf: 'center'}}
        onPress={onSubmit}>
        Submit
      </Button>
    </View>
  );
};

const style = StyleSheet.create({
  textInput: {
    height: 40,
    width: 300,
  },
});

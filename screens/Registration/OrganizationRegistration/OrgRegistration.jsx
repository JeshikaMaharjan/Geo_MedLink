import {useContext, useState} from 'react';
import {View, ScrollView, Image} from 'react-native';
import {
  Button,
  TextInput,
  Text,
  RadioButton,
  Divider,
  Card,
  Tooltip,
  HelperText,
  Chip,
  Portal,
  Modal,
} from 'react-native-paper';
import {OrgRegisterstyles} from './style/OrgRegistration';

import axios from 'axios';
import {GlobalContext} from '../../../context/GlobalStates';
import ModalView from '../ModalView';
import {getToken} from '../../../utils';

export default function OrgRegistration({navigation}) {
  const [{baseURL}] = useContext(GlobalContext);
  const [organizationName, setorgName] = useState();
  const [address, setAddress] = useState();
  const [email, setEmail] = useState();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [orgtype, setOrgType] = useState();
  // const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [deviceToken, setDeviceToken] = useState();

  const [error, setError] = useState('');
  const [isError, setisError] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  async function postData() {
    console.log(deviceToken);

    // setisError(false);
    const data = {
      name: organizationName,
      organizationType: parseInt(orgtype),
      address: address,
      email: email,
      type: 2,
      services: selectedServices,
      phoneNumber: parseInt(phoneNumber),
      userName: userName,
      password: password,
      bio: bio,
    };
    console.log('d', data);
    try {
      console.log('try');
      const res = await axios.post(`http://${baseURL}/api/user`, data);
      console.log('eeeeeeee');
      console.log(res.data);
      // if (!res) throw new Error('error msg');
      // setAddress('');
      // setEmail('');
      // setType('');
      // setorgName('');
      // setUserName('');
      // setPassword('');
      // setBio('');
      // setPhoneNumber('');
    } catch (error) {
      console.log(error);
      console.log(error?.response?.data);
      // console.log(error);
    }
    setModalVisible(true);
  }
  function handleSubmit() {
    const mobileToken = getToken();
    setDeviceToken(mobileToken);

    // if (
    //   !organizationName ||
    //   !userName ||
    //   !password ||
    //   !services ||
    //   !address ||
    //   !email ||
    //   !phoneNumber ||
    //   !orgtype
    // ) {
    //   setError('Please fill all the required fields!!');
    //   setisError(true);
    //   return;
    // }

    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    // if (!emailRegex.test(email)) {
    //   setisError(true);
    //   setError('Please match the email format as shown.');
    //   // console.log(isError);
    //   return;
    // }
    // if (!passwordRegex.test(password)) {
    //   setisError(true);
    //   setError(
    //     'Password must contain one uppercase, one lowercase and min length is 8',
    //   );
    //   console.log(isError);
    //   return;
    // }

    postData();
  }
  const toggleService = service => {
    if (selectedServices.includes(service)) {
      // If the service is already selected, remove it
      setSelectedServices(selectedServices.filter(s => s !== service));
    } else {
      // If the service is not selected, add it
      setSelectedServices([...selectedServices, service]);
    }
  };

  return (
    <View>
      <View style={OrgRegisterstyles.container}>
        <View>
          <TextInput
            mode="outlined"
            dense="true"
            value={organizationName}
            onChangeText={text => {
              setorgName(text);
            }}
            label="Organization Name*"
          />
        </View>
        <View>
          <TextInput
            mode="outlined"
            dense="true"
            value={userName}
            onChangeText={text => {
              setUserName(text);
            }}
            label="User Name*"
            placeholder="Set your username"
          />
        </View>

        <View>
          <TextInput
            value={email}
            mode="outlined"
            dense="true"
            onChangeText={text => {
              setEmail(text);
            }}
            label="Email Address*"
            placeholder="example@gmail.com"
          />
          <HelperText type="info" visible={true}>
            Please match the email format as shown. Enter valid email.
          </HelperText>
        </View>

        <View>
          <TextInput
            mode="outlined"
            dense="true"
            value={password}
            onChangeText={text => {
              setPassword(text);
            }}
            label="Password*"
            placeholder="Set your password"
          />
          <HelperText type="info" visible={true}>
            Password must contain one uppercase, one lowercase and min length is
            8.
          </HelperText>
        </View>
        <View>
          <TextInput
            value={address}
            mode="outlined"
            dense="true"
            onChangeText={text => {
              setAddress(text);
            }}
            label="Current Address*"
          />
        </View>
        <View>
          <TextInput
            mode="outlined"
            dense="true"
            value={phoneNumber}
            onChangeText={text => {
              setPhoneNumber(text);
            }}
            label="Current Phone Number"
          />
        </View>
        <View>
          <TextInput
            mode="outlined"
            dense="true"
            multiline={true}
            value={bio}
            onChangeText={text => {
              setBio(text);
            }}
            label="Description"
            placeholder="Write about yourself"
          />
        </View>

        <Text variant="bodyLarge">Type of Organization*</Text>
        <Card
          mode="outlined"
          style={{
            backgroundColor: 'white',
          }}>
          <RadioButton.Group
            onValueChange={value => {
              setOrgType(value);
            }}
            value={orgtype}>
            <RadioButton.Item label="Hospital" value="1" />
            <RadioButton.Item label="Clinic" value="2" />
            <RadioButton.Item label="Ambulance" value="3" />
          </RadioButton.Group>
        </Card>
        <Text>Select the services you provide.</Text>
        <View style={OrgRegisterstyles.ChipContainer}>
          <Chip
            selected={selectedServices.includes(1)}
            onPress={() => toggleService(1)}
            style={OrgRegisterstyles.chip}>
            MRI
          </Chip>
          <Chip
            selected={selectedServices.includes(2)}
            onPress={() => toggleService(2)}
            style={OrgRegisterstyles.chip}>
            Pathology
          </Chip>
        </View>

        <Button
          mode="elevated"
          style={{width: 200, alignSelf: 'center'}}
          onPress={handleSubmit}>
          Submit
        </Button>
      </View>
      <Portal>
        <Modal
          visible={isModalVisible}
          onDismiss={() => {
            setModalVisible(false);
          }}
          contentContainerStyle={OrgRegisterstyles.modalContainer}>
          <View>
            {isError ? (
              <View style={OrgRegisterstyles.modalInnerContainer}>
                <Image
                  source={require('../../../assets/warning.png')}
                  style={{width: 70, height: 70}}
                />
                <Text style={{color: 'red'}}>{error}</Text>
                <Button mode="elevated" onPress={() => setModalVisible(false)}>
                  Okay
                </Button>
              </View>
            ) : (
              <View style={OrgRegisterstyles.modalInnerContainer}>
                <Image
                  source={require('../../../assets/done.png')}
                  style={{width: 70, height: 70}}
                />
                <Text>Registered Successfully.</Text>
                <Button
                  onPress={() => {
                    setModalVisible(false);
                  }}>
                  Okay
                </Button>
              </View>
            )}
          </View>
        </Modal>
      </Portal>
    </View>
  );
}

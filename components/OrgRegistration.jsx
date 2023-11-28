import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
// import {useState} from 'react';
// import axios from 'axios';
// import {Picker} from '@react-native-picker/picker';
// import Button from '../../components/ui/Button';
// import Colors from '../../constants/colors';
// import Card from '../../components/ui/Card';
// import images from '../../constants/images';
// import Modal from '../../components/ui/Modal';

function OrgRegistration({navigation}) {
  const [organizationName, setorgName] = useState();
  const [type, setType] = useState();
  const [address, setAddress] = useState();
  const [email, setEmail] = useState();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [error, setError] = useState('');
  const [isError, setisError] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  async function postData() {
    setisError(false);
    const data = {
      name: organizationName,
      type: parseInt(type),
      address: address,
      email: email,
      phoneNumber: phoneNumber,
      userName: userName,
      password: password,
      bio: bio,
    };
    // console.log("d", data);
    try {
      const res = await axios.post(
        'http://192.168.101.184:3000/api/organization',
        data,
      );
      console.log(res.data);
      if (!res) throw new Error('error msg');
      setAddress('');
      setEmail('');
      setType('');
      setorgName('');
      setUserName('');
      setPassword('');
      setBio('');
      setPhoneNumber('');
    } catch (error) {
      console.log(`${error.response.data}`);
      // console.log(error);
    }
    setModalVisible(true);
  }
  function handleSubmit() {
    if (
      !organizationName ||
      !userName ||
      !password ||
      !type ||
      !address ||
      !email ||
      !phoneNumber
    ) {
      setError('Please fill all the required fields!!');
      setisError(true);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    if (!emailRegex.test(email)) {
      setisError(true);
      setError('Please match the email format as shown.');
      // console.log(isError);
      return;
    }
    if (!passwordRegex.test(password)) {
      setisError(true);
      setError(
        'Password must contain one uppercase, one lowercase and min length is 8',
      );
      console.log(isError);
      return;
    }
    postData();
  }

  return (
    <Text>Org</Text>
    // <>
    //   <Card>
    //     <ScrollView>
    //       <View>
    //         <View>
    //           <Text style={styles.text}>Organization Name</Text>
    //           <TextInput
    //             style={styles.input}
    //             value={organizationName}
    //             onChangeText={text => {
    //               setorgName(text);
    //             }}
    //             placeholder="Enter Organization Name"
    //           />
    //         </View>

    //         <View>
    //           <Text style={styles.text}>Type of Organization</Text>
    //           <View style={styles.picker}>
    //             <Picker
    //               selectedValue={type}
    //               onValueChange={(itemValue, itemIndex) => setType(itemValue)}
    //               // style={styles.picker}
    //               style={{color: '#5a4e4ebf'}}
    //               mode="dialog">
    //               <Picker.Item label="-Choose-" value="--" enabled={false} />
    //               <Picker.Item label="Hospital" value="1" />
    //               <Picker.Item label="Clinic" value="2" />
    //               <Picker.Item label="Ambulance" value="3" />
    //             </Picker>
    //           </View>
    //         </View>

    //         <View>
    //           <Text style={styles.text}>Email Address</Text>
    //           <TextInput
    //             value={email}
    //             style={styles.input}
    //             onChangeText={text => {
    //               setEmail(text);
    //             }}
    //             placeholder="example@gmail.com"
    //           />
    //         </View>
    //         <View>
    //           <Text style={styles.text}>User Name</Text>
    //           <TextInput
    //             style={styles.input}
    //             value={userName}
    //             onChangeText={text => {
    //               setUserName(text);
    //             }}
    //             placeholder="Set User Name"
    //           />
    //         </View>
    //         <View>
    //           <Text style={styles.text}>Password</Text>
    //           <TextInput
    //             style={styles.input}
    //             value={password}
    //             onChangeText={text => {
    //               setPassword(text);
    //             }}
    //             placeholder="Set Password"
    //           />
    //         </View>
    //         <View>
    //           <Text style={styles.text}>Phone number</Text>
    //           <TextInput
    //             style={styles.input}
    //             value={phoneNumber}
    //             onChangeText={text => {
    //               setPhoneNumber(text);
    //             }}
    //             placeholder="Set Phone Number"
    //           />
    //         </View>
    //         <View>
    //           <Text style={styles.text}>Bio</Text>
    //           <TextInput
    //             style={styles.input}
    //             value={bio}
    //             onChangeText={text => {
    //               setBio(text);
    //             }}
    //             placeholder="Description"
    //           />
    //         </View>
    //         <View>
    //           <Text style={styles.text}>Address</Text>
    //           <TextInput
    //             value={address}
    //             style={styles.input}
    //             onChangeText={text => {
    //               setAddress(text);
    //             }}
    //             placeholder="Enter current Address"
    //           />
    //         </View>
    //         {isError && (
    //           <View style={styles.error}>
    //             <Image source={images.errorIcon} style={styles.image} />
    //             <Text style={styles.errmsg}>{error}</Text>
    //           </View>
    //         )}
    //         <Button title="Submit" onPress={handleSubmit} />
    //       </View>
    //     </ScrollView>
    //     <Modal
    //       modalText={'Registered successfully.'}
    //       navOnClose={'Registration'}
    //       navigation={navigation}
    //       isModalVisible={isModalVisible}
    //     />
    //   </Card>
    // </>
  );
}
export default OrgRegistration;

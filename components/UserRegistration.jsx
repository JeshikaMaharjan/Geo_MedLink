import {
  View,
  StyleSheet,
  ScrollView,
  Modal,
  Pressable,
  Image,
} from 'react-native';
import {useState} from 'react';
import {Button, TextInput, Text, RadioButton} from 'react-native-paper';
// import axios from 'axios';

function UserRegistration({navigation}) {
  const baseURL = '192.168.101.184:3000';
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [checked, setChecked] = useState('');
  const [age, setAge] = useState('');
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [NMC, setNMC] = useState('');
  const [degree, setDegree] = useState('');
  const [error, setError] = useState('');
  const [isError, setisError] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [ModalNumber, setModalNumber] = useState(0);

  async function postData() {
    setisError(false);

    const data = {
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      userName: userName,
      password: password,
      // gender: gender,
      // age: parseInt(age),
      // dob: dob,
      address: address,
      email: email,
    };
    // console.log("d", data);
    try {
      const res = await axios.post(`http://${baseURL}/api/user`, data);

      if (!res) throw new Error('error msg');
      setFirstName('');
      setMiddleName('');
      setLastName('');
      // setUserName("");
      setPassword('');
      // setGender();
      // setAge("");
      // setDob("");
      setAddress('');
      setEmail('');
    } catch (error) {
      setModalVisible(true);
      const errmsg = error?.response?.data.error?.message[0];
      setisError(true);
      setError(errmsg);
    }
    setModalVisible(true);
  }

  function handleSubmit() {
    if (
      !firstName ||
      !lastName ||
      !userName ||
      !password ||
      // !gender ||
      // !age ||
      // !dob ||
      !address ||
      !email
    ) {
      setError('Please fill all the required fields!!');
      setisError(true);
      return;
    }

    const dateOfBirthRegex =
      /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    // if (!dateOfBirthRegex.test(dob)) {
    //   setisError(true);
    //   setError("Please match the DOB format as shown.");
    //   console.log(isError);
    //   return;
    // }

    if (!emailRegex.test(email)) {
      setisError(true);
      setError('Please match the email format as shown.');
      console.log(isError);
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
    <View>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View>
          <View>
            <Text>First Name</Text>
            <TextInput
              mode="outlined"
              label="Enter Firstname"
              value={firstName}
              onChangeText={text => {
                setFirstName(text);
              }}
            />
          </View>
          <View>
            <Text>Middle Name</Text>
            <TextInput
              mode="outlined"
              label="Enter Middlename"
              value={middleName}
              onChangeText={text => {
                setMiddleName(text);
              }}
            />
          </View>
          <View>
            <Text>Last Name</Text>
            <TextInput
              mode="outlined"
              label="Enter Lastname"
              value={lastName}
              onChangeText={text => {
                setLastName(text);
              }}
            />
          </View>

          <View>
            <Text>User Name</Text>
            <TextInput
              mode="outlined"
              label="Enter Username"
              value={userName}
              onChangeText={text => {
                setUserName(text);
              }}
            />
          </View>
          <View>
            <Text>Password</Text>
            <TextInput
              mode="outlined"
              label="Enter Password"
              value={password}
              onChangeText={text => {
                setPassword(text);
              }}
            />
          </View>
          <View>
            <Text>Gender</Text>
            <RadioButton.Group
              onValueChange={value => {
                setGender(value);
              }}
              value={gender}>
              <RadioButton.Item label="Male" value="male" />
              <RadioButton.Item label="Female" value="female" />
            </RadioButton.Group>
            {console.log(gender)}
          </View>

          <View>
            <Text>Age</Text>
            <TextInput
              mode="outlined"
              label="Enter Age"
              value={age}
              onChangeText={text => {
                setAge(text);
              }}
              placeholder="Enter your Age"
            />
          </View>
          <View>
            <Text>Date of Birth</Text>
            <TextInput
              mode="outlined"
              value={dob}
              label="Enter DOB"
              onChangeText={text => {
                setDob(text);
              }}
              placeholder="MM/DD/YYYY"
            />
          </View>
          <View>
            <Text>Email Address</Text>
            <TextInput
              mode="outlined"
              label="Enter Email Address"
              value={email}
              onChangeText={text => {
                setEmail(text);
              }}
              placeholder="example@gmail.com"
            />
          </View>
          <View>
            <Text>Address</Text>
            <TextInput
              mode="outlined"
              label="Enter Current Address"
              value={address}
              onChangeText={text => {
                setAddress(text);
              }}
            />
          </View>

          {isError && (
            <View style={styles.error}>
              <Image source={images.errorIcon} style={styles.image} />
              <Text style={styles.errmsg}>{error}</Text>
            </View>
          )}
          <Button mode="elevated" onPress={handleSubmit}>
            Submit
          </Button>
        </View>
      </ScrollView>

      {/* <Modal
        visible={isModalVisible}
        statusBarTranslucent={true}
        animationType="fade"
        transparent={true}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {ModalNumber == 0 && (
              <View>
                <Text style={styles.modalText}>
                  {isError ? {error} : 'Registered Successfully.'}
                </Text>
                {isError ? (
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => {
                      setModalVisible(false);
                    }}>
                    <Text style={styles.textStyle}>Okay</Text>
                  </Pressable>
                ) : (
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => {
                      setModalNumber(1);
                    }}>
                    <Text style={styles.textStyle}>Next</Text>
                  </Pressable>
                )}
              </View>
            )}
            {ModalNumber == 1 && (
              <View>
                <Text style={styles.modalText}>Do you want to be a Donor?</Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    setModalNumber(2);
                  }}>
                  <Text style={styles.textStyle}>Yes</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    setModalNumber(3);
                  }}>
                  <Text style={styles.textStyle}>Skip</Text>
                </Pressable>
              </View>
            )}

            {ModalNumber == 2 && (
              <View>
                <Text style={styles.modalText}>Select Blood Group</Text>
                <View style={styles.picker}>
                  <Picker
                    selectedValue={bloodGroup}
                    onValueChange={(itemValue, itemIndex) =>
                      setBloodGroup(itemValue)
                    }
                    mode="dialog">
                    <Picker.Item label="--" value="--" enabled={false} />
                    <Picker.Item label="A-" value="A-" />
                    <Picker.Item label="A+" value="A+" />
                    <Picker.Item label="B-" value="B-" />
                    <Picker.Item label="B+" value="B+" />
                    <Picker.Item label="AB+" value="AB+" />
                    <Picker.Item label="AB-" value="AB-" />
                    <Picker.Item label="O+" value="O+" />
                    <Picker.Item label="O-" value="O-" />
                  </Picker>
                </View>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    axios
                      .put(`http://${baseURL}/api/donor/activate/${userName}`, {
                        blood_Group: bloodGroup,
                      })
                      .then(res => {
                        console.log(res.data);
                      })
                      .catch(err => {
                        console.log(err?.response?.data);
                      });

                    setModalNumber(3);
                  }}>
                  <Text style={styles.textStyle}>Done</Text>
                </Pressable>
              </View>
            )}

            {ModalNumber == 3 && (
              <View>
                <Text style={styles.modalText}>
                  Do you want to register as Doctor?
                </Text>

                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    setModalNumber(4);
                  }}>
                  <Text style={styles.textStyle}>Yes</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    setModalNumber(0);
                    setModalVisible(false);
                    navigation.navigate('Registration');
                  }}>
                  <Text style={styles.textStyle}>Skip</Text>
                </Pressable>
              </View>
            )}

            {ModalNumber == 4 && (
              <View>
                <Text style={styles.modalText}>Enter valid NMC Number</Text>
                <TextInput mode='outlined'
                  style={styles.modalInput}
                  value={NMC}
                  onChangeText={text => {
                    setNMC(text);
                  }}
                  placeholder="NMC number"
                />
                <Text style={styles.modalText}>Enter Degree</Text>
                <TextInput mode='outlined'
                  style={styles.modalInput}
                  value={degree}
                  onChangeText={text => {
                    setDegree(text);
                  }}
                  placeholder="Degree"
                />

                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    axios
                      .post(`http://${baseURL}/api/register/doctor`, {
                        userName: userName,
                        degree: degree,
                        NMC: NMC,
                      })
                      .then(res => {
                        console.log(res.data);
                      })
                      .catch(err => {
                        console.log(err?.response?.data);
                      });
                    setModalNumber(0);
                    setModalVisible(false);
                    navigation.navigate('Registration');
                  }}>
                  <Text style={styles.textStyle}>Done</Text>
                </Pressable>
              </View>
            )}
          </View>
        </View>
      </Modal> */}
    </View>
  );
}

export default UserRegistration;

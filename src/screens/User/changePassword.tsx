import {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Button, Card, HelperText, Text, TextInput} from 'react-native-paper';
import {useChangePassword} from '../../hooks/user/usePasswordApi';

export const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const {mutate: changePassword, error} = useChangePassword();

  const hasError = () => {
    // console.log({ error: newPassword !== confirmPassword });
    return newPassword !== confirmPassword;
  };

  const disableButton = () => {
    return (
      currentPassword === '' ||
      newPassword === '' ||
      newPassword !== confirmPassword
    );
  };

  const handleChangePassword = () => {
    changePassword({currentPassword, newPassword, confirmPassword});
    console.log('change password');
  };
  return (
    <ScrollView>
      <View style={styles.passwordContainer}>
        <View style={styles.shape}>
          <Text>.</Text>
        </View>
        <Card style={styles.container}>
          <View style={{alignItems: 'center'}}>
            <Text variant="headlineSmall" style={styles.header}>
              Change Password
            </Text>
            <View style={{marginBottom: 10}}>
              <Text style={{marginBottom: 8, fontSize: 14}}>
                Current Password
              </Text>
              <TextInput
                placeholder="Enter your current password"
                mode="outlined"
                style={styles.textInput}
                value={currentPassword}
                onChangeText={currentPassword =>
                  setCurrentPassword(currentPassword)
                }
              />
            </View>
            <View>
              <Text style={{marginBottom: 8, fontSize: 14}}>New Password</Text>
              <TextInput
                placeholder="Minimum 8 characters"
                mode="outlined"
                style={styles.textInput}
                value={newPassword}
                onChangeText={newPassword => setNewPassword(newPassword)}
              />
            </View>
            <View style={styles.helperText}>
              <View>
                <Text style={{marginBottom: 8, fontSize: 14}}>
                  Confirm Password
                </Text>
                <TextInput
                  placeholder="Re-enter New Password"
                  mode="outlined"
                  value={confirmPassword}
                  style={{height: 45}}
                  onChangeText={confirmPassword =>
                    setConfirmPassword(confirmPassword)
                  }
                />
              </View>
              <HelperText type="error" visible={hasError()}>
                Re-Entered password does not match.
              </HelperText>
            </View>
            {error && (
              <Text style={{color: 'red', marginTop: 16}}>{error.message}</Text>
            )}
            <Button
              mode="contained"
              style={{
                marginTop: 40,
                marginBottom: 20,
                width: 280,
                borderRadius: 8,
              }}
              disabled={disableButton()}
              onPress={handleChangePassword}>
              Save Changes
            </Button>
          </View>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 330,
    alignItems: 'center',
    padding: 10,
    // margin: 20,
    marginTop: -290,
    backgroundColor: '#fff',
    // height: 400,
  },
  header: {
    fontWeight: 'bold',
    marginBottom: 40,
    marginTop: 10,
  },
  textInput: {
    // margin: 10,
    width: 280,
    height: 45,
    // backgroundColor:'red',
  },
  helperText: {
    margin: 10,
    width: 280,
    height: 45,
  },
  shape: {
    bottom: 300,
    height: 500,
    width: 500,
    borderRadius: 500,
    backgroundColor: '#DBC0E8',
  },
  passwordContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

import dayjs from 'dayjs';
import {StyleSheet, View} from 'react-native';
import {Avatar, Text} from 'react-native-paper';

export const ViewComment = (value: any) => {
  const data = value.value;

  // console.log("Data testing", data);
  return (
    <View style={styles.comment}>
      {!data.user_photo ? (
        <Avatar.Image
          size={32}
          source={require('../../../mydp.png')}
          style={styles.avatarStyle}
        />
      ) : (
        <Avatar.Image
          size={30}
          source={{uri: `data:image/png;base64,${data.user_photo}`}}
          style={styles.avatarStyle}
        />
      )}

      <View style={styles.viewCommentContent}>
        <View style={{display: 'flex', flexDirection: 'row', gap: 10}}>
          <Text style={styles.userName}>{data.userName}</Text>
          <Text style={styles.date}>
            {dayjs(data.date).format('MMM D, YYYY')}
          </Text>
        </View>
        <View style={styles.commentAndLikeWrapper}>
          <View style={styles.actualCommentBox}>
            <Text style={styles.actualCommentBoxText}>{data.comment}</Text>
          </View>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  comment: {
    padding: 8,
    height: 'auto',
    flexDirection: 'row',
    // backgroundColor: '#B4D4FF',
    backgroundColor: '#232322',
    gap: 10,
  },
  avatarStyle: {
    top: 4,
  },
  viewCommentContent: {
    width: '85%',
  },
  userName: {
    fontSize: 12,
    color: 'white',
    fontWeight: '700',
    // fontWeight: 'bold',
  },
  date: {
    fontSize: 12,
    color: 'white',
  },
  commentAndLikeWrapper: {
    display: 'flex',
    flexDirection: 'row',
    color: 'white',
  },
  actualCommentBox: {
    width: '100%',
    borderRadius: 10,
    marginTop: 8,
  },
  actualCommentBoxText: {
    textAlign: 'justify',
    fontSize: 12,
    color: 'white',
  },
  likeWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});

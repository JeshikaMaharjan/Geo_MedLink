import {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Avatar, IconButton, TextInput, useTheme} from 'react-native-paper';
import Iconll from 'react-native-vector-icons/AntDesign';
import {useUserContext} from '../../../../context/userContext';
import {usePostComment} from '../../../../hooks/post/useCommentApi';

type AddCommentProps = {
  postId: number;
};

export const AddComment = ({postId}: AddCommentProps) => {
  const theme = useTheme();
  const {image, username} = useUserContext();
  const [comment, setComment] = useState('');
  const {mutate: postComment} = usePostComment();
  console.log({username});
  const onPostComment = () => {
    postComment({comment, postId});
    setComment('');
  };
  return (
    <View style={styles.CommentBox}>
      <View style={styles.comment}>
        {!image ? (
          <Avatar.Image size={30} source={require('../../../mydp.png')} />
        ) : (
          <Avatar.Image
            size={30}
            source={{uri: `data:image/png;base64,${image}`}}
          />
        )}

        <TextInput
          style={styles.commentSection}
          placeholder="Add a comment..."
          multiline={true}
          value={comment}
          onChangeText={comment => setComment(comment)}
          autoFocus
        />
      </View>
      {/* <View style={styles.CommentAction}> */}

      <IconButton
        mode="contained-tonal"
        icon={() => <Iconll name="caretright" size={15} />}
        style={{
          backgroundColor: theme.colors.secondary,
          height: 40,
          width: 40,
        }}
        onPress={onPostComment}></IconButton>
      {/* </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  CommentBox: {
    // backgroundColor: 'white',
    backgroundColor: '#232322',
    paddingLeft: 10,
    borderWidth: 1,
    // borderBottomColor: 'black',
    paddingTop: 4,
    bottom: -20,
    flexDirection: 'row',
  },
  comment: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    width: '80%',
    // backgroundColor: 'tan',
  },
  commentSection: {
    // backgroundColor: "transparent",
    width: '85%',
    backgroundColor: '#232322',
    padding: 0,
    fontSize: 14,
  },
  CommentAction: {
    alignItems: 'center',
    // paddingTop: 5,
    // margin: 10,
    width: 70,
    // backgroundColor: 'aqua',
  },
});

import dayjs from 'dayjs';
import {Image, Linking, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Divider, Text} from 'react-native-paper';

export const NewsViews = (value: any) => {
  const news = value?.value;

  return (
    <>
      <View>
        <View>
          <TouchableOpacity
            onPress={() => Linking.openURL(`${news.headline_link}`)}
            key={news.id}
            style={styles.container}>
            <View key={news.id}>
              <Text
                variant="titleLarge"
                style={styles.headline}
                onPress={() => Linking.openURL(`${news.headline_link}`)}>
                {news.headline}
              </Text>
              <Text>{dayjs(news.date).format('MMM D, YYYY')}</Text>
              <Image source={{uri: news.image_url}} style={styles.newsImage} />
              <Text variant="labelMedium">{news.paragraph}</Text>
            </View>
          </TouchableOpacity>
          <Divider />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
  },
  newsImage: {
    width: '100%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  headline: {
    fontWeight: 'bold',
  },
});

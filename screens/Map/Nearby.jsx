import axios from 'axios';
import {Button, Text} from 'react-native-paper';
import {MAPBOX_TOKEN} from '../../constants/constants';

// `      // `https://api.mapbox.com/search/searchbox/v1/category/{canonical_category_id}`      );
export default function Nearby() {
  async function getNearby() {
    try {
      const res = await axios.get(
        `https://api.mapbox.com/search/searchbox/v1/category/health_services?access_token=${MAPBOX_TOKEN}&language=en&limit=25&`,
      );
      const data = JSON.stringify(res.data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  console;

  return (
    <>
      <View>
        <Text>dd</Text>
        <Button onPress={getNearby}>Nearby</Button>
      </View>
    </>
  );
}

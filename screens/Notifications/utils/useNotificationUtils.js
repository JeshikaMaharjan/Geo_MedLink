import {useContext, useState} from 'react';
import {GlobalContext} from '../../../context/GlobalStates';

const useNotificationUtils = ({navigation}) => {
  const [, {setMapView, setLocation}] = useContext(GlobalContext);
  const [content, setContent] = useState([]);
  const navigate = navigation.navigate;
  const [visibleDetail, setVisibleDetail] = useState([]);
  const handleClick = item => {
    setMapView('default');
    setLocation({
      coords: {
        latitude: item?.data?.latitude,
        longitude: item?.data?.longitude,
      },
    });
    navigate('Map');
  };

  const toggleDetails = index => {
    setVisibleDetail(prevVisibleDetail => {
      const newVisibleDetail = [...prevVisibleDetail];
      newVisibleDetail[index] = !newVisibleDetail[index];
      return newVisibleDetail;
    });
  };
  return {
    content,
    setContent,
    visibleDetail,
    setVisibleDetail,
    handleClick,
    toggleDetails,
  };
};

export default useNotificationUtils;

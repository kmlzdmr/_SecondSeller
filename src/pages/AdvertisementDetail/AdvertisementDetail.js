import React, {useEffect, useState} from 'react';
import {View, Text, Dimensions, ScrollView} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
const {height, width} = Dimensions.get('window');

import {Slider, Button, Animation} from '@components';
import THEMECOLORS from '@utils/colors';

import {getStyles} from './AdvertisementDetail.style';

import {getAdvertisementAPI} from '../../services/advertisementServices';
import {useUser} from '../../context/UserProvider';
import {showMessage} from 'react-native-flash-message';
import {useTheme} from '../../context/ThemeContext';

const AdvertisementDetail = ({route, navigation}) => {
  const {id: advertisementID} = route.params;
  const {
    user: {token, _id: userID},
  } = useUser();

  const [loading, setLoading] = useState(false);
  const [advertisement, setAdvertisement] = useState(null);
  const {theme} = useTheme();
  const COLORS = theme === 'dark' ? THEMECOLORS.DARK : THEMECOLORS.LIGHT;
  const styles = getStyles(theme);

  const getAdvertisement = () => {
    setLoading(true);
    getAdvertisementAPI(advertisementID, token)
      .then(response => {
        const advertisementData = response.data.data;
        setAdvertisement(advertisementData);
      })
      .catch(err => {
        showMessage({
          message: 'İlan getirilirken bir hata meydana geldi!',
          type: 'danger',
        });
      });
    setLoading(false);
  };

  useEffect(() => {
    getAdvertisement();
  }, []);

  if (advertisement && !loading) {
    const {
      _id: id,
      title,
      description,
      images,
      owner,
      category,
      location,
      price,
    } = advertisement;

    const LONGITUDE = location.longitude;
    const LATITUDE = location.latitude;
    const LATITUDE_DELTA = 0.5;
    const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);

    return (
      <View style={styles.outerContainer}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          {/* Slider */}
          <Slider images={images} />

          {/* Slider Altındaki Açıklamalar */}
          <View style={styles.namePriceContainer}>
            <Text style={styles.name}>{title}</Text>
            <Text style={styles.price}>{price} TL</Text>
          </View>

          {/* İlan açıklaması */}
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>İlan Açıklama</Text>
            <Text style={styles.description}>{description}</Text>
          </View>

          {/* İlan Konumunun Görüntülenmesi */}

          <MapView
            initialRegion={{
              latitude: LATITUDE,
              longitude: LONGITUDE,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}
            zoomEnabled={true}
            scrollEnabled={true}
            style={{
              width: '100%',
              height: 250,
            }}>
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              key={id}
              title="İlan Konumu"
              style={{width: 26, height: 40}}
              description={'İlan konumu açıklaması'}
              resizeMode="contain"
            />
          </MapView>
          {userID !== owner && (
            <View style={{flexDirection: 'row'}}>
              <Button
                icon={{
                  name: 'chat',
                  color: COLORS.titleColor,
                  size: 24,
                }}
                label="Sohbet Başlat"
                additionalStyles={{
                  container: {
                    flex: 1,
                  },
                }}
                onPress={() =>
                  navigation.navigate('ChatScreen', {
                    advertisementID,
                    ownerID: owner,
                  })
                }
              />
              <Button
                icon={{
                  name: 'offer',
                  color: COLORS.titleColor,
                  size: 24,
                }}
                additionalStyles={{
                  container: {
                    flex: 1,
                  },
                }}
                label="Teklif Ver"
                onPress={() => console.log('Teklif Ver')}
              />
            </View>
          )}
        </ScrollView>
      </View>
    );
  } else {
    return <Animation animationName={'loading'} />;
  }
};

export default AdvertisementDetail;

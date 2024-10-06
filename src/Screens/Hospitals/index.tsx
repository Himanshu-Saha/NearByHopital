import Geolocation from '@react-native-community/geolocation';
import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, ActivityIndicator, PermissionsAndroid} from 'react-native';

const GOOGLE_PLACES_API_URL =
  'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
const GOOGLE_API_KEY = ''; // Replace with your actual API key

export default function Hospitals() {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  // Get current location
  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app requires access to your location.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // console.log('Location permission granted');
          getCurrentLocation();
        } else {
          // console.log('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    };

    const getCurrentLocation = () => {
      const config = {
        enableHighAccuracy: false,
        timeout: 2000,
        maximumAge: 3600000,
      };
      Geolocation.getCurrentPosition(
        info => {
          setLatitude(info.coords.latitude);
          setLongitude(info.coords.longitude);
        },
        error => console.log('Location error:', error),
        config,
      );
    };

    requestLocationPermission();
  }, []); // Empty dependency array to run once on mount

  // Fetch hospitals when latitude and longitude are available
  useEffect(() => {
    if (latitude && longitude) {
      fetchHospitals();
    }
  }, [latitude, longitude]);

  const fetchHospitals = (pageToken = null) => {
    setLoading(true);
    let url = `${GOOGLE_PLACES_API_URL}?location=${latitude},${longitude}&radius=5000&type=hospital&key=${GOOGLE_API_KEY}`;
    if (pageToken) {
      url += `&pagetoken=${pageToken}`;
    }
    
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.status === 'OK') {
          setHospitals(prevHospitals => [...prevHospitals, ...data.results]);
          setNextPageToken(data.next_page_token || null);
        } else {
          console.error('Error fetching data:', data.status);
        }
      })
      .catch(error => {
        console.error('Error fetching hospitals:', error);
      })
      .finally(() => {
        setLoading(false);
        setIsLoadingMore(false);
      });
  };

  const loadMoreHospitals = () => {
    if (nextPageToken && !isLoadingMore) {
      setIsLoadingMore(true);
      setTimeout(() => {
        fetchHospitals(nextPageToken);
      }, 2000); // Wait for the next_page_token to become valid
    }
  };

  const renderHospital = ({item}) => (
    <View style={{padding: 10, borderBottomWidth: 1, borderColor: '#ccc'}}>
      <Text style={{color: '#000000'}}>{item.name}</Text>
      <Text style={{color: '#000000'}}>{item.vicinity}</Text>
    </View>
  );

  return (
    <View style={{flex: 1, padding: 10}}>
      {!(longitude && latitude) ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          {loading && <ActivityIndicator size="large" color="#0000ff" />}
          <FlatList
            data={hospitals}
            keyExtractor={item => item.place_id}
            renderItem={renderHospital}
            onEndReached={loadMoreHospitals}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              isLoadingMore ? (
                <ActivityIndicator size="small" color="#0000ff" />
              ) : null
            }
          />
        </>
      )}
    </View>
  );
}

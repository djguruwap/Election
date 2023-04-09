import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet, ScrollView, Image, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {ServiceButton} from '../../components/Buttons/ServiceButton';
import {Title} from '../../components/Title/Title';
import {AuthContext} from '../../navigation/AuthProvider';
import Apis from '../../services/apis';
import {getProfileData} from '../../store/actions/profile.actions';
import {COLORS, FONT_FAMILY, FONT_SIZE, SCREEN} from '../../utils/constants';
import Spinner from 'react-native-loading-spinner-overlay';
import {DashboardButton} from '../../components/Buttons/DashboardButton';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import { SliderBox } from "react-native-image-slider-box";
//imaegs
import  Complaints from '../../assets/3d/megaphone.png'
import NoticeBoard from '../../assets/3d/news-report.png'
import Search from '../../assets/3d/search2.jpg'
import Survay from '../../assets/3d/data-science.png'
import Area from '../../assets/3d/area.jpg'
import Settings from '../../assets/3d/settings2.jpg'

const size = 200;

const images = [
  require('../../assets/imgs/bg4.jpeg'),
  require('../../assets/imgs/bg2.webp'),
  require('../../assets/imgs/bg3.webp'),
]

const items = [
  'Notice Board',
  'Complaints',
  'Area List',
  'Advance Search',
  'Survay',
  'User Account',
]

export const Dashboard = () => {
  const {logout} = useContext(AuthContext);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const loading = useSelector(state => state.profile.loading)
  const [pincodes, setPincodes] = useState({})
  const [ward, setWard] = useState()
  const [isLoading, setIsLoading] = useState(false)
	const [sliderData, setSliderData] = useState([])
  

  useEffect(() => {
    getProfile()
  }, [])

  const getProfile = async () => {
    const token = await AsyncStorage.getItem('token')
    dispatch(getProfileData(token))
    getSurvayDettails(token)
    fetchPincodes(token)

    Apis.GetSliders({token}).then(res => {
			const images = res?.data.map(item => item?.image)
			setSliderData(images)
      setIsLoading(false)
		})
  }

  const fetchPincodes = (token) => {
    Apis.GetUserPincodes({token}).then(res => {
      // console.log('test', res.data);
      setPincodes(res?.data?.pincode)
    })
  }

  const getSurvayDettails = (token) => {
    Apis.GetSurvayDetils({token}).then(res => {
      setWard(res?.data?.ward)
    })
  }

  


  return (
    <View style={styles.container}>
      <Spinner visible={loading} textContent={'Loading...'} />

    <View>
      <SliderBox
        images={sliderData}
        sliderBoxHeight={SCREEN.HEIGHT * 0.28}
        onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
        dotColor={COLORS.PRIMARY_1}
        inactiveDotColor="#90A4AE"
        paginationBoxVerticalPadding={20}
        autoplay
        circleLoop
        paginationBoxStyle={{
          position: "absolute",
          top: -SCREEN.HEIGHT * 0.35,
        }}
      />
    </View>
      <ScrollView>

      <View style={styles.subContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("NoticeBoard")} style={styles.card}>
          <View style={{flex: 1, alignItems:'center', justifyContent: 'center'}}>
            <Image source={NoticeBoard} style={{height: 80, width: 80}}/>
            {/* <SearchIcon width="100%" height="100%"/> */}
            <Text style={styles.text}>{items[0]}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('AdvanceSearch', {pincodes})} style={styles.card}>
          <View style={{flex: 1, alignItems:'center', justifyContent: 'center'}}>
            <Image source={Search} style={{height: 80, width: 80}}/>
            <Text style={styles.text}>{items[3]}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Survay", {ward})} style={styles.card}>
          <View style={{flex: 1, alignItems:'center', justifyContent: 'center'}}>
            <Image source={Survay} style={{height: 80, width: 80}}/>
            <Text style={styles.text}>{items[4]}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <View style={{flex: 1, alignItems:'center', justifyContent: 'center'}}>
            <Image source={Complaints} style={{height: 80, width: 80}}/>
            <Text style={styles.text}>{items[1]}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <View style={{flex: 1, alignItems:'center', justifyContent: 'center'}}>
            <Image source={Area} style={{height: 90, width: 90}}/>
            <Text style={styles.text}>{items[2]}</Text>
          </View>
        </TouchableOpacity>
     
     
        <TouchableOpacity style={styles.card}>
          <View style={{flex: 1, alignItems:'center', justifyContent: 'center'}}>
            <Image source={Settings} style={{height: 80, width: 80}}/>
            <Text style={styles.text}>{items[5]}</Text>
          </View>
        </TouchableOpacity>

        
      </View>
      </ScrollView>
      <Image
        resizeMode="contain"
        source={require('../../assets/imgs/bg.jpeg')}
        style={{
          width: '100%',
          position: 'absolute',
          zIndex: -999,
          bottom: '-40%',
          opacity: 0.1,
        }}
      />
      <View>
      </View>
      <View style={styles.bottomBox}>
        <Text style={styles.company}>Made by - Power Code Technology</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    paddingHorizontal: 14,
    marginLeft: 10,
    marginTop: 20,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  card: {
    height: 130,
    width: SCREEN.WIDTH * 0.26,
    backgroundColor:'white',
    elevation: 8,
    borderRadius: 5,
    marginRight: 10,
    marginBottom: 20,
    borderBottomWidth: 5,
    borderBottomColor: COLORS.PRIMARY_2
  },
  text: {
    fontFamily: FONT_FAMILY.MEDIUM,
    color: COLORS.PRIMARY
  },
  bottomBox: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: COLORS.PRIMARY_2,
    width: "100%",
    opacity: 0.8
  },
  company: {
    color: COLORS.WHITE,
    fontSize: FONT_SIZE.MICRO,
    fontFamily: FONT_FAMILY.MEDIUM,
    padding: 8,
    textAlign: 'center'
  }
});

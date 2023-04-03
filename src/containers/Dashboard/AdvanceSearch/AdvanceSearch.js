import React, { useEffect, useState } from 'react';
import {Image, StyleSheet, View, Text, FlatList, TextInput, TouchableOpacity, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import {Title} from '../../../components/Title/Title';
import {
  COLORS,
  defaultImg,
  defaultImg2,
  FONT_FAMILY,
  FONT_SIZE,
  SCREEN
} from '../../../utils/constants';
import SearchBar from 'react-native-search-bar';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Apis from '../../../services/apis';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import _ from 'lodash';
import {Picker} from '@react-native-picker/picker';

export const AdvanceSearch = () => {
  const navigation = useNavigation()
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState()
  const params = useRoute()?.params
  const pincodeArr = params?.pincodes.split(",")

  const customPincodeArr = pincodeArr?.map((item) => {
    return {
      label: item,
      value: item
    }
  })
  const [loading, setLoading] = useState(false)
  const [searchLoading, setSearchLoading] = useState(false)
  const [selectedPincode, setSelectedPincode] = useState(customPincodeArr[0]?.value)
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState();
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {
    fetchUserListByPincodes()
  }, [selectedPincode])

  const fetchUserListByPincodes = async (isLoadMore) => {
    const token = await AsyncStorage.getItem('token')

    if(isLoadMore){
      setPage(page + 1)
      Apis.GetUserListByPincode({token, pincode: selectedPincode, pageNo: page}).then(res => {
        setLoading(false)
        // setFilteredDataSource(res?.data?.data)
        const newArr = _.concat(masterDataSource, res?.data?.data)
        setMasterDataSource(newArr)
      }).catch(err => {
        setLoading(false)
      })
    }else{ 
      setLoading(true)
      Apis.GetUserListByPincode({token, pincode: selectedPincode, pageNo: page}).then(res => {
        console.log('xx', res)
        setLoading(false)
        // setFilteredDataSource(res?.data?.data)
        setMasterDataSource(res?.data?.data)
        setTotalPage(res?.data?.total)
        setPage(page + 1)
      }).catch(err => {
        setLoading(false)
      })
    }
  }

  const onLoadMore = () => {
    if(page * 50 < totalPage) {
      fetchUserListByPincodes(true)
    }
  }

  const searchFilterFunction = async (text) => {
    const token = await AsyncStorage.getItem('token')
    setSearchLoading(true)
    if (text) {
      // Inserted text is not blank
      Apis.SearchUser({token, search_by: text}).then(res => {
        setSearchLoading(false)
        console.log('xx', res?.data)
        if(res?.data) {
          setMasterDataSource(res?.data)
        }
      }).catch(() => setSearchLoading(false))
    } 
  };

  // const searchFilterFunction = _.debounce(async (text) => {
  //   const token = await AsyncStorage.getItem('token')
  //     Apis.SearchUser({token, search_by: text}).then(res => {
  //       console.log('test', res?.data)
  //       setMasterDataSource(res?.data)
  //     })
  // },1000)



  const rednerItem = ({item, index}) => {
    const img = `https://randomuser.me/api/portraits/men/${index}.jpg`
    return(
       <TouchableOpacity onPress={() => navigation.navigate('FullView', {data: item, img})} activeOpacity={0.5} style={styles.box}> 
            <View style={{borderWidth: 0.5, padding: 5}}>
                <Image source={{uri: img}} style={{height: SCREEN.WIDTH * 0.20, width: SCREEN.WIDTH * 0.20, borderRadius: 5}}/>
            </View>
            <View  style={styles.itemBox}>
                <View>
                    <Text numberOfLines={1} style={[styles.text1, {width: "60%"}]}>{item?.cname}</Text>
                    <Text style={[styles.text2,{width: "60%"}]} numberOfLines={1}>{item?.ladd ? item?.ladd : item?.state}</Text>
                </View>
                <View style={{ flexDirection:'row'}}>
                  <TouchableOpacity style={styles.item}>
                      <Icon name='whatsapp' color={'green'} size={16}/>
                  </TouchableOpacity>  
                  <TouchableOpacity style={styles.item}>
                      <MIcon name='call' color={COLORS.PRIMARY_2} size={16}/>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.item}>
                      <MIcon name='camera-alt' color={'black'} size={16}/>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.item}>
                      <MIcon name='insert-drive-file' color={'gray'} size={16}/>
                  </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
    )
  }


  return (
    <View style={{flex: 1, backgroundColor: '#f1f1f1'}}>
      <Spinner visible={loading} textContent={'Loading...'} />
        <View style={{backgroundColor: 'white', padding: 8}}>
          
        <Picker
          selectedValue={selectedPincode}
          onValueChange={(item) => {
            setSelectedPincode(item)
          }}>
            {customPincodeArr?.map(item => (
              <Picker.Item label={item?.label} value={item?.value} />
            ))}
        </Picker> 
            <View style={styles.SearchBar}>
                <TextInput
                  style={styles.input}
                  // ref="searchBar"
                  value={search}
                  placeholder="Search"
                  onChangeText={(tt) => {
                    searchFilterFunction(tt)
                    setSearch(tt)
                  }}
                />          
                  {
                    searchLoading &&
                    <ActivityIndicator style={{
                      position: 'absolute',
                      right: "12%"
                    }} size='small' color='green' />
                  }
                  <MIcon name='search' size={22} color={COLORS.BLACK} />
            </View>
        </View>
     <View style={styles.container}>
          <FlatList 
                data={masterDataSource}
                renderItem={rednerItem}
                keyExtractor={(item, index) => index.toString()}
                onEndReached={onLoadMore}
                ListEmptyComponent={
                  !loading &&
                  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', height: 300}}>
                    <Text style={{marginBottom: 20}}>Not data found!</Text>
                    <TouchableOpacity onPress={() => {
                      // console.log('xx', page)
                        setPage(1)
                        fetchUserListByPincodes()
                      }} style={{backgroundColor: 'green', width: 90, borderRadius: 8}}>
                      <Text style={{color:'white', textAlign: 'center', padding: 5}}>Refresh</Text>
                    </TouchableOpacity>
                  </View>
                }
              />
      </View>
    </View>
  );
};

const IMG_SIZE = 40;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'white',
    marginHorizontal: 15
  },
  SearchBar: {
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#f1f1f1',
    borderRadius: 5
  },
  box: {
    marginTop: 20,
    backgroundColor: 'white',
    padding: 8,
    flexDirection: 'row',
    elevation: 5,
    borderRadius: 5,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.PRIMARY_2
  },
  itemBox:{ 
    marginLeft: 14,
    marginTop: 5
  },
  text1: {
    fontFamily: FONT_FAMILY.MEDIUM,
    fontSize: FONT_SIZE.SMALL,
    color: COLORS.BLACK,
    textTransform: 'capitalize'
  },
  text2: {
    fontFamily: FONT_FAMILY.REGULAR,
    fontSize: FONT_SIZE.MICRO,
    color: COLORS.GRAY,
    textTransform: 'capitalize'
  },
  item: {
    borderWidth: 0.5,
    borderColor: '#f1f1f1',
    backgroundColor: 'white',
    elevation: 3,
    borderRadius: 5,
    padding: 5,
    marginRight: 10,
    marginTop: 10,
  },
  input: {
    width: "90%",
    paddingLeft: 20
  }
});

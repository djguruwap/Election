import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
	Image,
	TouchableOpacity
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import { SvgUri, SvgXml } from 'react-native-svg';
import Apis from '../../services/apis';
import { COLORS, FONT_FAMILY, FONT_SIZE, SCREEN } from '../../utils/constants';

const DATA = [
  {
		name: 'Guru Karmakar',
		email: "guruwap66@gmail.com"	
  },
  {
		name: 'Haru Karmakar',
		email: "dsfds@gmail.com"	
  },
];

const Item = ({item, index}) => {
	return (
  <View style={styles.item}>
		<View style={styles.box}>
			<View style={styles.imageBox}>
				<Image source={{uri: `https://randomuser.me/api/portraits/men/${index}.jpg`}}  style={styles.img}/>
			</View>
			<View style={{marginVertical: 15}}>
				<Text style={styles.text1}>{item?.name}</Text>
				<Text numberOfLines={1} style={styles.text2}>{item?.email}</Text>
				<TouchableOpacity onPress={() => alert("This is under construction")} style={styles.button}>
						<Text style={styles.text3}>View</Text>
				</TouchableOpacity>
			</View>
		</View>
  </View>
)
}

export const UsersList = () => {
	const [data, setData] = useState([])	
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		fetchUserList()
	}, [])

	const fetchUserList = async () => {
		const token = await AsyncStorage.getItem("token")	
		Apis.GetUserList({token}).then(res=> {
			setLoading(false)
			setData(res?.data)
		}).catch(err => {
			setLoading(false)
		})
	}

	if(loading){
		return <Spinner visible={loading} textContent={'Loading...'} />
	}

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
				contentContainerStyle={{
					paddingBottom: 120
				}}
        data={data}
        renderItem={Item}
        keyExtractor={item => item.id}
				numColumns={2}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
		marginHorizontal: 10
  },
  item: {
    backgroundColor: COLORS.WHITE,
		height: SCREEN.WIDTH * 0.55,
		width: SCREEN.WIDTH * 0.45,
		margin: 5,
		borderRadius: 5,
		elevation: 5
  },
  title: {
    fontSize: 32,
  },
	box:{
		flex:1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	imageBox: {
		height: 90,
		width: 90,
		borderRadius: 45,
	},
	img:{ 
		flex: 1,
		borderRadius: 50
	},
	text1: {
		fontFamily: FONT_FAMILY.MEDIUM,
		fontSize: FONT_SIZE.LARGE,
		color: COLORS.PRIMARY_2,
		textAlign: 'center'
	},
	text2: {
		fontFamily: FONT_FAMILY.REGULAR,
		fontSize: FONT_SIZE.MICRO,
		color: COLORS.GRAY,
		textAlign: 'center',
		width: SCREEN.WIDTH * 0.38
	},
	text3: {
		fontFamily: FONT_FAMILY.MEDIUM,
		fontSize: FONT_SIZE.SMALL,
		color: COLORS.WHITE,
		textAlign: 'center',
		padding: 2
	},
	button: {
		borderRadius: 50,
		backgroundColor: COLORS.IDLE,
		marginTop: 10,
		width: 120,
		alignSelf: 'center'
	}
});
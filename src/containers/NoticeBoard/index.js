import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay/lib'
import Icon  from 'react-native-vector-icons/Fontisto'
import Apis from '../../services/apis'
import { COLORS, SCREEN } from '../../utils/constants'
import { SliderBox } from "react-native-image-slider-box";
import moment from 'moment'

export const NoticeBoard = () => {
	const [isLoading, setIsLoading] = useState(true)
	const [notificationsData, setNotificationData] = useState([])
	const [sliderData, setSliderData] = useState([])

	useEffect(() => {
		GetNotificationAndSliders()
	},[])

	const GetNotificationAndSliders = async () => {
		const token = await AsyncStorage.getItem('token')
		Apis.GetNotification({token}).then(res => {
			setNotificationData(res?.data)
			setIsLoading(false)
		}).catch(() => {
			setIsLoading(false)
		})
	
	}

	if(isLoading){
		return <Spinner visible={isLoading} textContent={'Loading...'} />
	}


	const renderItem = ({item}) => {
		return(
			<View  style={{borderLeftColor: COLORS.PRIMARY, borderLeftWidth: 2,padding: 20,flexDirection: 'row',width: '100%', backgroundColor: 'white', marginVertical: 8}}>
					<View style={{flex: 0.15}}>
						<Icon name='bell' size={40} color={COLORS.GRAY}/>
					</View>
					<View style={{flex: 0.85}}>
							<Text style={{color: COLORS.GRAY}}>{moment(item?.created_at).format("MMM Do YY")}</Text>	
							<Text style={{color: 'black', textTransform: 'capitalize'}}>{item?.notification}</Text>	
							{/* <Text numberOfLines={1} style={{}}>Address: {item?.election_address}</Text>	 */}
					</View>
			</View>
		)
	}


	return(
		<View style={{marginHorizontal: 8}}>
			{/* <Text>Notice Board</Text> */}
			{/* <View style={{marginLeft: -10}}>
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
					}}
				/>
			</View> */}
			<FlatList
				data={notificationsData}
				renderItem={renderItem}
			/>
		</View>
	)
}
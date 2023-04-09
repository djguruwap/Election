import AsyncStorage from '@react-native-async-storage/async-storage'
import { Picker } from '@react-native-picker/picker'
import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { FlatList, Text, TouchableOpacity } from 'react-native'
import { View } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay/lib'
import Icon from 'react-native-vector-icons/FontAwesome'
import Apis from '../../services/apis'
import { COLORS, HEIGHT, WINDOW } from '../../utils/constants'

export const SurvayList = () => {
	const {navigate} = useNavigation()
	const params = useRoute()?.params
	const [isLoading, setIsLoading] = useState(false)
	const [data, setData] = useState([])

  const wardArr = params?.ward.split(",")
	const customWardArr = wardArr.map(item => {
		return {
			label: item,
			value: item
		}
	})
	const [selectedWard, setSelectedWard] = useState(customWardArr[0]?.value)

	useEffect(() => {
			getList()
	},[selectedWard])

	const getList = async () => {
		const token = await AsyncStorage.getItem('token')
		setIsLoading(true)
		Apis.GetSurvayList({token, key: selectedWard}).then(res => {
			setData(res?.data?.data)
			setIsLoading(false)
		}).catch(err => {
			setIsLoading(false)
		})
  }

	if(isLoading){
		return <Spinner visible={isLoading} textContent={'Loading...'} />
	}

	const renderItem = ({item}) => {
		return(
			<TouchableOpacity onPress={() => navigate('TakeSurvay', {card_no: item?.card_no})} style={{borderLeftColor: 'green', borderLeftWidth: 2,padding: 20,flexDirection: 'row', alignItems: 'center', justifyContent: 'center',width: '100%', backgroundColor: 'white', marginVertical: 8}}>
					<View style={{flex: 0.2}}>
						<Icon name='user-circle' size={40} color={COLORS.GRAY}/>
					</View>
					<View style={{flex: 0.8}}>
							<Text style={{color: 'green'}}>Seq no: {item?.seq_no}</Text>	
							<Text style={{color: COLORS.PRIMARY}}>Name: {item?.name}</Text>	
							<Text style={{}}>C/0 : {item?.father_husband_name}</Text>	
							<Text style={{}}>Age:  {item?.age}</Text>	
							<Text style={{}}>Gender: {item?.gender}</Text>	
							<Text numberOfLines={1} style={{}}>Address: {item?.election_address}</Text>	
					</View>
			</TouchableOpacity>
		)
	}

	return(
		<View style={{marginHorizontal: 8}}>
			<View style={{backgroundColor: 'white', padding: 8}}>
			 <Picker
          selectedValue={selectedWard}
          onValueChange={(item) => {
						setSelectedWard(item)
          }}>
            {customWardArr?.map(item => (
              <Picker.Item label={item?.label} value={item?.value} />
            ))}
        </Picker> 
				</View>
			<FlatList
				data={data}
				renderItem={renderItem}
			/>
		</View>
	)
}
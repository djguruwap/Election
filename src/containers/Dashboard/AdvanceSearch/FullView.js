import { useRoute } from '@react-navigation/native'
import React from 'react'
import { View, Text, StyleSheet, Image, ImageBackground, ScrollView, TouchableOpacity } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { COLORS, SCREEN, FONT_FAMILY, FONT_SIZE, defaultImg2 } from '../../../utils/constants'
import Icon from 'react-native-vector-icons/Fontisto';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import moment from "moment";

const ICON_SIZE = 22
export const FullView = () => {
  const params = useRoute()?.params
	const data = params.data
	console.log('params', params.data)
	return(
		<View style={styles.container}>
				<View style={styles.buttonRow}>
						<TouchableOpacity style={styles.button}>
							<Text style={styles.btnText}>Info</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.button}>
							<Text style={styles.btnText}>Family</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.button}>
							<Text style={styles.btnText}>Survay</Text>
						</TouchableOpacity>
				</View>
				<View style={styles.card}>
						<View style={{borderWidth: 0.5, padding: 5}}>
                <Image source={{uri: params.img}} style={{height: SCREEN.WIDTH * 0.35, width: SCREEN.WIDTH * 0.35, borderRadius: 5}}/>
						</View>
						<View>
							<View style={{marginLeft: 15}}>
                    <Text style={styles.text1}>{data?.cname}</Text>
                    <Text style={styles.address}>{data?.state}</Text>
										<View>
										<View style={{ flexDirection:'row'}}>
												<TouchableOpacity style={styles.item}>
														<Icon name='whatsapp' color={'green'} size={ICON_SIZE}/>
												</TouchableOpacity>  
												<TouchableOpacity style={styles.item}>
														<MIcon name='call' color={COLORS.PRIMARY_2} size={ICON_SIZE}/>
												</TouchableOpacity>
												<TouchableOpacity style={styles.item}>
														<MIcon name='camera-alt' color={'black'} size={ICON_SIZE}/>
												</TouchableOpacity>
												<TouchableOpacity style={styles.item}>
														<MIcon name='insert-drive-file' color={'gray'} size={ICON_SIZE}/>
												</TouchableOpacity>
             			 	</View>
										</View>
                </View>
						</View>
				</View>
				<ScrollView contentContainerStyle={{paddingBottom: 120}}>
				<View style={styles.card2}>
				<Text style={styles.label}>Information</Text>
					<View style={styles.hr}/>
					<View>
							<View style={styles.row}>
								<Text style={styles.t2}>Mobile </Text>
								<Text style={styles.t1}>{data?.mobile ? data?.mobile : '--'}</Text>
							</View>
							<View style={styles.row}>
								<Text style={styles.t2}>Opreator </Text>
								<Text style={styles.t1}>{data?.operator ? data?.operator : '--'}</Text>
							</View>
							<View style={styles.row}>
								<Text style={styles.t2}>Date of Birth </Text>
								<Text style={styles.t1}>{data?.doa ? moment(new Date(data?.dob)).format("MMM Do YYYY") : '--'}</Text>
							</View>
					</View>

					<Text style={styles.label}>Address</Text>
					<View style={styles.hr}/>
					<View>
						<View style={styles.row}>
							<Text style={styles.t2}>State</Text>
							<Text style={styles.t1}>{data?.state ? data?.state : '--'}</Text>
						</View>
						{/* <View style={styles.row}>
							<Text style={styles.t2}>City</Text>
							<Text style={styles.t1}>Purulia</Text>
						</View> */}
						{/* <View style={styles.row}>
							<Text style={styles.t2}>Pin Code</Text>
							<Text style={styles.t1}>723122</Text>
						</View> */}
						<View style={styles.row}>
							<Text style={styles.t2}>Landmark</Text>
							<Text  style={styles.t1}>{data?.ladd ? data?.ladd : '--'}</Text>
						</View>
					</View>
				</View>
				{/* <View style={[styles.card2, {marginTop: 10}]}>
					<Text style={styles.label}>Voter Card</Text>
					<View style={styles.hr}/>
					<ImageBackground  source={{uri: 'https://www.bankbazaar.com/images/india/infographic/voter-id-card.webp'}} style={styles.voterId}>
							<Text>knsadlksnakln</Text>
					</ImageBackground>
				</View> */}
				{/* <View style={styles.buttonRow}>
						<TouchableOpacity style={styles.button}>
							<Text style={styles.btnText}>Send</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.button}>
							<Text style={styles.btnText}>Print</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.button}>
							<Text style={styles.btnText}>Call</Text>
						</TouchableOpacity>
				</View> */}
				</ScrollView>
		</View>	
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginHorizontal: 16
	},
	card: {
		elevation: 5,
		backgroundColor: COLORS.WHITE,
		padding: 12,
		flexDirection: 'row',
		borderRadius: 5
	},
	text1: {
		fontFamily: FONT_FAMILY.MEDIUM,
    fontSize: FONT_SIZE.LARGE,
    color: COLORS.PRIMARY_1,
		width: "65%"
	},
	address: {
		fontFamily: FONT_FAMILY.REGULAR,
    fontSize: FONT_SIZE.MEDIUM,
    color: COLORS.GRAY,
	},
	card2: {
		borderWidth: 0.5,
		elevation: 5,
		backgroundColor: COLORS.WHITE,
		borderRadius: 5,
		marginVertical: 5,
		padding: 12,
		borderColor: COLORS.GRAY,
	},
	label: {
		fontFamily: FONT_FAMILY.BOLD,
    fontSize: FONT_SIZE.SMALL,
    color: COLORS.PRIMARY_1,
	},
	hr : {
		height: 0.5,
		backgroundColor: COLORS.GRAY,
		width: "100%"
	},
	t1:{
		fontFamily: FONT_FAMILY.REGULAR,
    fontSize: FONT_SIZE.MEDIUM,
    color: COLORS.GRAY,
		paddingVertical: 5,
		width: "60%"
	},
	t2:{
		fontFamily: FONT_FAMILY.BOLD,
    fontSize: FONT_SIZE.SMALL,
    color: COLORS.TEXT_BLACK,
		width: "35%"
	},
	row:{
		flexDirection:'row',
		alignItems: 'center'
	},
	voterId: {
		width: "100%",
		height: 250,
		opacity: 0.2
	},
	buttonRow:{
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginVertical: 10
	},
	button: {
		backgroundColor: COLORS.BLACK,
		borderRadius: 5,
		width: "30%"
	},
	btnText:{
		fontFamily: FONT_FAMILY.MEDIUM,
		color: COLORS.WHITE,
		padding: 10,
		textAlign: 'center'
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
  }
})
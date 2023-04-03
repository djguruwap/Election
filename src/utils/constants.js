import AsyncStorage from '@react-native-async-storage/async-storage';
import {Dimensions, Platform} from 'react-native';
const {height, width} = Dimensions.get('window');

export const FONT_FAMILY = {
  REGULAR: 'Poppins-Regular',
  LIGHT: 'Poppins-Light',
  MEDIUM: 'Poppins-Medium',
  THIN: 'Poppins-Thin',
  BOLD: 'Poppins-Bold',
};

export const FONT_SIZE = {
  MICRO: 12,
  SMALL: 14,
  MEDIUM: 16,
  LARGE: 18,
  BIG: 20,
};

export const HEIGHT = {
  FULL_SCREEN: height,
  HALF_SCREEN: height / 2,
  ONE_FOURTH_SCREEN: height / 4,
  ONE_SIX_SCREEN: height / 6,
};

export const COLORS = {
  PRIMARY: '#0081C9',
  PRIMARY_1: '#0081C9',
  PRIMARY_2: '#5BC0F8',
  PRIMARY_3: '#86E5FF',
  SECENDARY: '#FFC93C',
  TARTIARY: '#FFAC0E',
  WHITE: '#FFFFFF',
  GRAY: '#727272',
  BLACK: '#000',
  GRAY_LIGHT: '#B4B4B4',
  TEXT_PURPLE: '#748AF9',
  TEXT_BLUE: '#56A5FF',
  INPUT_GRAY: '#F6F6F6',
  INPUT_GRAY_BORDER: '#DEDEDE',
  RED: '#FB4646',
  TEXT_BLACK: '#1E1E1E',
  STOP: '#dc3545',
  MOVING: '#28a745',
  IDLE: '#ffc107',
  OFFLINE: '#6c757d',
};

export const STYLES = {
  LIGHT_TEXT: {
    fontFamily: FONT_FAMILY.LIGHT,
    fontSize: FONT_SIZE.SMALL,
    color: COLORS.BLACK,
  },
  NORMAL_TEXT: {
    fontFamily: FONT_FAMILY.REGULAR,
    fontSize: FONT_SIZE.SMALL,
    color: COLORS.BLACK,
  },
  BOLD_TEXT: {
    fontFamily: FONT_FAMILY.BOLD,
    fontSize: FONT_SIZE.SMALL,
    color: COLORS.BLACK,
  },
};

export const SCREEN = {
  HEIGHT: height,
  WIDTH: width,
};

export const WINDOW = {
  HEIGHT: height,
  WIDTH: width,
};

export const PADDING = {
  SMALL: 5,
  MEDIUM: 10,
  LARGE: 15,
};

export const base_url = 'https://election.ink/updated/api';

export const APP_TYPE = Platform.OS === 'ios' ? 'IOS' : 'ANDROID';

export const defaultImg =
  'https://cdn.iconscout.com/icon/free/png-256/avatar-372-456324.png';
export const noImageAvil = 'https://img.icons8.com/plasticine/2x/no-image.png';
export const defaultImg2 =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGoi6tgg0I3tufxGhZs9wH82dQqwiEqEjJcxMIRKdDfv23-LwgnMIkBmHw0ltK3m3CZ7I&usqp=CAU';

export const dummyImage =
  'https://pbs.twimg.com/profile_images/1166471091663122433/5ULjGFJS.jpg';

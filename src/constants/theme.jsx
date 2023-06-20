import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');


export const light = {
    gray: '#8b8989',
    lightGray: '#D1D5DB',
    light: '#fbfbfb',
    white: '#E8EAED',
    black: '#100F10',
    purple: '#6C5CE7'
};

export const dark = {   
    gray: '#3D3A50',
    black: '#1A1C22',
    purple: '#6C5CE7'
};

export const shadow = {
    light: {
        shadowColor: light.black,
        shadowRadius: 4,
        shadowOpacity: 0.1,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        elevation: 5
    },
    dark: {
        shadowColor: light.black,
        shadowRadius: 4,
        shadowOpacity: 0.3,
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },
};

export const sizes = {
    width,
    height,
    title: 32,
    h2: 24,
    h3: 18,
    body: 14,
    radius: 16,
};

export const spacing = {
    s: 8,
    m: 18,
    l: 24,
    xl: 40,
};
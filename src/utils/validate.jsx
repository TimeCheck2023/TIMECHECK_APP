import { View, Text } from 'react-native'
import React from 'react'

const validate = (data, num) => {
    switch (num) {
        case 1:
            if (data.documentType === 'Tipo de documento') {
                return {
                    message: 'Debes ecoger un tipo de documento',
                    isvalid: false
                }
            } else if (!data.documentNumber) {
                return {
                    message: 'Debes ecoger un numero de documento',
                    isvalid: false
                }
            } else if (!data.fullName) {
                return {
                    message: 'Please input fullname',
                    isvalid: false
                }
            } else if (!data.address) {
                return {
                    message: 'Please input address',
                    isvalid: false
                }
            } else if (!data.emailAddress) {
                return {
                    message: 'Please input email',
                    isvalid: false
                }
            } else if (!data.emailAddress.match(/\S+@\S+\.\S+/)) {
                return {
                    message: 'Please input a valid email',
                    isvalid: false
                }
            } else if (!data.password) {
                return {
                    message: 'Please input password',
                    isvalid: false
                }
            } else if (data.password.length < 5) {
                return {
                    message: 'Min password length of 5',
                    isvalid: false
                }
            }
            break;
        case 2:
            if (!data.fullNameOrg) {
                return {
                    message: 'Please input fullname',
                    isvalid: false
                }
            } else if (!data.addressOrg) {
                return {
                    message: 'Please input address',
                    isvalid: false
                }
            } else if (!data.emailAddressOrg) {
                return {
                    message: 'Please input email',
                    isvalid: false
                }
            } else if (!data.emailAddressOrg.match(/\S+@\S+\.\S+/)) {
                return {
                    message: 'Please input a valid email',
                    isvalid: false
                }
            } else if (!data.passwordOrg) {
                return {
                    message: 'Please input password',
                    isvalid: false
                }
            } else if (data.passwordOrg.length < 5) {
                return {
                    message: 'Min password length of 5',
                    isvalid: false
                }
            }
            break;
        default:
            break;
    }
    return {
        isvalid: true,
    };
}

export default validate
import React from 'react';
import {
    TouchableOpacity,
    Text
} from 'react-native';
import { COLORS } from '../constants';

const TextButton = ({ buttonContainerStyle, label, disabled, labelStyle, onPress }) => {
    return (
        <TouchableOpacity
            style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: COLORS.primary,
                ...buttonContainerStyle
            }}
            disabled={disabled}
            onPress={onPress}
        >
            <Text
                style={{
                    color: COLORS.white,

                    ...labelStyle
                }}
            >
                {label}
            </Text>
        </TouchableOpacity>
    )
}

export default TextButton;
import React from 'react';
import { TouchableOpacity,Text } from 'react-native';

const TabButton = ({item,onPress,label,contentContainerStyle,textStyle}) => {
    return(
        <TouchableOpacity
            style={{
                ...contentContainerStyle
            }}
            onPress={onPress(item)}
        >
            <Text style={{...textStyle}}>{label}</Text>
        </TouchableOpacity>
    )
}

export default TabButton;
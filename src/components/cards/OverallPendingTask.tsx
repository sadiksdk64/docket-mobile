import { Dimensions, StyleSheet} from "react-native";
import * as Progress from 'react-native-progress';
import React from "react";
import {View, Text} from 'native-base';

const OverallPendingTask = ({max,value}:{max:number,value:number}) => {
    const progressValue = value/max;
    const screenWidth = Dimensions.get("window").width;
    return (
        <View flex="1" bg="white" p="4" mt="2" rounded="xl">
            <Text fontFamily="Roboto" fontStyle="normal" fontWeight="bold" fontSize="16" lineHeight="19" letterSpacing="0.5" textTransform="uppercase">OVERALL PENDING TASK</Text>
            <Text fontFamily="Roboto" fontStyle="normal" fontWeight="normal" fontSize="18" lineHeight="27" letterSpacing="0.5" color="#92929D" alignSelf="flex-end">{value}/{max}</Text>
            <Progress.Bar 
            progress={progressValue} 
            width={screenWidth - 60} 
            borderWidth = {0}
            height={18} 
            borderRadius={16} 
            unfilledColor="rgba(100, 179, 235, 0.28)"
            color="rgb(100, 179, 235)"
            />
        </View>
    )
}

export default OverallPendingTask;

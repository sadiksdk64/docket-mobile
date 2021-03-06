import {TouchableHighlight } from "react-native";
import Unchecked from './../../assets/images/unchecked.svg';
import Checked from './../../assets/images/checked.svg';
import React from "react";
import {View, Text, Spinner} from 'native-base';
import { TaskState } from "../screens/my-day-tasks/taskSlice";

const TaskTable = ({row,handleModal,toggleStatus}:{row:TaskState,handleModal:Function,toggleStatus:Function}) => {
    return (
        <View flex="1" flexDirection="row" bg={row.status == "completed" ? "#F6FFFB" : "#EDF1F9"} justifyContent="space-between" p="3" mt="2" shadow="0.05" rounded="xl">
            <TouchableHighlight onPress={() => handleModal(row)}>
                <View>
                    <Text fontFamily="Roboto" fontStyle="normal" fontSize="16" fontWeight="bold" letterSpacing="0.5">{row.name}</Text>
                    <Text fontFamily="Roboto" fontStyle="normal" fontSize="14" fontWeight="normal" letterSpacing="0.2" lineHeight="21" color="#171725">{row.categoryName}</Text>
                </View>
            </TouchableHighlight>
            <View flex="1" justifyContent="center" alignItems="flex-end" >
                {row.isLoading == true && <Spinner accessibilityLabel="Loading"  size="lg" color="black.800" />}
                {row.isLoading != true &&
                    <TouchableHighlight onPress={() => toggleStatus(row)} underlayColor="white">
                        {
                            row.status == "completed" ? <Checked /> : <Unchecked />
                        }
                    </TouchableHighlight>
                }
            </View>
        </View>
    )
}

export default TaskTable;
import React from "react";
import { Text, View } from "native-base";
import { useState } from "react";
import { Button, TextInput, TouchableHighlight } from "react-native";

const TextChanger = ({value,changeKey,handleChange,title}:{value:string,changeKey:string,handleChange:any,title:string}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [newCategory, setNewCategory] = useState('');

    return (
        <View flex="1" pl="3">
        <Text fontFamily="Roboto" fontStyle="normal" fontWeight="normal" fontSize="12" lineHeight="14" color="#92929D" textTransform="uppercase">{title}</Text>
        {
            isOpen &&
            <View flex="1" flexDirection="row" >
                <TextInput width="70%" value={newCategory} onChangeText={(text) => setNewCategory(text)} />
                <Button title="Update" onPress={() => {handleChange(changeKey,newCategory);setIsOpen(false)}}/>
            </View>
        }
        {
            !isOpen &&
            <TouchableHighlight onPress={() => {setIsOpen(true)}}>
                <Text fontFamily="Roboto" fontStyle="normal" fontWeight={changeKey=="" ? "bold" : "normal"} pt={changeKey=="" ? "0" : "2"}  fontSize="14" lineHeight="16" letterSpacing="0.1">{value ? value : "-"}</Text>
            </TouchableHighlight>
        }
    </View>
    )
}

export default TextChanger;
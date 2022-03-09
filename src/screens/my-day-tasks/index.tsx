import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import FilterIcon from './../../../assets/images/filter.svg';
import { useEffect, useState } from "react";
import Filter from "../../components/Filter";
import TaskTable from '../../components/TaskTable';
import Add from './../../../assets/images/addicon.svg';
import AddTask from './AddTask';
import TaskModal from "../../components/TaskModal";
import React from "react";
import {View,HStack, ScrollView, Pressable, Text} from 'native-base';
import { tasksRequested } from "./taskSlice";


const MyDayTasks = () => {
    const dispatch = useDispatch();
    const [task, setTask] = useState(null);
    const tasks = useSelector((state: RootState) => state.task.tasks);
    const isLoading = useSelector((state: RootState) => state.task.isLoading);
    const [filter, setFilter] = useState('all');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisibleEdit, setModalVisibleEdit] = useState(false);

    useEffect(() => {
        dispatch(tasksRequested({}));
    }, [dispatch])

    const openModal = (task:any) => {
        setTask(task);
        setModalVisibleEdit(true);
    }

    const changeFilter = (filter:string) => {
        setFilter(filter);
    }

    const filteredList = (filter === 'all') ? 
    tasks.filter(task => (task.dueDate.substring(0, 10) === new Date().toISOString().split('T')[0]))
    : 
    tasks.filter(task => task.dueDate.substring(0, 10) === new Date().toISOString().split('T')[0] && task.status === filter);
    const list = filteredList && filteredList.length > 0 ?
    filteredList.map((row: any) =>
            <TaskTable row={row} handleModal={openModal} key={row.id} />
        ) :
        <Text>No tasks found</Text>

    return (
        <View p="3" flex="1">
            <HStack>
                <View flex="1">
                    <Filter filter={filter} filterValues={['all','pending','completed']} filterHandler={changeFilter} />
                </View>
                <View justifyContent="center" bg="white" rounded="xl" p="3" ml="1">
                    <FilterIcon />
                </View>
            </HStack>
            <ScrollView>
                {isLoading ? <Text>Loading...</Text> : list}
                {/* {list} */}
            </ScrollView>
            <Pressable onPress={() => setModalVisible(true)}>
                <View position="absolute" right="5" bottom="5" width="20" height="20" bg="#6b8ae6" borderRadius="40" justifyContent="center" alignItems="center">
                    <Add />
                </View>
            </Pressable>
            <AddTask modalVisible={modalVisible} setModalVisible={setModalVisible}/>
            <TaskModal 
                task={task}
             modalVisibleEdit={modalVisibleEdit} 
             setModalVisibleEdit={setModalVisibleEdit} 
             />
        </View>
    )
}

export default MyDayTasks;

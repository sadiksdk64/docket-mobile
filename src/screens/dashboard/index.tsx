import OverallPendingTask from "../../components/cards/OverallPendingTask";
import SuccessRate from "../../components/cards/SuccessRate";
import TotalHoursChart from "../../components/cards/TotalHoursChart";
import WorkingHoursChart from "../../components/cards/WorkingHoursChart";
import Filter from "../../components/Filter";
import React, { useCallback, useEffect, useState } from "react";
import { ScrollView, Text} from 'native-base';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { analyticsCategoryRequested, analyticsRequested } from "./analyticsSlice";
import Error from "../../components/Error";
import { Platform, RefreshControl } from "react-native";

const Dashboard = ():JSX.Element => {

    const dispatch = useDispatch();
    const filterValues = ["today", "week", "month","year","custom"];
    const [filter, setFilter] = useState("year");

    const taskSuccessData = useSelector((state: RootState) => state.analytics.data);
    const isLoading = useSelector((state: RootState) => state.analytics.isSuccessLoading);
    const error = useSelector((state: RootState) => state.analytics.error);


    useEffect(() => {
        filterHandler(filter);
    }, [])

    const filterHandler = (filter: string) => {
        let startDate = new Date();
        if(filter === "month")
        {
            startDate = new Date(new Date().setMonth(new Date().getMonth() - 1))
        }
        else if(filter === "year")
        {
            startDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1))
        }
        else if(filter === "week")
        {
            startDate = new Date(new Date().setDate(new Date().getDate() - 7)) 
        }
        requestAnalyticsChange(startDate, new Date());   
        setFilter(filter);
    }

    const requestAnalyticsChange = (startDate:Date, endDate:Date) => {
        dispatch(analyticsCategoryRequested({"startDate":startDate.toISOString().split("T")[0],"endDate":endDate.toISOString().split("T")[0]}))
        dispatch(analyticsRequested({"startDate":startDate.toISOString().split("T")[0],"endDate":endDate.toISOString().split("T")[0]}));
    }

    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        filterHandler(filter);
        setRefreshing(false);
    }, []);
    return (
        <ScrollView p="3"
        refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        >
            {error && !isLoading && <Error error={error} />}
            <Text fontFamily="Poppins" fontStyle="normal" fontWeight={Platform.OS === 'ios' ? "600" : "bold"} fontSize="20" lineHeight="30" >Overview</Text>
            <Filter filter={filter} filterValues={filterValues} filterHandler={(value) => filterHandler(value)} />
            <TotalHoursChart />
            <WorkingHoursChart labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']}  legends={['Category 1', 'Category 2', 'More']} dataset={[[10, 20, 10], [10, 40,50], [10, 10, 10], [10, 20, 10], [10, 40,50], [10, 10, 10], [10, 20, 10]]}/>
            <OverallPendingTask 
                max={('totalTasks' in taskSuccessData) ? taskSuccessData['totalTasks'] : 1} 
                value={('completedTasks' in taskSuccessData) ? taskSuccessData['completedTasks'] : 1}  
                isLoading={isLoading}
            />
            <SuccessRate 
                rate={('successPercentage' in taskSuccessData) ? taskSuccessData['successPercentage'] : "-"} 
                isLoading={isLoading}
            />
        </ScrollView>
    );
}

export default Dashboard;
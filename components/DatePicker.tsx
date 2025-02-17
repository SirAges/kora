import React, { useState } from "react";
import { View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useDispatch, useSelector } from "react-redux";
import { addToBooking, selectCurrentBooking } from "@/redux/globalSlice";
import ThemedText from "@/components/ThemedText";

const DatePicker = ({ title, isStart }) => {
    const [showDate, setShowDate] = useState(false);
    const [showTime, setShowTime] = useState(false);
    const [tempDate, setTempDate] = useState(null);

    const dispatch = useDispatch();
    const { startDate, endDate } = useSelector(selectCurrentBooking);

    const formatDate = date => date.toISOString().split("T")[0]; // YYYY-MM-DD
    const formatTime = date =>
        date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const handleDateChange = (event, date) => {
        if (date) {
            setTempDate(date);
            setShowDate(false);
            setShowTime(true);
        }
    };

    const handleTimeChange = (event, time) => {
        if (time && tempDate) {
            setShowTime(false);

            const fullDate = new Date(tempDate);
            fullDate.setHours(time.getHours(), time.getMinutes(), 0, 0);

            dispatch(
                addToBooking({
                    [isStart ? "startDate" : "endDate"]: fullDate.toISOString()
                })
            );
        }
    };

    return (
        <>
            <View className={isStart ? "items-start" : "items-end"}>
                <ThemedText
                    onPress={
                        !isStart && !startDate ? null : () => setShowDate(true)
                    }
                    className="text-xs"
                >
                    {title}
                </ThemedText>

                {(isStart ? startDate : endDate) && (
                    <>
                        <ThemedText
                            onPress={() => setShowDate(true)}
                            className="text-md font-semibold capitalize"
                        >
                            {formatDate(
                                new Date(isStart ? startDate : endDate)
                            )}
                        </ThemedText>
                        <ThemedText
                            onPress={() => setShowDate(true)}
                            className="text-xs"
                        >
                            {formatTime(
                                new Date(isStart ? startDate : endDate)
                            )}
                        </ThemedText>
                    </>
                )}
            </View>

            {showDate && (
                <DateTimePicker
                    testID="datePicker"
                    value={new Date()}
                    mode="date"
                    display="default"
                    minimumDate={
                        isStart
                            ? null
                            : startDate
                            ? new Date(startDate)
                            : new Date()
                    }
                    onChange={handleDateChange}
                />
            )}

            {showTime && (
                <DateTimePicker
                    testID="timePicker"
                    value={new Date()}
                    mode="time"
                    is24Hour
                    display="default"
                    onChange={handleTimeChange}
                />
            )}
        </>
    );
};

export default DatePicker;

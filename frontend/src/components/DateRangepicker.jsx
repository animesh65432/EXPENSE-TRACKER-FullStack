import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

const DateRangePicker = () => {
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;

    return (
        <DatePicker
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => {
                setDateRange(update);
            }}
            isClearable={true}
            monthsShown={2}
            calendarClassName="bg-white border border-gray-300 rounded-lg shadow-lg p-4 font-sans"
            dateFormat="MMMM d, yyyy"
            className="sm:w-96 sm:h-10 w-80 rounded-lg border border-gray-300 px-4 text-gray-800 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ease-in-out hover:border-blue-400"
            placeholderText="SELECT DATE"
            popperClassName="shadow-xl"
            popperModifiers={[
                {
                    name: 'offset',
                    options: {
                        offset: [0, 8]
                    }
                }
            ]}
            wrapperClassName="relative"
        />
    );
};

export default DateRangePicker;
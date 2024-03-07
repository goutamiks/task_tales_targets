import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";

const CalendarView = () => {
  const [calendarData, setCalendarData] = useState([]);

  useEffect(() => {
    // Fetch calendar data from the backend API
    fetch("http://localhost:5002/api/calendar")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch calendar data");
        }
        return response.json();
      })
      .then((data) => {
        setCalendarData(data);
      })
      .catch((error) => {
        console.error("Error fetching calendar data:", error);
      });
  }, []);

  // Prepare data for ECharts
  const chartData = calendarData.map((event) => ({
    name: event.name,
    value: event.value,
  }));

  const option = {
    tooltip: {},
    xAxis: { type: "category" },
    yAxis: { type: "value" },
    series: [{ type: "bar", data: chartData }],
  };

  return <ReactECharts option={option} style={{ height: "300px" }} />;
};

export default CalendarView;

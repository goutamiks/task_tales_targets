import React, { useState, useEffect } from "react";
import { ResponsiveCalendar } from "@nivo/calendar";
import { ResponsiveBar } from "@nivo/bar";

const Dashboard = () => {
  const [statusCounts, setStatusCounts] = useState([]);
  const [dailyCounts, setDailyCounts] = useState([]);

  useEffect(() => {
    fetchStatusCounts();
    fetchDailyCounts();
  }, []);

  const fetchStatusCounts = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await fetch(
        `http://localhost:5002/api/auth/getStatusCounts?userId=${userId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch status counts");
      }
      const data = await response.json();
      // Transform statusCounts object into an array of objects with id and value properties
      const transformedData = Object.keys(data).map((key) => ({
        id: key,
        value: parseInt(data[key]),
      }));
      setStatusCounts(transformedData);
    } catch (error) {
      console.error("Error fetching status counts:", error);
    }
  };

  const fetchDailyCounts = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await fetch(
        `http://localhost:5002/api/auth/fetchDailyCounts?userId=${userId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch daily counts");
      }
      const data = await response.json();

      // Transform the date format and rename properties
      const transformedData = data.map((item) => ({
        day: item.date.split("T")[0], // Extract date without time
        value: item.count,
      }));

      setDailyCounts(transformedData);
    } catch (error) {
      console.error("Error fetching daily counts:", error);
    }
  };

  return (
    <div>
      <div className="card" style={{ flexBasis: "45%", marginLeft: "10px" }}>
        <h2 style={{ color: "#1876D1" }}>Number of Task In Each Day</h2>
        <div style={{ height: "300px" }}>
          <ResponsiveCalendar
            data={dailyCounts}
            from="2024-01-01"
            to="2024-12-31"
            emptyColor="#eeeeee"
            colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
            margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
            yearSpacing={40}
            monthBorderColor="#ffffff"
            dayBorderWidth={2}
            dayBorderColor="#ffffff"
            legends={[
              {
                anchor: "bottom-right",
                direction: "row",
                translateY: 36,
                itemCount: 4,
                itemWidth: 42,
                itemHeight: 36,
                itemsSpacing: 14,
                itemDirection: "right-to-left",
              },
            ]}
          />
        </div>
      </div>

      <div className="card" style={{ flexBasis: "45%", marginRight: "10px" }}>
        <h2 style={{ color: "#1876D1" }}>Overall Events Based on the Status</h2>
        <div style={{ height: "500px" }}>
          <ResponsiveBar
            data={statusCounts}
            keys={["value"]}
            indexBy="id"
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            padding={0.3}
            colors={{ scheme: "category10" }}
            borderWidth={1}
            borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

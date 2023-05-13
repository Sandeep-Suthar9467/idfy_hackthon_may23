import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import Loader from "../loader";

const VIDEO_STATS_URL = "http://127.0.0.1:5000/video_stats";
const Dashboard = () => {
  const [statsData, setStatsData] = useState({});
  const chartDataInitial = [
    { name: "1", value: 0, color: "red", code: "#e50c3b" },
    { name: "2", value: 0, color: "blue", code: "#36A2EB" },
    { name: "3", value: 0, color: "green", code: "#41db62" },
    { name: "4", value: 0, color: "pink", code: "#df2ab8" },
    { name: "5", value: 0, color: "yellow", code: "#FFCE56" },
  ];
  const chartDataResInitial = [
    { name: "240", value: 0, color: "green", code: "#41db62" },
    { name: "360", value: 0, color: "red", code: "#e50c3b" },
    { name: "480", value: 0, color: "pink", code: "#df2ab8" },
    { name: "720", value: 0, color: "yellow", code: "#FFCE56" },
    { name: "1080", value: 0, color: "blue", code: "#36A2EB" },
  ];
  const [chartData, setChartData] = useState(chartDataInitial);
  const [chartDataRes, setChartDataRes] = useState(chartDataResInitial);
  const [loader, setLoader] = useState(false);

  const setData = (data) => {
    let score = data?.video_quality_group;
    let resolution = data?.resolution_group;
    let new_score = [];
    let new_resolution = [];
    if (score) {
      let res = {};
      let total = 0;
      score.map((item) => {
        res[item[0]] = item[1];
        total += item[1];
      });
      new_score = chartData.map((item) => {
        if (res[item.name]) {
          item.value = Math.round(res[item.name] * 100) / total || 0;
        }
        return item;
      });
    }

    if (resolution) {
      let res = {};
      let total = 0;
      resolution.map((item) => {
        res[item[0]] = item[1];
        total += item[1];
      });
      new_resolution = chartDataRes.map((item) => {
        if (res[item.name]) {
          item.value = Math.round(res[item.name] * 100) / total || 0;
        }
        return item;
      });
    }
    setStatsData(data);
    setChartData(new_score);
    setChartDataRes(new_resolution);
  };

  const getStats = () => {
    let options = {
      url: VIDEO_STATS_URL,
      method: "GET",
      // headers: {
      //   'Content-Type': 'application/json'
      // },
    };
    setLoader(true);
    axios
      .request(options)
      .then((data) => {
        setData(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setLoader(false);
  };

  const getColors = (props) => {
    if (props.key == "multiple_faces_percentage") {
      if (Number(statsData?.[props.key]) < 10) return "success";
      return "alert";
    }
    return "";
  };

  useEffect(() => {
    getStats();
  }, []);
  const card = (props) => {
    return (
      <div className="card flex-column" title={props.title || props.name}>
        <span className="font-bold">{props.name}</span>

        <span className={`${getColors(props)}`}>
          {statsData[props.key]
            ? Number(statsData?.[props.key]).toFixed(2)
            : "N/A"}
          {statsData[props.key] && props.extention}
        </span>
      </div>
    );
  };

  const colors = ["redish", "blue", "yellow"];

  let stats = [
    {
      title: "",
      value: 0,
      name: "Total Completed Calls",
      key: "total_completed_calls",
    },
    {
      title: "",
      value: 0,
      name: "Multiple face Detection",
      extention: "%",
      key: "multiple_faces_percentage",
    },
    {
      title: "",
      value: 0,
      name: "Average Bit Rate",
      extention: "Mbps",
      key: "average_bit_rate",
    },
    {
      title: "",
      value: 0,
      name: "Average Frame Rate",
      extention: "fps",
      key: "average_frame_rate",
    },
    {
      title: "",
      value: 0,
      name: "P90 Blurriness",
      extention: "",
      key: "blurriness",
    },
    {
      title: "",
      value: 0,
      name: "P90 Blockiness",
      extention: "",
      key: "blockiness",
    },
    {
      title: "",
      value: 0,
      name: "P90 Flatiness",
      extention: "",
      key: "flatness",
    },
    { title: "", value: 0, name: "P90 PSNR", extention: "", key: "psnr" },
  ];
  return (
    <div className="m1 mt2 container">
      {loader && <Loader />}
      <div className="grid-container">
        {stats.map((item) => {
          return (
            <div className="grid-item" key={item.name}>
              {card(item)}
            </div>
          );
        })}
      </div>

      <div className="mt2">
        <div className="flex-row-center font-size">
          <div>
            <span className="font-bold">Video Quality Score</span>
            <span>
              <PieChart width={300} height={300}>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  className="cursor-pointer"
                >
                  {chartData.map((item, index) => (
                    <Cell key={`cell-${index}`} fill={item.code} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </span>
          </div>
          <div className="gap10">
            <span>Score</span>
            {chartData.map((item, idx) => {
              return (
                <div key={idx} className="flex-row-center mt10">
                  <span className={`rectangle-${item.color}`}></span>
                  <span>{item.name}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex-row-center font-size">
          <div>
            <span className="font-bold">Overall Call Resolutions</span>
            <span>
              <PieChart width={300} height={300}>
                <Pie
                  data={chartDataRes}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  className="cursor-pointer"
                >
                  {chartDataRes.map((item, index) => (
                    <Cell key={`cell-${index}`} fill={item.code} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </span>
          </div>
          <div className="gap10">
            <span>Resolutions</span>
            {chartDataRes.map((item, idx) => {
              return (
                <div key={idx} className="flex-row-center mt10">
                  <span className={`rectangle-${item.color}`}></span>
                  <span>{item.name}p</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

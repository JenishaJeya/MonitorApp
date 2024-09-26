import "./App.css";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";



function App() {
  const [tempSeries, setTempSeries] = useState([]);
  const [humiditySeries, setHumiditySeries] = useState([]);
  const [lightSeries, setLightSeries] = useState([]);
  const [dataSeries, setDataSeries] = useState([]);
  const [loading, setLoading] = useState(true);


  // Updates the data series
  const updateData = () => {
    setDataSeries([
      {
        name: "Temperature",
        data: tempSeries,
      },
      {
        name: "Humidity",
        data: humiditySeries,
      },
      {
        name: "Light",
        data: lightSeries,
      },
    ]);
  };

  // Upon loading the page, load in data from file or server
  // In this example, it just loads a static file from the "public" folder
  useEffect(() => {
    fetch("http://127.0.0.1:3001/products")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const temp =[];
        const humidity = [];
        const light = [];
        for (let index = 0; index < data.length; index++) {
          temp.push(data[index].Temperature);
          humidity.push(data[index].Humidity);
          light.push(data[index].Light);
        }
        setTempSeries(temp);
        setHumiditySeries(humidity);
        setLightSeries(light);
        setLoading(false);
      }).catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    updateData();
  }, [loading]);

  if (loading) {
    return <div>TEST</div>;
  }



  // ApexCharts needs some default options to know what to show
  const options = {
    options: {
      chart: {
        height: 350,
        type: "area",
      },
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
      noData: {
        text: "Loading...",
      },
    },
  };

  return (
    <div className="App">
      <Chart options={options} series={dataSeries} type="area" height={350} />
    </div>
  );
  }
export default App;

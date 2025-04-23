import { useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { Card, CardBody, CardHeader } from "react-bootstrap";
import { useSelector } from "react-redux";
import { currencyHandler } from "../../../helpers/currencyHandler";

const SalesOverviewCard = () => {
  const { data } = useSelector((store) => store.Dashboard);
  const monthlySalesOverview = data?.monthlySalesOverview || [];
  // const monthlySalesOverview = [
  //   { month: "January", earning: 10000, order: 50009, refunded: 845799 },
  //   { month: "February", earning: 9489, order: 95686, refunded: 9989 },
  //   { month: "March", earning: 989898, order: 10000, refunded: 50009 },
  //   { month: "April", earning: 845799, order: 9489, refunded: 95686 },
  //   { month: "May", earning: 9989, order: 989898, refunded: 10000 },
  //   { month: "June", earning: 50009, order: 845799, refunded: 9489 },
  //   { month: "July", earning: 95686, order: 9989, refunded: 989898 },
  //   { month: "August", earning: 10000, order: 50009, refunded: 845799 },
  //   { month: "September", earning: 9489, order: 95686, refunded: 9989 },
  //   { month: "October", earning: 989898, order: 10000, refunded: 50009 },
  //   { month: "November", earning: 845799, order: 9489, refunded: 95686 },
  //   { month: "December", earning: 9989, order: 989898, refunded: 10000 },
  // ];

  const series = [
    {
      name: "Earnings",
      data: monthlySalesOverview.map((item) => item.earning),
    },
    {
      name: "Customer",
      data: monthlySalesOverview.map((item) => item.customer),
    },
    {
      name: "Refund",
      data: monthlySalesOverview.map((item) => item.refunded),
    },
  ];

  const options = {
    chart: {
      area: {
        yaxis: {
          grid: {
            borderColor: "#000000",
          },
        },
      },
      // height: 350,
      type: "area",
      toolbar: {
        show: false,
      },
    },
    colors: ["#1eb756", "#628ccf", "#ec6321"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      categories: monthlySalesOverview.map((item) => item.month),
      // title: {
      //   text: "Months",
      // },
    },
    yaxis: {
      // title: {
      //   text: "Amount",
      // },
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      formatter: function (seriesName) {
        return `<div class="text-color-secondary fs-14 fw-medium ms-1">${seriesName}</div>`;
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 1,
        stops: [100],
      },
    },
    tooltip: {
      y: {
        formatter: (val, { seriesIndex }) => {
          const seriesName = series[seriesIndex].name;
          if (seriesName === "Earnings" || seriesName === "Refund") {
            return currencyHandler(val);
          }
          return val;
        },
      },
    },
    responsive: [
      {
        breakpoint: 576, // xs screen breakpoint
        options: {
          legend: {
            horizontalAlign: "center",
          },
        },
      },
    ],
  };
  return (
    <Card
      className={`salary-overview position-relative min-h-400 lg-h-0 bg-white border common-border-color br-5 p-3 pb-0`}
    >
      {/* <CardHeader
        className={`border-0 bg-transparent d-flex align-items-center justify-content-between flex-wrap gap-3 p-0`}
      >
        <div className={`heading`}>
          <span
            className={`text-capitalize text-color-primary fw-medium fs-16 lh-base`}
          >
            sales overview
          </span>
        </div>
      </CardHeader> */}
      <CardBody className={`p-0`}>
        <div
          className={`position-absolute xs-position-relative start-0 top-0 mt-20 mt-xs-0 ms-sm-3 heading`}
        >
          <span
            className={`text-capitalize text-color-primary fw-medium fs-16 lh-base`}
          >
            sales overview
          </span>
        </div>
        <div className={``}>
          <ReactApexChart
            options={options}
            series={series}
            type="area"
            height={367}
          />
        </div>
      </CardBody>
    </Card>
  );
};

export default SalesOverviewCard;

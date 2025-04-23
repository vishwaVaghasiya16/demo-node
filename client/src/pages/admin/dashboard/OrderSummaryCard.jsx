import { useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { Card, CardBody, CardHeader } from "react-bootstrap";
import { useSelector } from "react-redux";

const OrderSummaryCard = () => {
  const { data } = useSelector((store) => store.Dashboard);

  const donutSeries = [
    parseFloat(data?.completedOrders?.percentage),
    parseFloat(data?.pendingOrders?.percentage),
    parseFloat(data?.orderRefund?.percentage),
  ];

  const donutOptions = {
    chart: {
      height: 350,
      type: "donut",
      offsetX: 0,
      offsetY: 30,
    },
    labels: ["Completed", "Pending", "Refund"],
    colors: ["#1eb756", "#F59E0B", "#628ccf"],
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      formatter: function (seriesName) {
        return `<div class="text-color-secondary fs-14 fw-medium ms-1">${seriesName}</div>`;
      },
    },
    stroke: {
      show: false,
    },
    dataLabels: {
      formatter: function (val) {
        return val.toFixed(0) + "%";
      },
      dropShadow: {
        enabled: true,
      },
    },
    // plotOptions: {
    //   pie: {
    //     donut: {
    //       labels: {
    //         show: true,
    //         total: {
    //           show: true,
    //           fontSize: "16px",
    //           formatter: function () {
    //             return `100%`;
    //           },
    //         },
    //       },
    //     },
    //   },
    // },
    responsive: [
      {
        breakpoint: 1200,
        options: {
          chart: {
            offsetY: 0,
          },
        },
      },
    ],
  };
  return (
    <Card
      className={`min-h-400 lg-h-0 bg-white border common-border-color br-5 p-3 pb-0`}
    >
      {/* <CardHeader
        className={`border-0 bg-transparent d-flex align-items-center justify-content-between flex-wrap gap-3 p-0`}
      >
        <div className={`heading`}>
          <span
            className={`text-capitalize text-color-primary fw-medium fs-16 lh-base`}
          >
            order summary
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
            order summary
          </span>
        </div>
        <div className={`pb-2`}>
          <ReactApexChart
            options={donutOptions}
            series={donutSeries}
            type="donut"
            height={367}
          />
        </div>
      </CardBody>
    </Card>
  );
};

export default OrderSummaryCard;

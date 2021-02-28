import moment from "moment";

const LAUNCH_FILTERS = [
  {
    key: 0,
    value: "all",
    name: "All Launches",
  },
  {
    key: 1,
    value: "upcoming",
    name: "Upcoming Launches",
  },
  {
    key: 2,
    value: "success",
    name: "Successful Launches",
  },
  {
    key: 3,
    value: "failed",
    name: "Failed Launches",
  },
];

const STATUS_TYPES = [
  {
    label: "Upcoming",
    variable: "upcoming",
    value: true,
    backgroundColor: "rgba(254, 243, 199, 1)",
    color: "rgba(146, 64, 15, 1)",
  },
  {
    label: "Success",
    variable: "success",
    value: true,
    backgroundColor: "rgba(222, 247, 236, 1)",
    color: "rgba(3, 84, 63, 1)",
  },
  {
    label: "Failed",
    variable: "success",
    value: false,
    backgroundColor: "rgba(253, 226, 225, 1)",
    color: "rgba(152, 27, 28, 1)",
  },
];

const DURATION_FILTERS = {
  0: {
    value: 0,
    lb: moment(new Date()).subtract(7, "days").toISOString(),
    ub: moment(new Date()).toISOString(),
    label:"Last week",
    modalLabel:"Past week"
  },
  1: {
    value: 1,
    ub: moment(new Date()).toISOString(),
    lb: moment(new Date()).subtract(1, "months").toISOString(),
    label:"Last month",
    modalLabel:"Past Month",
  },
  2: {
    value: 2,
    ub: moment(new Date()).toISOString(),
    lb: moment(new Date()).subtract(3, "months").toISOString(),
    label:"Last 3 months",
    modallabel:"Past 3 months",
  },
  3: {
    value: 3,
    ub: moment(new Date()).toISOString(),
    lb: moment(new Date()).subtract(6, "months").toISOString(),
    label:"Last 6 months",
    modalLabel:"Past 6 months",
  },
  4: {
    value: 4,
    ub: moment(new Date()).toISOString(),
    lb: moment(new Date()).subtract(1, "years").toISOString(),
    label:"Last year",
    modalLabel:"Past year"
  },
  5: {
    value: 5,
    ub: moment(new Date()).toISOString(),
    lb: moment(new Date()).subtract(2, "years").toISOString(),
    label:"Last 2 years",
    modalLabel:"Past 2 years"
  },
};

export { LAUNCH_FILTERS, STATUS_TYPES, DURATION_FILTERS };

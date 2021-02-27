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

export { LAUNCH_FILTERS, STATUS_TYPES };

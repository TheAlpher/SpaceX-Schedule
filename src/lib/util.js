import { LAUNCH_FILTERS, DURATION_FILTERS } from "./constants";
function validLaunchFilterCheck(val) {
  //0 -> All Launches  1-> Upcoming Launches 2-> Successful Launches 3-> Failed Launches
  if (LAUNCH_FILTERS.findIndex((ele) => ele.key === val) !== -1) {
    return true;
  }
  return false;
}
function validDurationFilterCheck(val) {
  //6 for custom range filter
  if (
    val.toString() == "6" ||
    Object.keys(DURATION_FILTERS).find((ele)=>ele==val.toString())!==undefined
  ) {
    return true;
  }
  return false;
}

function validDurationRangeFilters(lb, ub) {
  try {
    let d1 = new Date(lb);
    let d2 = new Date(ub);

    if (d2.getTime() > d1.getTime()) {
      return true;
    } else return false;
  } catch (err) {
      console.log(err);
      return false;
  }
}

export {
  validLaunchFilterCheck,
  validDurationFilterCheck,
  validDurationRangeFilters,
};

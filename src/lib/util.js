import { LAUNCH_FILTERS, DURATION_FILTERS } from "./constants";
import moment from "moment";
/**
 * Check if launch filter value passsed in URL is valid or not using @constant LAUNCH_FILTERS
 * @param {number} val Launch Filter Value 
 */


function validLaunchFilterCheck(val) {
  if (LAUNCH_FILTERS.findIndex((ele) => ele.key === val) !== -1) {
    return true;
  }
  return false;
}
/**
 * Check if  duration filter value passed in URL is valid or not using @constant DURATION_FILTERS
 * @param {number} val Duration Filter check 
 * @note  valid Duration filter can be from (0-5) from DURATION_FILTERS or 6 for custom dates 
 */

function validDurationFilterCheck(val) {
  if (
    val.toString() == "6" ||
    Object.keys(DURATION_FILTERS).find((ele) => ele == val.toString()) !==
      undefined
  ) {
    return true;
  }
  return false;
}

/**
 * Check if Date Range values mentioned in the URL are valid or not
 * @param {Number} lb  greater than Unix Date value 
 * @param {Number} ub  less than Unix Date value
 */
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
/**
 * Convert Unix Date to formatted UTC String
 * @param {Number} unix Unix Date 
 */

function unixToutc(unix) {
  if (unix)
    return moment(new Date(unix * 1000).toUTCString()).format(
      "D MMMM YYYY hh:mm"
    );
}
export {
  validLaunchFilterCheck,
  validDurationFilterCheck,
  validDurationRangeFilters,
  unixToutc,
};

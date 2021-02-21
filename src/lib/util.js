
import {LAUNCH_FILTERS} from './constants';
function validLaunchFilterCheck (val){
   //0 -> All Launches  1-> Upcoming Launches 2-> Successful Launches 3-> Failed Launches
      if( LAUNCH_FILTERS.findIndex((ele)=>ele.key===val)!==-1){
          return true;
      }
      return false;
}

export {validLaunchFilterCheck};
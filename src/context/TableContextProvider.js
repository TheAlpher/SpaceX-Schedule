import TableContext from "./TableContext";
import { validLaunchFilterCheck } from "../lib/util";
import {LAUNCH_FILTERS} from '../lib/constants';
import axios from 'axios';
const launchFilters = [];
class TableProvider extends Component {
  state = {
    data: [],
    loading: false,
    pageNo: 1,
    perPage: 12,
    launchFilter: 0,
  };
  loadState = async () => {
      this.setState({loading :true});
        await this.setLaunchFilter();
        await this.setTableData();
        this.setState({loading:false});
  };

  setTableData = async () =>{
      const queryObj=this.returnQueryObj();
      const optionsObj={
          limit:this.state.perPage,
          offset:this.state.perPage*(this.state.pageNo-1)
      }
axios.get('https://api.spacexdata.com/v4/launches/query',{
    query:queryObj,
    options:optionsObj
}).then(res=>{
    console.log(res.data);
})


  }

  returnQueryObj =() =>{
if(this.state.launchFilter==1 || this.state.launchFilter==2){
const validFilterObj=LAUNCH_FILTERS.find(ele=>{return ele.key== this.state.launchFilter});
const queryKey=validFilterObj.value;
    return {
            queryKey:true
    }

}
else if(this.state.launchFilter==3){
    const validFilterObj=LAUNCH_FILTERS.find(ele=>{return ele.key== this.state.launchFilter});
const queryKey=validFilterObj.value;
    return {
            queryKey:false
    }
}
else 
return {}
  }
  setLaunchFilter = async () => {
    let launchVal = URLSearchParams.get("launch");

    if (launchVal) {
      let parsedVal = parseInt(launchVal);
      if (validLaunchFilterCheck(parsedVal)) {
        this.setState({ launchFilter: parseInt(launchVal) });
      }
    }
  };

  updatePageNo =async(num) =>{
      this.setState({pageNo:num},()=>{
        this.setTableData();
      })
  }
  updateLaunchFilter = async (val) => {
    this.setState(
      {
        launchFilter: val,
      },
      () => {
        URLSearchParams.set("launch", val);
        this.setTableData();
      }
    );
  };

  setPage = async (num) => {
    this.setState({
      pageNo: num,
    });
  };

  render() {
    return (
      <TableContext.Provider value={{        data:this.state.data,
        loading: this.state.loading,
        pageNo: this.state.pageNo,
        perPage: this.state.perPage,
        launchFilter: this.state.launchFilter,
        updateLaunchFilter:this.updateLaunchFilter,
      }}>
        {this.props.children}
      </TableContext.Provider>
    );
  }
}
export default TableProvider;

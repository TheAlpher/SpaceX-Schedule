import React, { Component } from "react";
import TableContext from "./TableContext";
import { validLaunchFilterCheck,validDurationFilterCheck } from "lib/util";
import { LAUNCH_FILTERS, DURATION_FILTERS } from "lib/constants";
import axios from "axios";
class TableProvider extends Component {
    /**
     *Initialized state values
     * Duration Filter and Range by default set to last 6 months 
     * Launch Filter by default set to All Launches
     * Page Size set to 12
     * Page No initialized with 1 and resets to 1 at every api call
     */
  state = {
    data: [],
    loading: true,
    pageNo: 1,
    rangeFrom: DURATION_FILTERS[3].lb,
    rangeTo: DURATION_FILTERS[3].ub,
    durationFilter: 3,
    totalDocs: 0,
    pageSize: 12,
    launchFilter: 0,
  };
/**
 * Set the initial state values
 */

  loadState = async () => {
    if (!this.state.loading) 
    this.setState({ loading: true });
    await this.setLaunchFilter();
    await this.setDurationFilter();
    await this.setTableData();
    this.setState({ loading: false });
  };

 /**
  * Set the data inside the table
  */ 


 setTableData = async () => {
    const queryObj = this.returnQueryObj();
    const optionsObj = {
      limit: this.state.pageSize,
      offset: this.state.pageSize * (this.state.pageNo - 1),
      populate: ["launchpad", "payloads", "rocket", "ships"],
    };
    return axios
      .post("https://api.spacexdata.com/v4/launches/query", {
        query: queryObj,
        options: optionsObj,
      })
      .then((res) => {
        if (res.data.totalDocs >= 0) {
          this.setState({
            data: res.data.docs,
            totalDocs: res.data.totalDocs,
          });
          return res.data;
        }
      });
  };

/**
  * Return the Query Object for the api call based on filter conditions 
  */ 
  returnQueryObj = () => {
    let queryObj = {};

    if (this.state.launchFilter == 1 || this.state.launchFilter == 2) {
      const validFilterObj = LAUNCH_FILTERS.find((ele) => {
        return ele.key == this.state.launchFilter;
      });
      queryObj[validFilterObj.value] = true;
      queryObj["date_utc"] = {
        $gte: this.state.rangeFrom,
        $lte: this.state.rangeTo,
      };
    } else if (this.state.launchFilter == 3) {
      const validFilterObj = LAUNCH_FILTERS.find((ele) => {
        return ele.key == 2;
      });
      queryObj[validFilterObj.value] = false;
      queryObj["date_utc"] = {
        $gte: this.state.rangeFrom,
        $lte: this.state.rangeTo,
      };
    } else {
      queryObj["date_utc"] = {
        $gte: this.state.rangeFrom,
        $lte: this.state.rangeTo,
      };
    }
    return queryObj;
  };

/**
 * Set initial launch filter on load from URL if Launch parameters exists and is valid 
 */

  setLaunchFilter = async () => {
    let url = new URL(window.location);
    let launchVal = url.searchParams.get("launch");

    if (launchVal) {
      let parsedVal = parseInt(launchVal);
      if (validLaunchFilterCheck(parsedVal)) {
        this.setState({ launchFilter: parseInt(launchVal) });
      }
    }
  };

/**
 *  Set the page number and call @func setTableData
 * @param {number} num - The Selected Page Number 
 */

  setPage = async (num) => {
    this.setState(
      {
        pageNo: num,
      },
      async () => {
        this.setState({ loading: true });
        await this.setTableData();
        this.setState({ loading: false });
      }
    );
  };

  /**
   * Update the state of launch filter and call @func setPage 
   * @param {number} val - updated value of launch filter 
   */
  updateLaunchFilter = async (val) => {
    this.setState(
      {
        launchFilter: val,
      },
      async () => {
        let url = new URL(window.location);
        url.searchParams.set(`launch`, `${this.state.launchFilter}`);
        window.history.pushState({ path: url.href }, "", url.href);
        await this.setPage(1);
      }
    );
  };
/**
 * Set initial Duration Filters based on URL if values exist and valid
 */
  setDurationFilter = async () => {
    let url = new URL(window.location);
    let durationVal = url.searchParams.get("duration");
    let durationlt = new Date(Number(url.searchParams.get("lt"))*1000).toISOString(); //lt => less than date filter value
    let durationgt = new Date(Number(url.searchParams.get("gt"))*1000).toISOString(); //gt => greater than date filter value
 
    if (durationVal && validDurationFilterCheck(durationVal)) {
      if (Object.keys(DURATION_FILTERS))
        this.setState({
          durationFilter: durationVal,
          rangeFrom: DURATION_FILTERS[durationVal]?.lb,
          rangeTo: DURATION_FILTERS[durationVal]?.ub,
        });
      else if (validLaunchFilterCheck(durationgt, durationlt)) {
      
        this.setState({
          durationFilter: durationVal,  // durationFilter value == 6 i.e Custom duration filter
          rangeFrom: durationgt,
          rangeTo: durationlt,
        });
      }
    }
    return 0;
  };
/**
 *  Update duration filter using num and  @constant DURATION_FILTERS
 * @param {char} num - DurationFilter value ('0'-'6') 
 * @param {String} gt - Greater than ISO Date String 
 * @param {String} lt - Less than ISO Date String
 */
  updateDurationFilter = async (num, gt, lt) => {

    if (DURATION_FILTERS[num]) {
      this.setState(
        {
          durationFilter: num,
          rangeFrom: DURATION_FILTERS[num]?.lb,
          rangeTo: DURATION_FILTERS[num]?.ub,
        },
        async () => {
          let url = new URL(window.location);
          url.searchParams.set(`duration`, `${this.state.durationFilter}`);
          url.searchParams.set(`lt`, `${Date.parse(this.state.rangeTo)}`);
          url.searchParams.set(`gt`, `${Date.parse(this.state.rangeFrom)}`);
          window.history.pushState({ path: url.href }, "", url.href);
          await this.setPage(1);
        }
      );
    } else {
      this.setState(
        {
         durationFilter: num,
          rangeFrom: gt,
          rangeTo: lt,
        },
        async () => {
          let url = new URL(window.location);
          url.searchParams.set(`duration`, `${this.state.durationFilter}`);
          url.searchParams.set(`lt`, `${Date.parse(this.state.rangeTo)}`);
          url.searchParams.set(`gt`, `${Date.parse(this.state.rangeFrom)}`);
          window.history.pushState({ path: url.href }, "", url.href);
          await this.setPage(1);
        }
      );
    }
  };
/**
 * Set initial state values at Did mount
 */
  componentDidMount() {
    this.loadState();
  }
  render() {
    return (
      <TableContext.Provider
        value={{
          data: this.state.data,
          loading: this.state.loading,
          pageNo: this.state.pageNo,
          rangeFrom:this.state.rangeFrom,
          rangeTo:this.state.rangeTo,
          durationFilter: this.state.durationFilter,
          pageSize: this.state.pageSize,
          totalDocs: this.state.totalDocs,
          launchFilter: this.state.launchFilter,
          setPage: this.setPage,
          updateLaunchFilter: this.updateLaunchFilter,
          updateDurationFilter: this.updateDurationFilter,

        }}
      >
        {this.props.children}
      </TableContext.Provider>
    );
  }
}
export default TableProvider;

import React, { Component } from "react";
import TableContext from "./TableContext";
import { validLaunchFilterCheck,validDurationFilterCheck,validDurationRangeFilters } from "../lib/util";
import { LAUNCH_FILTERS, DURATION_FILTERS } from "../lib/constants";
import axios from "axios";
class TableProvider extends Component {
  state = {
    data: [],
    loading: true,
    pageNo: 1,
    rangeFrom: DURATION_FILTERS[3].lb,
    rangeTo: DURATION_FILTERS[3].ub,
    duration: 3,
    totalDocs: 0,
    pageSize: 12,
    launchFilter: 0,
  };
  loadState = async () => {
    if (!this.state.loading) 
    this.setState({ loading: true });
    await this.setLaunchFilter();
    await this.setDurationFilter();
    await this.setTableData();
    this.setState({ loading: false });
  };

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

  setDurationFilter = async () => {
    let url = new URL(window.location);
    console.log(typeof url.searchParams.get("lt"));
    console.log(url.searchParams.get("gt"));
    let durationVal = url.searchParams.get("duration");
    let durationlt = new Date(Number(url.searchParams.get("lt"))*1000).toISOString();
    let durationgt = new Date(Number(url.searchParams.get("gt"))*1000).toISOString();
 
    if (durationVal && validDurationFilterCheck(durationVal)) {
      if (Object.keys(DURATION_FILTERS))
        this.setState({
          duration: durationVal,
          rangeFrom: DURATION_FILTERS[durationVal]?.lb,
          rangeTo: DURATION_FILTERS[durationVal]?.ub,
        });
      else if (validLaunchFilterCheck(durationgt, durationlt)) {
        // duration val == 6 i.e custom
        this.setState({
          duration: durationVal,
          rangeFrom: durationgt,
          rangeTo: durationlt,
        });
      }
    }
console.log(durationVal);
    return 0;
  };

  updateDurationFilter = async (num, gt, lt) => {

    if (DURATION_FILTERS[num]) {
      console.log(DURATION_FILTERS[num].lb);
      console.log(DURATION_FILTERS[num].ub);
      this.setState(
        {
          duration: num,
          rangeFrom: DURATION_FILTERS[num]?.lb,
          rangeTo: DURATION_FILTERS[num]?.ub,
        },
        async () => {
          let url = new URL(window.location);
          url.searchParams.set(`duration`, `${this.state.duration}`);
          url.searchParams.set(`lt`, `${Date.parse(this.state.rangeTo)}`);
          url.searchParams.set(`gt`, `${Date.parse(this.state.rangeFrom)}`);
          window.history.pushState({ path: url.href }, "", url.href);
          await this.setPage(1);
        }
      );
    } else {
      this.setState(
        {
          duration: num,
          rangeFrom: gt,
          rangeTo: lt,
        },
        async () => {
          let url = new URL(window.location);
          url.searchParams.set(`duration`, `${this.state.duration}`);
          url.searchParams.set(`lt`, `${Date.parse(this.state.rangeTo)}`);
          url.searchParams.set(`gt`, `${Date.parse(this.state.rangeFrom)}`);
          window.history.pushState({ path: url.href }, "", url.href);
          await this.setPage(1);
        }
      );
    }
  };

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
          duration:this.state.duration,
          rangeFrom:this.state.rangeFrom,
          rangeTo:this.state.rangeTo,
          duration: this.state.duration,
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

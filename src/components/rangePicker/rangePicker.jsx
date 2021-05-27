import React from "react";
import DayPicker, { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";
import { Button } from "@material-ui/core";
export default class RangePicker extends React.Component {
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleDayMouseEnter = this.handleDayMouseEnter.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.state = this.getInitialState();
  }

  getInitialState() {
    if (String(this.props.durationFilter) == "6")
      return {
        from: new Date(this.props.rangeFrom) || null,
        to: new Date(this.props.rangeTo) || null,
        enteredTo: new Date(this.props.rangeTo) || null,
      };
    else {
      return {
        from: null,
        to: null,
        enteredTo: null, 
      };
    }
  }

  isSelectingFirstDay(from, to, day) {
    const isBeforeFirstDay = from && DateUtils.isDayBefore(day, from);
    const isRangeSelected = from && to;
    return !from || isBeforeFirstDay || isRangeSelected;
  }

  handleDayClick(day) {
    const { from, to } = this.state;
    if (from && to && day >= from && day <= to) {
      this.handleResetClick();
      return;
    }
    if (this.isSelectingFirstDay(from, to, day)) {
      this.setState({
        from: day,
        to: null,
        enteredTo: null,
      });
    } else {
      
        this.setState({
          to: day,
          enteredTo: day,
        });
      
    }
  }

  handleDayMouseEnter(day) {
    const { from, to } = this.state;
    if (!this.isSelectingFirstDay(from, to, day)) {
      this.setState({
        enteredTo: day,
      });
    }
  }

  handleResetClick() {
    this.setState({
      from: null,
      to: null,
      enteredTo: null,
    });
  }

  render() {
    const { from, to, enteredTo } = this.state;
    const modifiers = { start: from, end: enteredTo };
    const disabledDays = {
      before: this.state.from,
      after: this.state.to ,
    };
    const selectedDays = [from, { from, to: enteredTo }];
    return (
      <div>
        <DayPicker
          className="Range"
          numberOfMonths={2}
          fromMonth={from}
          selectedDays={selectedDays}
          // disabledDays={disabledDays}
          modifiers={modifiers}
          onDayClick={this.handleDayClick}
          onDayMouseEnter={this.handleDayMouseEnter}
        />
        <div className="DayPicker-confirm">
          {from && to && (
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                this.props.updateDurationFilter(
                  "6",
                  from.toISOString(),
                  to.toISOString()
                );
                this.props.setVisible(false);
              }}
            >
              Confirm
            </Button>
          )}
        </div>
      </div>
    );
  }
}

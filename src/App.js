import React from "react";
import DataService from "./dataService";
import Box from "@material-ui/core/Box";
import Header from "./AppBar";
import Card from "./Card";
import Select from "react-select";

const dataService = new DataService();

const transformLineNumber = val => {
  const lineNumberMap = {
    f: "21"
  };
  return lineNumberMap[val];
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      trains: [],
      stops: []
    };
  }

  fetchData() {
    dataService
      .getData({ time: Date.now(), station: "236", direction: "N" })
      .then(trains => {
        this.setState({ trains });
      });
  }

  fetchRoutes() {
    dataService.getRoutes().then(routes => {
      this.setState({ routes });
    });
  }

  fetchStops() {
    dataService.getStops().then(stops => {
      console.log(stops);
      this.setState({ stops });
    });
  }

  componentDidMount() {
    this.fetchData();
    this.fetchRoutes();
    this.fetchStops();
  }

  render() {
    return (
      <div>
        <Header />
        <Select
          className="basic-single"
          classNamePrefix="select"
          defaultValue={""}
          isDisabled={false}
          isLoading={false}
          isClearable={true}
          isRtl={false}
          isSearchable={true}
          name="color"
          options={this.state.stops.map(stop => {
            return { value: stop.stop_id, label: stop.stop_name };
          })}
        />
        {this.state.trains.map(train => {
          return <Card train={train} />;
        })}
      </div>
    );
  }
}

export default App;

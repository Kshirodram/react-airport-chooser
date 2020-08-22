import React, { useState, useCallback, useReducer } from "react";

import { callToAPI } from "./action";
import reducer, { initialState } from "./reducer";

import Styles from "./airportChooser.module.css";

const spliceData = (data) => {
  if (data.length > 20) {
    return data.splice(0, 20);
  }
  return data;
};

const AirportChooser = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedAirport, setSelectedAirport] = useState(null);
  const [show, setShow] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  const toggleList = useCallback(() => {
    setShow(!show);
    setSearchText("");
    searchAirport();
  }, [show, setSearchText]);

  const getAirportList = useCallback(() => {
    if (state && state.result && state.result.length === 0) {
      callToAPI(dispatch);
    }
    toggleList();
  }, [dispatch, state, toggleList]);

  const selectAirport = useCallback(
    (airportData) => {
      setSelectedAirport(airportData);
      toggleList();
    },
    [selectedAirport, toggleList]
  );

  // TODO: for filter we need to have one more local state
  // This will eventually go when we have filter option
  // available from backend API. This is just for demo
  // purpose we have sept it.
  const searchAirport = (e) => {
    let searchText = (e && e.target && e.target.value.trim()) || "";
    const result = state.result;
    searchText = searchText.toLowerCase();
    const filteredData = result.filter((item, index) => {
      return (
        item.code.toLowerCase().includes(searchText) ||
        item.name.toLowerCase().includes(searchText)
      );
    });

    // show only 20 item in the dropdown and if user needs more
    // then search for it
    setData(spliceData(filteredData));
    setSearchText(searchText);
  };
  const finalData =
    data.length > 0 || searchText ? data : spliceData([...state.result]);
  return (
    <div className={Styles.container}>
      <button onClick={getAirportList} className={Styles.button}>
        {selectedAirport ? (
          <div>
            <p>
              {selectedAirport.city}, {selectedAirport.country}
            </p>
            <p>
              {selectedAirport.code}, {selectedAirport.name}
            </p>
          </div>
        ) : (
          "Select Airport"
        )}
      </button>

      <div className={!show ? Styles.hide : Styles.listContainer}>
        <input
          type="search"
          onChange={searchAirport}
          className={Styles.inputBox}
          placeholder="Search for Airport Name/Code"
          value={searchText}
        />
        <ul>
          {state.isLoading ? (
            <div className={Styles.loader} />
          ) : finalData.length > 0 ? (
            finalData.map((item, index) => (
              <li
                key={index}
                className={Styles.listItem}
                onClick={() => selectAirport(item)}
              >
                <div>
                  <p>{item.name}</p>
                  <p>
                    {item.city}, {item.country}
                  </p>
                </div>
                <div>{item.code}</div>
              </li>
            ))
          ) : (
            <div className={Styles.noDataFound}>No Data Found</div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default AirportChooser;

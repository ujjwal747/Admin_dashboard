import { useEffect, useState } from "react";
import BoxHeader from "./components/boxHeader";
import Table from "./components/Table";


import "./App.css";

function App() {
  const url = "https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory";
  const [tableData, setTableData] = useState([]);
  const [viewMode, setViewMode] = useState("admin");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, { method: "GET" });
        const data = await response.json();
        setTableData(data); // Update the state with fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [url]);

  const updateTableData = (updatedData) => {
    setTableData(updatedData);
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  return (
    <div className="app">


      <div className="view-mode-switch">
        <label>
          <input
            type="radio"
            name="viewMode"
            value="admin"
            checked={viewMode === "admin"}
            onChange={() => handleViewModeChange("admin")}
          />
          Admin
        </label>
        <label >
          <input
            type="radio"
            name="viewMode"
            value="client"
            checked={viewMode === "client"}
            onChange={() => handleViewModeChange("client")}
          />
          Client
        </label>
      </div>

      <h1 className="inventory-header">Inventory Stats</h1>
      <BoxHeader tableData={tableData} />
      <Table tableData={tableData} updateTableData={updateTableData} viewMode={viewMode}/>
    </div>
  );
}

export default App;

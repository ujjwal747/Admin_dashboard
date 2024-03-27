import React, { useState } from "react";
import "./Table.css";
import { FaEdit, FaTrash, FaEye, FaEyeSlash } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";

const Table = ({ tableData, updateTableData, viewMode }) => {
  const [editPopup, setEditPopup] = useState(false);
  const [editDetails, setEditDetails] = useState({});

  const handleEditOpen = (row) => {
    if (!row.disabled && viewMode === "admin") {
      setEditDetails(row);
      setEditPopup(true);
    }
  };

  const handleEditClose = () => {
    setEditPopup(false);
  };

  const handleSave = () => {
    const updatedData = tableData.map((item) => {
      if (item.name === editDetails.name) {
        return {
          ...item,
          category: category || editDetails.category,
          price: price || editDetails.price,
          quantity: quantity || editDetails.quantity,
          value: value || editDetails.value,
        };
      }
      return item;
    });
    updateTableData(updatedData); // Update the table data in the parent component
    handleEditClose(); // Close the popup
  };

  const handleDelete = (row) => {
    if (!row.disabled && viewMode === "admin") {
      let newData = tableData.filter((item) => item.name != row.name);
      updateTableData(newData);
    }
  };

  const handleDisable = (row) => {
    if (viewMode === "admin") {
      const updatedData = tableData.map((item) => {
        if (item.name === row.name) {
          return { ...item, disabled: !item.disabled };
        }
        return item;
      });
      updateTableData(updatedData);
    }
  };

  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [value, setValue] = useState("");

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>
              <span>name</span>
            </th>
            <th>
              <span>Category</span>
            </th>
            <th>
              <span>Price</span>
            </th>
            <th>
              <span>Quantity</span>
            </th>
            <th>
              <span>value</span>
            </th>
            <th>
              <span>Action</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData &&
            tableData.map((row) => (
              <tr key={row.name} className={row.disabled ? `disabled` : ""}>
                <td>{row.name}</td>
                <td>{row.category}</td>
                <td>{row.value}</td>
                <td>{row.quantity}</td>
                <td>{row.price}</td>
                <td>
                  <FaEdit
                    className={viewMode != "admin" ? "disabled-btn" : ""}
                    style={{
                      marginRight: "5px",
                      cursor: "pointer",
                      color: "green",
                    }}
                    onClick={() => handleEditOpen(row)}
                  />
                  <FaTrash
                    className={viewMode != "admin" ? "disabled-btn" : ""}
                    style={{
                      marginRight: "5px",
                      cursor: "pointer",
                      color: "purple",
                    }}
                    onClick={() => handleDelete(row)}
                  />
                  {row.disabled ? (
                    <FaEyeSlash
                      className={viewMode != "admin" ? "disabled-btn" : ""}
                      style={{ cursor: "pointer", color: "red" }}
                      onClick={() => handleDisable(row)}
                    />
                  ) : (
                    <FaEye
                      className={viewMode != "admin" ? "disabled-btn" : ""}
                      style={{ cursor: "pointer", color: "red" }}
                      onClick={() => handleDisable(row)}
                    />
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Popup
        isOpen={editPopup}
        onClose={handleEditClose}
        details={editDetails}
        handleSave={handleSave}
        setCategory={setCategory}
        setPrice={setPrice}
        setQuantity={setQuantity}
        setValue={setValue}
      />
    </>
  );
};

const Popup = ({
  isOpen,
  onClose,
  details,
  handleSave,
  setCategory,
  setPrice,
  setQuantity,
  setValue,
}) => {
  return (
    <div className={`popup ${isOpen ? "open" : ""}`}>
      <div className="popup-content">
        <div className="close" onClick={onClose}>
          <IoCloseOutline />
        </div>
        <h2>Edit product</h2>
        <h5 style={{ marginBottom: "2rem" }}>{details && details.name}</h5>
        <div className="input-row">
          <div className="input-container">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              id="category"
              placeholder="category"
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label htmlFor="price">Price</label>
            <input
              type="text"
              id="price"
              placeholder="price"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>
        <div className="input-row">
          <div className="input-container">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="text"
              id="quantity"
              placeholder="quantity"
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label htmlFor="value">Value</label>
            <input
              type="text"
              id="value"
              placeholder="Value"
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
        </div>

        <div className="btns">
          <button className="cancel" onClick={onClose}>
            cancel
          </button>
          <button className="save" onClick={handleSave}>
            save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;

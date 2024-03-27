import React, { useState, useContext } from "react";
import "./boxHeader.css";
import { TiShoppingCart } from "react-icons/ti";
import { FaDollarSign } from "react-icons/fa";
import { MdRemoveShoppingCart } from "react-icons/md";
import { MdCategory } from "react-icons/md";

const BoxHeader = ({tableData}) => {
    let modifiedTableData = tableData.filter((data)=> !data.disabled)

  let totalProducts = modifiedTableData.length;
  let totalValue = modifiedTableData.reduce((acc, item) => {
    let value = item.value.replace("$", "");
    if (value !== "0") {
      return acc + parseInt(value);
    }
    return acc;
  }, 0);
  let outOfStock = modifiedTableData.filter((item) => item.quantity == 0).length;
  const categories = new Set(modifiedTableData.map((item) => item.category)).size;

  return (
    <>
      <div className="boxContainer">
        <div className="box-outside">
          <div>
            <TiShoppingCart className='header-icons'/>
          </div>
          <div className="box-inside">
            <h2>Total Products</h2>
            <div className="value">{totalProducts}</div>
          </div>
        </div>

        <div className="box-outside">
          <div>
            <FaDollarSign className='header-icons'/>
          </div>
          <div className="box-inside">
            <h2>Total Store Value</h2>
            <div className="value">{totalValue}</div>
          </div>
        </div>

        <div className="box-outside">
          <div>
            <MdRemoveShoppingCart className='header-icons'/>
          </div>
          <div className="box-inside">
            <h2>Out of stock</h2>
            <div className="value">{outOfStock}</div>
          </div>
        </div>

        <div className="box-outside">
          <div>
            <MdCategory className='header-icons'/>
          </div>
          <div className="box-inside">
            <h2>Categories</h2>
            <div className="value">{categories}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BoxHeader;

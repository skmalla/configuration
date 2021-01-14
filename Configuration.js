import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTrashAlt,
  faHandPointRight,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import "./Configuration.css";
import Axios from "axios";

const Configuration = () => {
  const [inputList, setInputList] = useState([
    { selectField: "", textareaField: "" },
  ]);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { selectField: "", textareaField: "" }]);
  };

  // form submission function
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputList);
    Axios.post("URL WILL GOES HERE", inputList)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className='configuration'>
      <form onSubmit={handleSubmit}>
        <table className='table text-center'>
          <tr className='table-header'>
            <th>Process Name</th>
            <th>Columns</th>
            <th>Action</th>
          </tr>
          {inputList.map((x, i) => {
            return (
              <tr>
                <td>
                  <select
                    name='selectField'
                    value={x.selectField}
                    onChange={(e) => handleInputChange(e, i)}
                  >
                    <option>Select...</option>
                    <option>INDIA</option>
                    <option>USA</option>
                    <option>RUSSIA</option>
                    <option>FRANCE</option>
                    <option>CHINA</option>
                  </select>
                </td>
                <td>
                  <textarea
                    name='textareaField'
                    value={x.textareaField}
                    onChange={(e) => handleInputChange(e, i)}
                    className='textareaField'
                  />
                </td>
                <td>
                  {inputList.length !== 1 && (
                    <span className='tip'>
                      <FontAwesomeIcon
                        icon={faTrashAlt}
                        onClick={() => handleRemoveClick(i)}
                        className='ml-3 deleteBtn plusIcon'
                      />
                      <marquee id='cloud'>
                        <span>
                          <FontAwesomeIcon
                            icon={faHandPointRight}
                            className='mr-2'
                          />
                          .....Remove Fields!
                        </span>
                      </marquee>
                    </span>
                  )}

                  {inputList.length - 1 === i && (
                    <span className='tip'>
                      <FontAwesomeIcon
                        icon={faPlus}
                        onClick={handleAddClick}
                        className='plusIcon plusIconConfig ml-4'
                      />
                      <marquee id='cloud'>
                        <span>
                          <FontAwesomeIcon
                            icon={faHandPointRight}
                            className='mr-2'
                          />
                          .....Please Create New Fields!
                        </span>
                      </marquee>
                    </span>
                  )}
                </td>
              </tr>
            );
          })}
        </table>
        <div className='text-right'>
          <input type='submit' role='button' className='configbtn' />
        </div>
      </form>
    </div>
  );
};

export default Configuration;

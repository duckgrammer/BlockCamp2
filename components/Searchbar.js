import { useRef, useState } from 'react';
import 'antd/dist/antd.css';
import { Input } from 'antd';
import {getDaosAddress} from '../constants/daoProject';
import styled from 'styled-components';

const SearchBar = () => {
  //const [addressInput, setAddreesInput] = useState<string | null>(null);
  const clickPoint = useRef();
  const { Search } = Input;

  const onSearch = (value) => {
    console.log(value);
    if(value.length > 0){
      if(value.split(0,3) == "0x"){
        window.location.href = './?address='+value;
      }
      else{
        window.location.href = './?address='+getDaosAddress(value.toLowerCase());
      }
      
    }
  }

  const RoundSearch = styled(Input.Search)`
    .ant-input {
      border-color: #fa5036;
      
    }

    .ant-btn {
      border-color: #fa5036;
    }
  `;

  return (
    <div>
      <div className="items-center px-4 flex justify-center">
        <RoundSearch
          placeholder="search address name or address"
          onSearch={onSearch}
          style={{
            width: 500,
            borderRadius: "50px",
          }}
        />
      </div>
    </div>
  );
};

export default SearchBar;
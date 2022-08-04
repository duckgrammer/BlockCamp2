import { useRouter, NextRouter } from 'next/router';
import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import React, { useEffect, useState } from 'react';
import {Card, Row, Col, Table, Avatar, Tooltip, } from 'antd';
import { AreaChart, Area, YAxis, XAxis, CartesianGrid, Legend } from 'recharts';
import styled from 'styled-components';
import { getTokenAddress } from '../../constants/mapToken';
import { getDaosAddress, nameToImage, getDaosAllAddress, getDaosTreasury, getDaoDetail } from "../../constants/daoDetail.js"
import {LinkOutlined} from '@ant-design/icons';

export const getStaticPaths = async () => {
  return {
    paths: [{ params: { name: 'sushiswap'} }, { params: { name: 'balancer' } }, { params: { name: '' } }],
    fallback: false, // fallback is set to false because we already know the slugs ahead of time
  };
};
export const getStaticProps = async ({ params }) => {
  console.log(getDaosAddress(params.name));
  const res = await fetch('https://api.orgboard.finance:2053/gnosis/treasuryHistories/' + getDaosAddress(params.name)).then((res) => res.json());
 
  // const res = params;
  // console.log(getDaosAddress(params.name));
  // console.log(res);
  return {
    props: { res: res,
              name: params.name },
    // props: { res: res.name },
  };
};
// interface Props {
//   addr: string;
// }
const Overview = ({ res, name }) => {
  const [description, setDescription] = useState("");
  const router = useRouter();
  const [isReady, setIsReady] = useState(false)

  const columns = [
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Value(USD)',
      dataIndex: 'value',
      key: 'value',
    },
    {
      title: 'Chain',
      dataIndex: 'chain',
      key: 'chain',
    },
  ];

  const [addr, setAddr] =  useState([]);
   // const tmp = [];
  useEffect(() => {
    setDescription("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");
    
    // return () => {
      getDaosAllAddress(name).map(e=>{
        const temp = {
        address: e,
        type: getDaosTreasury(e).type,
        value: getDaosTreasury(e).value,
        chain: getDaosTreasury(e).chain,
      }
      setAddr(data=>[...data, temp])
        });
    //   // const temp = {
    //   //   key: '1',
    //   //   address: '0x19B3Eb3Af5D93b77a5619b047De0EED7115A19e7',
    //   //   type: 'liquid',
    //   //   value: '$40M',
    //   //   chain: 'Ethereum',
    //   // }
      setIsReady(true)
    
    // }
  }, []);

  // const StyledTable = styled(Table)`
  //   .ant-table-thead > tr > th{
  //     color: #fa5036;
  //   }
  // `;

  return(
    <div>
      <Row align="middle" style={{height: "300px", paddingInline:"200px",backgroundImage: "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHZpZXdCb3g9IjAgMCAxIDEiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPgo8bGluZWFyR3JhZGllbnQgaWQ9Imc1NTgiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj4KPHN0b3Agc3RvcC1jb2xvcj0iI0ZBNTAzNiIgb2Zmc2V0PSIwIi8+PHN0b3Agc3RvcC1jb2xvcj0iI0UzOUYwMCIgb2Zmc2V0PSIxIi8+CjwvbGluZWFyR3JhZGllbnQ+CjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9InVybCgjZzU1OCkiIC8+Cjwvc3ZnPg==)"}}>
        <Col flex="200px">
          <Avatar size={200} style={{marginRight: "20px"}} src={nameToImage(name)}/>
        </Col>
        <Col span={18}>
          <Card
            style={{
              border: 0,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            }}
          >
            <Tooltip title="prompt text">
              <h1
              onClick={() => 
                window.open("https://etherscan.io/token/" + getTokenAddress(name))
              }
              style={{fontSize: "30px", color: "#fff", textDecoration: "underline"}}
              >
                {name.charAt(0).toUpperCase() + name.slice(1)}<LinkOutlined  style={{ fontSize: '20px' , marginBottom: '5px'}} />
              </h1>
            </Tooltip>
            <p style={{fontSize: "12", color: "#fff"}}>{description}</p>
          </Card>
        </Col>
      </Row>
    <div style={{paddingInline: "200px", paddingBlock: "50px", backgroundColor: "#fff7f8"}}> 
      <Row>
          <Col flex="300px" style={{paddingRight: "20px"}}>
              <h2 style={{fontSize: "20px"}}>Treasury Current Total Value</h2>
              <Card style={{height: "90%"}}>Placeholder</Card>
          </Col>
          <Col flex="auto">
              <h2 style={{fontSize: "20px"}}>Treasury Value Overtime</h2>
              <Card style={{height: "90%", paddingInline: "100px"}}>
              <div>
              {isReady && (
                  <AreaChart width={730} height={250} data={res} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area type="monotone" dataKey="value" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                    {/* <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" /> */}
                  </AreaChart>
                )
              }
    </div>
              </Card>
          </Col>
      </Row>
      <h2 style={{fontSize: "20px", paddingTop: "50px"}}>Treasury Addresses</h2>
      <Table columns={columns} dataSource={addr} size="middle" onRow={(r) => ({
      // <StyledTable columns={columns} dataSource={addr} size="middle" onRow={(r) => ({
            onClick: () => (window.location.href = '/gnosis/'+ r.address)
          })} />
    </div>
    </div>
  );
};

export default Overview;
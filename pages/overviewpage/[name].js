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
  // const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();
  console.log(res)
  // console.log(name);
  const chart =[

    {
    "date": "2020-09-24T18:38:03Z",
    "value": 0
    },
    
    
    {
    "date": "2020-09-24T20:29:36Z",
    "value": 0
    },
    
    {
    "date": "2020-09-25T14:24:46Z",
    "value": 0
    },
    
    {
    "date": "2020-09-27T03:03:18Z",
    "value": 0
    },
    
    {
    "date": "2020-09-27T05:01:35Z",
    "value": 0
    },
    
    {
    "date": "2020-09-27T05:25:11Z",
    "value": 0
    },
    
    {
    "date": "2020-09-27T05:35:23Z",
    "value": 0
    },
    
    {
    "date": "2020-09-27T05:48:35Z",
    "value": 0
    },
    
    {
    "date": "2020-09-27T05:51:55Z",
    "value": 0
    },
    
    {
    "date": "2020-09-27T05:52:53Z",
    "value": 0
    },
    
    {
    "date": "2020-09-27T06:02:21Z",
    "value": 0
    },
    
    {
    "date": "2020-09-27T06:03:01Z",
    "value": 0
    },
    
    {
    "date": "2020-09-27T06:03:53Z",
    "value": 0
    },
    
    {
    "date": "2020-09-27T06:04:34Z",
    "value": 0
    },
    
    {
    "date": "2020-09-27T06:04:58Z",
    "value": 0
    },
    
    {
    "date": "2020-09-27T06:12:04Z",
    "value": 0
    },
    
    {
    "date": "2020-09-27T06:23:24Z",
    "value": 0
    },
    
    {
    "date": "2020-09-27T06:24:40Z",
    "value": 0
    },
    
    {
    "date": "2020-09-27T17:11:32Z",
    "value": 0
    },
    
    {
    "date": "2020-09-27T17:12:37Z",
    "value": 0
    },
    
    {
    "date": "2020-09-27T17:22:30Z",
    "value": 0
    },
    
    {
    "date": "2020-09-27T17:23:16Z",
    "value": 0
    },
    
    {
    "date": "2020-09-27T17:32:29Z",
    "value": 0
    },
    
    {
    "date": "2020-09-27T17:33:55Z",
    "value": 0
    },
    
    {
    "date": "2020-09-27T18:08:07Z",
    "value": 0
    },
    
    {
    "date": "2020-09-27T18:09:44Z",
    "value": 0
    },
    
    {
    "date": "2020-09-27T18:22:58Z",
    "value": 0
    },
    
    {
    "date": "2020-09-27T18:40:15Z",
    "value": 0
    },
    
    {
    "date": "2020-09-29T06:02:16Z",
    "value": 0
    },
    
    {
    "date": "2020-09-29T06:06:35Z",
    "value": 0
    },
    
    {
    "date": "2020-09-29T06:16:01Z",
    "value": 0
    },
    
    {
    "date": "2020-09-29T06:22:56Z",
    "value": 0
    },
    
    {
    "date": "2020-09-29T06:30:13Z",
    "value": 0
    },
    
    {
    "date": "2020-09-29T06:35:45Z",
    "value": 0
    },
    
    {
    "date": "2020-09-29T06:43:55Z",
    "value": 0
    },
    
    {
    "date": "2020-09-29T06:49:41Z",
    "value": 0
    },
    
    {
    "date": "2020-09-29T06:54:24Z",
    "value": 0
    },
    
    {
    "date": "2020-09-29T06:59:16Z",
    "value": 0
    },
    
    {
    "date": "2020-09-29T07:03:55Z",
    "value": 0
    },
    
    {
    "date": "2020-09-29T07:08:14Z",
    "value": 0
    },
    
    {
    "date": "2020-09-29T18:43:26Z",
    "value": 0
    },
    
    {
    "date": "2020-09-29T18:48:27Z",
    "value": 0
    },
    
    {
    "date": "2020-09-29T18:55:32Z",
    "value": 0
    },
    
    {
    "date": "2020-09-29T19:01:11Z",
    "value": 0
    },
    
    {
    "date": "2020-09-29T19:06:49Z",
    "value": 0
    },
    
    {
    "date": "2020-09-29T19:08:00Z",
    "value": 0
    },
    
    {
    "date": "2020-09-29T19:12:20Z",
    "value": 0
    },
    
    {
    "date": "2020-10-01T14:19:54Z",
    "value": 0
    },
    
    {
    "date": "2020-10-01T15:10:04Z",
    "value": 0
    },
    
    {
    "date": "2020-10-01T16:18:07Z",
    "value": 1121586.6666666667
    },
    
    {
    "date": "2020-10-02T14:36:25Z",
    "value": 1121586.6666666667
    },
    
    {
    "date": "2020-10-02T14:36:57Z",
    "value": 1121586.6666666667
    },
    
    {
    "date": "2020-10-02T14:37:52Z",
    "value": 1121586.6666666667
    },
    
    {
    "date": "2020-10-02T14:58:03Z",
    "value": 1121586.6666666667
    },
    
    {
    "date": "2020-10-02T14:59:54Z",
    "value": 1121586.6666666667
    },
    
    {
    "date": "2020-10-04T17:49:55Z",
    "value": 1121586.6666666667
    },
    
    {
    "date": "2020-10-04T17:51:54Z",
    "value": 1121586.6666666667
    },
    
    {
    "date": "2020-10-04T17:52:55Z",
    "value": 2278905.168868297
    },
    
    {
    "date": "2020-10-04T18:14:34Z",
    "value": 2161332.034654357
    },
    
    {
    "date": "2020-10-04T18:20:51Z",
    "value": 2044104.0483884767
    },
    
    {
    "date": "2020-10-04T18:25:42Z",
    "value": 1927546.7906390708
    },
    
    {
    "date": "2020-10-04T18:29:10Z",
    "value": 1810377.6738190749
    },
    
    {
    "date": "2020-10-04T18:34:40Z",
    "value": 1630439.4970337767
    },
    
    {
    "date": "2020-10-05T07:20:23Z",
    "value": 3724559.4970337767
    },
    
    {
    "date": "2020-10-05T11:13:11Z",
    "value": 3604325.0280737765
    },
    
    {
    
    "date": null,
    "value": 3604325.0280737765
    },
    
    {
    "date": "2020-10-05T13:46:24Z",
    "value": 3604325.0280737765
    },
    
    {
    
    "date": null,
    "value": 3604325.0280737765
    },
    
    {
    "date": "2020-10-05T13:47:53Z",
    "value": 3604325.0280737765
    },
    
    {
    
    "date": null,
    "value": 3604325.0280737765
    },
    
    {
    "date": "2020-10-05T13:48:42Z",
    "value": 3604325.0280737765
    },
    
    {
    "date": "2020-10-05T13:49:11Z",
    "value": 3394325.0280737765
    },
    
    {
    "date": "2020-10-05T19:35:04Z",
    "value": 3394325.0280737765
    },
    
    {
    "date": "2020-10-05T19:46:24Z",
    "value": 2449325.028073777
    },
    
    {
    "date": "2020-10-05T20:02:56Z",
    "value": 2449325.028073777
    },
    
    {
    "date": "2020-10-05T20:08:10Z",
    "value": 2128752.442633777
    },
    
    {
    "date": "2020-10-05T20:18:10Z",
    "value": 2114752.442633777
    },
    
    {
    "date": "2020-10-05T20:48:40Z",
    "value": 2037752.442633777
    },
    
    {
    
    "date": null,
    "value": 2037752.442633777
    },
    
    {
    "date": "2020-10-05T20:56:41Z",
    "value": 2037752.442633777
    },
    
    {
    "date": "2020-10-05T20:57:32Z",
    "value": 2030752.442633777
    },
    
    {
    
    "date": null,
    "value": 2030752.442633777
    },
    
    {
    "date": "2020-10-06T15:36:02Z",
    "value": 2030752.442633777
    },
    
    {
    "date": "2020-10-06T15:37:18Z",
    "value": 2030752.442633777
    },
    
    {
    "date": "2020-10-06T17:42:42Z",
    "value": 2030752.442633777
    },
    
    {
    "date": "2020-10-06T20:07:34Z",
    "value": 1995752.442633777
    },
    
    {
    "date": "2020-10-09T11:51:28Z",
    "value": 1995752.442633777
    },
    
    {
    "date": "2020-10-13T01:17:18Z",
    "value": 1981752.442633777
    },
    
    {
    "date": "2020-10-13T08:26:13Z",
    "value": 1981752.442633777
    },
  ]

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
  const [img, setImg] = useState(getDaoDetail(name).url)
  // const tmp = [];
  useEffect(() => {
    // console.log(getDaosAllAddress(name))
    // const addrlist[] = 
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
      <h2 style={{fontSize: "20px"}}>Revenue Model Of</h2>
      <Row>
          <Col flex="300px" style={{paddingRight: "20px"}}>
              <Card style={{height: "100%"}}>Placeholder</Card>
          </Col>
          <Col flex="auto">
              <Card>
              <div>
              {
        isReady && (
          // <AreaChart width={730} height={250} data={chart} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
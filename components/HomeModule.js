import React, { useState, useEffect } from 'react';
import { Table, Row, Avatar, Col } from 'antd';
import 'antd/dist/antd.css';
import Marquee from 'react-fast-marquee';
import styled from 'styled-components';
import SearchBar from './Searchbar';

const HomeModule = () => {
  const [keyword, setKeyWord] = useState('');
  const [exist, setExist] = useState(false);

  const columns = [
    {
      title: 'Logo',
      dataIndex: 'logo',
      render: (url) => <Avatar src={url} size={50}/>,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Treasury',
      dataIndex: 'treasury',
    },
    {
      title: 'H24',
      dataIndex: 'H24',
    },
    {
      title: 'Acitive',
      dataIndex: 'acitivemembers',
    },
    {
      title: 'Proposal',
      dataIndex: 'proposal',
      sorter: (a, b) => a.proposal - b.proposal,
    },
    {
      title: 'Votes',
      dataIndex: 'votes',
    },
  ];

  const data = [
    {
      key: '2',
      logo: 'https://deepdao-uploads.s3.us-east-2.amazonaws.com/assets/dao/logo/sushiswap.jpeg',
      name: 'sushiswap',
      address: '0x19B3Eb3Af5D93b77a5619b047De0EED7115A19e7',
      url: 'overviewpage/sushiswap',
      treasury : "$3.5B",
      H24 : "+1.1%",
      acitivemembers : "3.3K",
      proposal : "91",
      votes: "45.5K",
    },

    {
      key: '3',
      logo: 'https://cdn.discordapp.com/attachments/1000968857973956789/1004275922800742430/Blue_Circle_Line_Technology_Communication_Logo.png',
      name: 'balancer',
      address: '0x10A19e7eE7d7F8a52822f6817de8ea18204F2e4f',
      url: 'overviewpage/balancer',
      treasury : "$3.5B",
      H24 : "+1.1%",
      acitivemembers : "3.3K",
      proposal : "90",
      votes: "45.5K",
    },
  ];

  const onChoose = (event, param) => {
    console.log(param);
    window.location.href = '/gnosis/' + param;
  };

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  useEffect(() => {
    if (window.location.search.length > 9) {
      setKeyWord(window.location.search.slice(9, window.location.search.length));
    }
  }, []);

  const StyledTable = styled(Table)`
  .ant-table-thead > tr > th{
    color: #fa5036;
  }
`;

  return (
    <div>
      <div style={{ height: "300px", backgroundImage: "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHZpZXdCb3g9IjAgMCAxIDEiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPgo8bGluZWFyR3JhZGllbnQgaWQ9Imc1NTgiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj4KPHN0b3Agc3RvcC1jb2xvcj0iI0ZBNTAzNiIgb2Zmc2V0PSIwIi8+PHN0b3Agc3RvcC1jb2xvcj0iI0UzOUYwMCIgb2Zmc2V0PSIxIi8+CjwvbGluZWFyR3JhZGllbnQ+CjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9InVybCgjZzU1OCkiIC8+Cjwvc3ZnPg==)"}}>
        {/*<div pauseOnHover gradient={false} style={{paddingBlock: "40px", fontSize: "60px", color: "#fff", display: "flex", justifyContent: "center"}}>
            DAO Treasury Analysis Dashboard
        </div>*/}
        <Marquee pauseOnHover gradient={false} style={{paddingBlock: "20px", fontSize: "100px", color: "#fff"}}>
          DAO Treasury Analysis Dashboard
        </Marquee>
        <Row>
          <Col span={1}></Col>
          <Col span={22} style={{display: "flex", justifyContent: "center"}}>
            <SearchBar />
          </Col>
          <Col span={1}></Col>
        </Row>
      </div>
      <div style={{ paddingInline: '100px', paddingBlock: '50px', backgroundColor: "#fff7f8", minHeight:"1000px"}}>
        {keyword === '' ? (
          <StyledTable 
            rowClassName={() => "rowClassName1"}
            columns={columns} dataSource={data} onRow={(r) => ({
            onClick: () => (window.location.href = ''+r.url) })}/>
        ) : (
          <div>
            {data.map((item) => {
              return item.address === keyword ? (
                <div>
            
            <StyledTable columns={columns} dataSource={[item]} size="middle" onRow={(r) => ({
              onClick: () => (window.location.href = ''+r.url)
            })} />
                  {/* </Link> */}
                </div>
              ) : null;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeModule;
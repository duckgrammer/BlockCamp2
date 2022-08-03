import { useRouter, NextRouter } from 'next/router';
import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import React, { useEffect, useState } from 'react';
import {Modal, Button, Row, Col, Avatar, Table, Tag, Space} from 'antd';
import 'antd/dist/antd.css';
import { UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';

export const getStaticPaths = async () => {
  return {
    paths: [{ params: { addr: '' } }, { params: { addr: '0x10A19e7eE7d7F8a52822f6817de8ea18204F2e4f' } }, { params: { addr: '0x19B3Eb3Af5D93b77a5619b047De0EED7115A19e7' } }],
    fallback: false, // fallback is set to false because we already know the slugs ahead of time
  };
};

// import React from 'react'

export const getStaticProps = async ({ params }) => {
  // const transactiondetails = await fetch('0x1234' + params.addr).then((r) => r.json());
  const res = await fetch('https://blockcamp-api.chom.dev:2053/gnosis/transactions/' + params.addr).then((res) => res.json());
  console.log(res)
  return {
    props: {res: res},
  };
};
// interface Props {
//   addr: string;
// }
const Gnosis = ({ res }) => {
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [viewMore, setViewMore] = useState(false);
  //const [currModalInfo, setCurrModalInfo] = useState(null);

  const columns = [
    {
      title: 'Execution Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Activity',
      dataIndex: 'activity',
      key: 'activity',
    },
    {
      title: 'Interacted Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Address Type',
      dataIndex: 'addresstype',
      key: 'addresstype',
      render: (_, { addresstype }) => (
        <>
          <Button shape="circle" type="primary" onClick={() => showModal(addresstype)} icon={<UserOutlined />}/>
        </>
      ),
    },
    {
      title: 'Transfer',
      dataIndex: 'transfer',
      key: 'transfer',
    },
    {
      title: 'Frequency',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
  
            if (tag === 'loser') {
              color = 'volcano';
            }
  
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Remark',
      dataIndex: 'remark',
      key: 'remark',
    },
  ];

  const[currModalInfo, setCurrModalInfo] = useState();

  const showModal = (e) => {
    //setCurrModalInfo(e);
    //const temp: signer[];
    let temp = new Array();
    for(var i = 0; i < e.confirmations.length; i++){
      const t = {
        owner: e.confirmations[i].owner,
        submissionDate: e.confirmations[i].submissionDate,
        signature: e.confirmations[i].signature,
        signatureType: e.confirmations[i].signatureType,
      }
      temp.push(t);
    }
    setCurrModalInfo(
      {
        length: e.confirmations.length,
        required: e.confirmations.required,
        signerList: temp,
      }
    );
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    for (var i = 0; i < 100; i++) {
      // console.log(ob[i].transactionHash);
      console.log(res[i].transactionHash);
      // if(typeof ob[i] !== undefined){
      if(typeof res[i] !== undefined){
        const temp = { 
          key: res[i].transactionHash,
          date: res[i].executionDate,
          // key: ob[i].transactionHash,
          // date: ob[i].executionDate,
          activity: 'test',
          address: res[i].to,
          addresstype: res[i],
          // address: ob[i].to,
          // addresstype: ob[i],
          transfer: 'test',
          tags: ['cat', 'giraffe'],
          remark: 'test',
        }
        setData(data => [...data, temp]);
      }
    }
    //console.log(data);
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const StyledTable = styled(Table)`
    .ant-table-thead > tr > th{
      color: #fa5036;
    }
  `;

  return (
    // <div >
    <div key={res.id} style={{backgroundColor: "#fff7f8"}}>
      <h1>{res.length}</h1>
      {/* <h1>{ob.length}</h1> */}
      <StyledTable columns={columns} dataSource={data} style={{padding: "40px"}}/>
      <Modal 
        title={currModalInfo?.length+" Signers "+currModalInfo?.required+" Required"} 
        visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={800}
      >
            {currModalInfo?.signerList.map((item) => {
              return (
                <Row style={{paddingBlock: '25px'}} key={item.owner}>
                  <Col span={6} style={{textAlign: 'right', paddingRight: '30px'}}>
                    <Avatar size={64} icon={<UserOutlined />}/>
                  </Col>
                  <Col span={18}>
                    <div>
                      <h1>Owner: {item.owner}</h1>
                      <h1>Date: {item.submissionDate.slice(0, 10)}</h1>
                      <h1>
                        Signature: {viewMore ? item.signature:item.signature.slice(0,40)+"..."}
                        <a onClick={()=>setViewMore(true)}>{viewMore ? "":"view more"}</a>
                      </h1>
                      <h1>Signature Type: {item.signatureType}</h1>
                    </div>
                  </Col>
                </Row>
              );
            })}
      </Modal>
    </div>
  );
};

export default Gnosis;
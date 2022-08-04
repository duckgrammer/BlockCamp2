import React, { useState } from 'react';
import {Modal, Row, Col, Avatar, Table, Tag, Image} from 'antd';
import 'antd/dist/antd.css';
import { UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import NumberFormat from 'react-number-format';

export const getStaticPaths = async () => {
  return {
    paths: [{ params: { addr: '0x10A19e7eE7d7F8a52822f6817de8ea18204F2e4f' } }, { params: { addr: '0x19B3Eb3Af5D93b77a5619b047De0EED7115A19e7' }},{ params: { addr: '0xb618F903ad1d00d6F7b92f5b0954DcdC056fC533' }, }],
    fallback: false, // fallback is set to false because we already know the slugs ahead of time
  };
};

export const getStaticProps = async ({ params }) => {
  // const transactiondetails = await fetch('0x1234' + params.addr).then((r) => r.json());
  const res = await fetch('https://api.orgboard.finance:2053/gnosis/recurring/' + params.addr).then((res) => res.json());
  // console.log(res)
  return {
    props: {res: res},
  };
};

const Gnosis = ({ res }) => {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [viewMore, setViewMore] = useState(false);

  const columns = [
    {
      title: 'Execution Time',
      dataIndex: 'executionDate',
      key: 'executionDate',
      sorter: (a, b) => new Date(a.executionDate) - new Date(b.executionDate),
      render: (_, {executionDate}) => (
        <>
          <p>
            {executionDate.slice(11,19) + " " + executionDate.slice(0,10)}
          </p>
        </>
      ),
    },
    {
      title: 'Activity',
      dataIndex: 'type',
      key: 'type',
      filters: [
        {
          text: 'SENT',
          value: 'sent',
        },
        {
          text: 'RECIEVE',
          value: 'recieve',
        },
      ],
      render: (_, {type}) => (
        <>
          <p style={{color: type === "SENT" ? "red": "green"}}>
            {type}
          </p>
        </>
      ),
    },
    {
      title: 'Interacted Address',
      dataIndex: 'recipient',
      key: 'recipient',
    },
    {
      title: 'Signer',
      dataIndex: 'addresstype',
      key: 'addresstype',
      render: (_, { addresstype }) => (
        <>
          <Avatar.Group maxCount={1}
            maxStyle={{
              color: "#fa5036",
              backgroundColor: "#fde3cf"
            }}
          >
            {[...Array(3)].map((e, i) => 
              <Avatar 
                key={i}
                style={{
                  backgroundColor: '#fa5036',
                }}
                icon={<UserOutlined />}
                onClick={() => showModal(addresstype)} 
                shape="circle" type="primary"
              />
            )}
          </Avatar.Group>
        </>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'usdValue',
      key: 'usdValue',
      render: (_, { usdValue, tokenSymbol, amount}) => (
        <>
          <p>
            <NumberFormat displayType={'text'} value={amount} thousandSeparator={true} decimalScale={2} fixedDecimalScale={true}/>
            {" " + tokenSymbol + "\n≈ $"}
            <NumberFormat displayType={'text'} value={usdValue} thousandSeparator={true} decimalScale={2} fixedDecimalScale={true}/>
          </p>
        </>
      ),
      sorter: (a, b) => a.usdValue-b.usdValue,
    },
    {
      title: 'Recurring',
      key: 'recurringMonths',
      dataIndex: 'recurringMonths',
      render: (_, { recurringMonths }) => (
        <>
          <Tag color={recurringMonths === 1 ? "volcano": recurringMonths < 6 ? "geekblue" : "green"}>
            {recurringMonths === 1 ? "never interacted before this month"
            : 
            recurringMonths < 6 ? "interacted monthly for "+recurringMonths+" months" 
            :
             "interacted monthly over 6 months"}
          </Tag>
        </>
      ),
    },
    {
      title: 'Tornado Cash Flag',
      dataIndex: 'flag',
      key: 'flag',
    },
    {
      title: 'Remark',
      dataIndex: 'remark',
      key: 'reamark',
    },
  ];

  const columns2 = [
    {
      title: 'Rank',
      dataIndex: 'rank',
      key: 'rank',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Total Interactions',
      dataIndex: 'interactions',
      key: 'interactions',
    },
    {
      title: 'Remark',
      dataIndex: 'remark',
      key: 'remark',
    },
  ];

  const dataTx = [  {
    to: '0x3B8910F378034FD6E103Df958863e5c684072693',
    amount: 32941,
    usdValue: 33006.882,
    type: 'SENT',
    transactionHash: '0xf17d8b4c6e51db905473089efe89ead3e0ce77c9f785dbf84194051d21275589',
    tokenAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    tokenName: 'USD Coin',
    tokenSymbol: 'USDC',
    tokenDecimals: 6,
    executionDate: '2022-06-29T14:06:17.000Z',
    recurringMonths: 2
  },
  {
    to: '0x3B8910F378034FD6E103Df958863e5c684072693',
    amount: 67919,
    usdValue: 68054.838,
    type: 'SENT',
    transactionHash: '0xf17d8b4c6e51db905473089efe89ead3e0ce77c9f785dbf84194051d21275589',
    tokenAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    tokenName: 'USD Coin',
    tokenSymbol: 'USDC',
    tokenDecimals: 6,
    executionDate: '2022-06-29T14:06:17.000Z',
    recurringMonths: 2
  },
  {
    to: '0x166f54F44F271407f24AA1BE415a730035637325',
    amount: 22805,
    usdValue: 140706.85,
    type: 'SENT',
    transactionHash: '0xf17d8b4c6e51db905473089efe89ead3e0ce77c9f785dbf84194051d21275589',
    tokenAddress: '0xba100000625a3754423978a60c9317c58a424e3D',
    tokenName: 'Balancer',
    tokenSymbol: 'BAL',
    tokenDecimals: 18,
    executionDate: '2022-06-29T14:06:17.000Z',
    recurringMonths: 6
  },
  {
    to: '0xc38c5f97B34E175FFd35407fc91a937300E33860',
    amount: 40000,
    usdValue: 246800,
    type: 'SENT',
    transactionHash: '0x3a11843ee166c7b543bf0f76df5a26ca170ca1be640a84c4f3000f39fc458e74',
    tokenAddress: '0xba100000625a3754423978a60c9317c58a424e3D',
    tokenName: 'Balancer',
    tokenSymbol: 'BAL',
    tokenDecimals: 18,
    executionDate: '2022-06-14T11:39:43.000Z',
    recurringMonths: 2
  },
  {
    to: '0xc38c5f97B34E175FFd35407fc91a937300E33860',
    amount: 40000,
    usdValue: 246800,
    type: 'SENT',
    transactionHash: '0x3a11843ee166c7b543bf0f76df5a26ca170ca1be640a84c4f3000f39fc458e74',
    tokenAddress: '0xba100000625a3754423978a60c9317c58a424e3D',
    tokenName: 'Balancer',
    tokenSymbol: 'BAL',
    tokenDecimals: 18,
    executionDate: '2022-06-14T11:39:43.000Z',
    recurringMonths: 2
  },
  {
    to: '0x2DF104682A61241C79eBB3ce3b2C293578bF6A9D',
    amount: 300000,
    usdValue: 306300,
    type: 'SENT',
    transactionHash: '0x7a7e27a77a73cb3f946fe09ae1cf8c1473050acab01162d9691d987a34cb8508',
    tokenAddress: '0x7B50775383d3D6f0215A8F290f2C9e2eEBBEceb2',
    tokenName: 'Balancer Aave Boosted StablePool (USD)',
    tokenSymbol: 'bb-a-USD',        
    tokenDecimals: 18,
    executionDate: '2022-06-07T23:26:24.000Z',
    recurringMonths: 2
  },
  {
    to: '0xc38c5f97B34E175FFd35407fc91a937300E33860',
    amount: 31250,
    usdValue: 192812.5,
    type: 'SENT',
    transactionHash: '0x3370ae2b3ff6e98b82fc295262dfc8cf7c403f2f049696c037eb027b1a60ca81',
    tokenAddress: '0xba100000625a3754423978a60c9317c58a424e3D',
    tokenName: 'Balancer',
    tokenSymbol: 'BAL',
    tokenDecimals: 18,
    executionDate: '2022-05-31T14:12:54.000Z',
    recurringMonths: 2
  },
  {
    to: '0x2DF104682A61241C79eBB3ce3b2C293578bF6A9D',
    amount: 20000,
    usdValue: 123400,
    type: 'SENT',
    transactionHash: '0xd8bf64fccbd8635116ba6c2e2c9c9f4f221007e5a0ed377732ffbfd0de95f89c',
    tokenAddress: '0xba100000625a3754423978a60c9317c58a424e3D',
    tokenName: 'Balancer',
    tokenSymbol: 'BAL',
    tokenDecimals: 18,
    executionDate: '2022-05-23T13:13:44.000Z',
    recurringMonths: 2
  },
  {
    to: '0x0Aae30aaEC6ed2726e6B7F59a724cAd3C7bf69e8',
    amount: 25000,
    usdValue: 154250,
    type: 'SENT',
    transactionHash: '0xcd5f5f28559e444408ef69084be521c94c9a0a3f09a54ff8476dd6231731393a',
    tokenAddress: '0xba100000625a3754423978a60c9317c58a424e3D',
    tokenName: 'Balancer',
    tokenSymbol: 'BAL',
    tokenDecimals: 18,
    executionDate: '2022-05-11T07:44:02.000Z',
    recurringMonths: 1
  },
  {
    to: '0xE2c91f3409Ad6d8cE3a2E2eb330790398CB23597',
    amount: 46425,
    usdValue: 286442.25,
    type: 'SENT',
    transactionHash: '0xfcdfe65fe412cf417ae6fc657a2f27b9af5927a1c9ec783616e7c9bdb940459b',
    tokenAddress: '0xba100000625a3754423978a60c9317c58a424e3D',
    tokenName: 'Balancer',
    tokenSymbol: 'BAL',
    tokenDecimals: 18,
    executionDate: '2022-04-19T22:05:03.000Z',
    recurringMonths: 1
  },
  {
    to: '0x166f54F44F271407f24AA1BE415a730035637325',
    amount: 40250,
    usdValue: 248342.5,
    type: 'SENT',
    transactionHash: '0xaa3ce7822f72a760f6229766d2866f3ae5aa18c1e22ea69b5a2baa07ae92e68d',
    tokenAddress: '0xba100000625a3754423978a60c9317c58a424e3D',
    tokenName: 'Balancer',
    tokenSymbol: 'BAL',
    tokenDecimals: 18,
    executionDate: '2022-04-19T22:04:06.000Z',
    recurringMonths: 6
  },
  {
    to: '0x166f54F44F271407f24AA1BE415a730035637325',
    amount: 172400,
    usdValue: 176020.4,
    type: 'SENT',
    transactionHash: '0x9d80b42216bddb578b12c526df19c865cdd6b7e94ba595b4e9f8b56a11d0af87',
    tokenAddress: '0x7B50775383d3D6f0215A8F290f2C9e2eEBBEceb2',
    tokenName: 'Balancer Aave Boosted StablePool (USD)',
    tokenSymbol: 'bb-a-USD',        
    tokenDecimals: 18,
    executionDate: '2022-04-19T22:01:06.000Z',
    recurringMonths: 6
  },
  {
    to: '0x7c68c42De679ffB0f16216154C996C354cF1161B',
    amount: 14.34617577,
    usdValue: 23737.899737830503,   
    type: 'SENT',
    transactionHash: '0xe72d951c52a2824f40d185e788abe02386aba1a1667bc737d12e3d4086cf59d2',
    tokenAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    tokenName: 'Wrapped Ether',     
    tokenSymbol: 'WETH',
    tokenDecimals: 18,
    executionDate: '2022-03-24T20:30:36.000Z',
    recurringMonths: 1
  },
  {
    to: '0x7c68c42De679ffB0f16216154C996C354cF1161B',
    amount: 17451,
    usdValue: 49037.31,
    type: 'SENT',
    transactionHash: '0x3404f7487d3fc9947cb8083258a0a1792eada9fc38c7c7ee9496372e8018f05c',
    tokenAddress: '0xDe30da39c46104798bB5aA3fe8B9e0e1F348163F',
    tokenName: 'Gitcoin',
    tokenSymbol: 'GTC',
    tokenDecimals: 18,
    executionDate: '2022-03-24T20:29:06.000Z',
    recurringMonths: 1
  },
  {
    to: '0x7c68c42De679ffB0f16216154C996C354cF1161B',
    amount: 1164199.699999,
    usdValue: 1166528.0993989978,   
    type: 'SENT',
    transactionHash: '0xcdbe5fd45b90fee9e75f493e9c89439177ba7caea8e1a408436afea07fa5b3e7',
    tokenAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    tokenName: 'USD Coin',
    tokenSymbol: 'USDC',
    tokenDecimals: 6,
    executionDate: '2022-03-24T19:29:40.000Z',
    recurringMonths: 1
  },
  {
    to: '0x6fA2BACF752DAb6cb6E4B922321F03b4Cb61D141',
    amount: 125000,
    usdValue: 125250,
    type: 'SENT',
    transactionHash: '0x7b411adf3f22231522d0c2d0cd2d5745c60d5438318f5ab7e25ee4de1dac3cbe',
    tokenAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    tokenName: 'USD Coin',
    tokenSymbol: 'USDC',
    tokenDecimals: 6,
    executionDate: '2022-03-17T22:18:45.000Z',
    recurringMonths: 1
  },
  {
    to: '0x4f8AD938eBA0CD19155a835f617317a6E788c868',
    amount: 9051,
    usdValue: 1447978.98,
    type: 'SENT',
    transactionHash: '0x65060c426c68e9481b17e1b6b9230469cf389e24845d0c56c9da168f11e79f18',
    tokenAddress: '0x6810e776880C02933D47DB1b9fc05908e5386b96',
    tokenName: 'Gnosis',
    tokenSymbol: 'GNO',
    tokenDecimals: 18,
    executionDate: '2022-02-09T12:37:18.000Z',
    recurringMonths: 1
  },
  {
    to: '0x166f54F44F271407f24AA1BE415a730035637325',
    amount: 22105,
    usdValue: 136387.85,
    type: 'SENT',
    transactionHash: '0x3f6f7d4d1cfc86a4fa3f79700c87938d357d017e539e9c714ceadf391015f348',
    tokenAddress: '0xba100000625a3754423978a60c9317c58a424e3D',
    tokenName: 'Balancer',
    tokenSymbol: 'BAL',
    tokenDecimals: 18,
    executionDate: '2022-02-02T12:04:29.000Z',
    recurringMonths: 6
  },
  {
    to: '0xc38c5f97B34E175FFd35407fc91a937300E33860',
    amount: 165000,
    usdValue: 164793.585,
    type: 'SENT',
    transactionHash: '0x1bf22381a301fce0de54674b9805d9a67fbf7ab2df1af3e97bc1d269f401a310',
    tokenAddress: '0x0000000000085d4780B73119b644AE5ecd22b376',
    tokenName: 'TrueUSD',
    tokenSymbol: 'TUSD',
    tokenDecimals: 18,
    executionDate: '2022-02-02T12:01:27.000Z',
    recurringMonths: 2
  },
  {
    to: '0x849D52316331967b6fF1198e5E32A0eB168D039d',
    amount: 200000,
    usdValue: 1234000,
    type: 'SENT',
    transactionHash: '0x02dca750c68d225fffd54d209691e3e25efc736d7915452641a31067a7f5d403',
    tokenAddress: '0xba100000625a3754423978a60c9317c58a424e3D',
    tokenName: 'Balancer',
    tokenSymbol: 'BAL',
    tokenDecimals: 18,
    executionDate: '2022-02-01T13:51:49.000Z',
    recurringMonths: 1
  },
  {
    to: '0x8f2326316eC696F6d023E37A9931c2b2C177a3D7',
    amount: 334000,
    usdValue: 50806.076,
    type: 'SENT',
    transactionHash: '0xd44bb93d15a0235cfe7d479522db0558cd2df672b7282cb15c3a3131b18d36c4',
    tokenAddress: '0xa3BeD4E1c75D00fa6f4E5E6922DB7261B5E9AcD2',
    tokenName: 'Meta',
    tokenSymbol: 'MTA',
    tokenDecimals: 18,
    executionDate: '2022-01-03T14:09:33.000Z',
    recurringMonths: 1
  },
  {
    to: '0xd8553552f8868C1Ef160eEdf031cF0BCf9686945',
    amount: 2454000,
    usdValue: 2458908,
    type: 'SENT',
    transactionHash: '0xff0278acce2f19cd2d0494418cca5d3b7d430ec913ea1772a56d50509cc8390f',
    tokenAddress: '0x956F47F50A910163D8BF957Cf5846D573E7f87CA',
    tokenName: 'Fei USD',
    tokenSymbol: 'FEI',
    tokenDecimals: 18,
    executionDate: '2021-12-24T19:31:20.000Z',
    recurringMonths: 1
  },
  {
    to: '0xFd3300A9a74b3250F1b2AbC12B47611171910b07',
    amount: 2598000,
    usdValue: 420857.814,
    type: 'SENT',
    transactionHash: '0x780901a9e6b5589f2762e85c0b55661aedd1b9271fd543ac9782624ca2ff44d5',
    tokenAddress: '0xc7283b66Eb1EB5FB86327f08e1B5816b0720212B',
    tokenName: 'Tribe',
    tokenSymbol: 'TRIBE',
    tokenDecimals: 18,
    executionDate: '2021-12-24T18:30:05.000Z',
    recurringMonths: 1
  },
  {
    to: '0x567d220B0169836cBF351DF70A9c517096ec9De7',
    amount: 25000,
    usdValue: 154250,
    type: 'SENT',
    transactionHash: '0x3ee3bc34a373ace62940a0fd80b9037d5e88384507bc3c5ae0dca8c476676b9a',
    tokenAddress: '0xba100000625a3754423978a60c9317c58a424e3D',
    tokenName: 'Balancer',
    tokenSymbol: 'BAL',
    tokenDecimals: 18,
    executionDate: '2021-12-14T19:48:15.000Z',
    recurringMonths: 1
  },
  {
    to: '0x67905d3e4fec0C85dCe68195F66Dc8eb32F59179',
    amount: 20000,
    usdValue: 123400,
    type: 'SENT',
    transactionHash: '0x0746315cf5c171fb57de9153814435d931f9151c5eb93533a19cf7b9a6ccdb04',
    tokenAddress: '0xba100000625a3754423978a60c9317c58a424e3D',
    tokenName: 'Balancer',
    tokenSymbol: 'BAL',
    tokenDecimals: 18,
    executionDate: '2021-12-14T19:46:19.000Z',
    recurringMonths: 1
  }
]

  const data2 = [
    {
      rank: 1,
      address: "0x4bb4c1B0745ef7B4642fEECcd0740deC417ca0a2",
      interactions: 3321,
      remark: "Salary"
    },
    {
      rank: 2,
      address: "0xb2701351a2c1c6E30BFA2699d25f85a5100e39D3",
      interactions: 3123,
      remark: "N/A"
    },
    {
      rank: 3,
      address: "0xFBb3a85603C398Ff22435DD40873EC190134e1f6",
      interactions: 3013,
      remark: "Donation"
    }
  ]

  const currModalInfo = {
    length: 3,
    required: 3,
    signerList: 
    [
      {
        owner: "0x4bb4c1B0745ef7B4642fEECcd0740deC417ca0a2",
        submissionDate: "2022-07-20T14:28:56.486394Z",
        signature: "0x01dc1e1da8f58c5ffb4363d53692543256e09ea625e54064e3e62187fc343a560ec3b4714cd0396d9b6c4d285f6917549253d400c6f46baa6e4f2765620f94de1c",
        signatureType: "EOA",
      },
      {
        owner: "0xb2701351a2c1c6E30BFA2699d25f85a5100e39D3",
        submissionDate: "2022-07-20T14:32:01.479106Z",
        signature: "0xa00edc916fb22d5f53f8b2c6486d4ca50bee21859428f9996b474602cf689e8523916a0345e0ac22b3d33046a303f62070df028f18ca344737ce6768f78d12f61c",
        signatureType: "EOA",
      },
      {
        owner: "0xFBb3a85603C398Ff22435DD40873EC190134e1f6",
        submissionDate: "2022-07-21T07:23:19.614148Z",
        signature: "0xea74fef88a42e6a80d74c9fc6834b4aa1fa34a61c564d6f4e2c816bb3f02714623a2d16337b84719bb5af049e386e7bdf1505e5757ba7bbd766eeef664db94391c",
        signatureType: "EOA",
      },
    ],
  }
  const showModal = (e) => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  
  const StyledTable = styled(Table)`
    .ant-table-thead > tr > th{
     color: #fa5036;
    }
  `;

  return (
    <div key={res.id} style={{backgroundColor: "#fff7f8", padding: "40px"}}>
      <Row>
        <Col flex="auto">
          <h2 style={{fontSize: "20px"}}>Top Interacted Addresses</h2>
          <StyledTable pagination={false} columns={columns2} dataSource={data2} style={{paddingRight: "20px"}}/>
        </Col>
        <Col flex="750px">
          <h2 style={{fontSize: "20px"}}>Wallet Activity Chart</h2>
          <img src="/chart.png" style={{width: "750px"}}/>
        </Col>
      </Row>
      <h2 style={{fontSize: "20px", paddingTop: "30px"}}>Transaction History</h2>
      <StyledTable columns={columns} dataSource={res}
      onRow={(r) => ({
        onClick: () => window.open("https://etherscan.io/tx/"+r.transactionHash) }
      )}
      />
      <Modal 
        title={currModalInfo.length+" Signers "+currModalInfo.required+" Required"} 
        visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={800}
      >
            {currModalInfo.signerList.map((item) => {
              return (
                <Row style={{paddingBlock: '25px'}} key={item.owner}>
                  <Col span={6} style={{textAlign: 'right', paddingRight: '30px'}}>
                    <Avatar size={64} icon={<UserOutlined />}/>
                  </Col>
                  <Col span={18}>
                    <div>
                      <p>Owner: {item.owner}</p>
                      <p>Time: {item.submissionDate.slice(11, 19)}</p>
                      <p>Date: {item.submissionDate.slice(0, 10)}</p>
                      <p>
                        Signature: {viewMore ? item.signature:item.signature.slice(0,40)+"..."}
                        <a onClick={()=>setViewMore(true)}>{viewMore ? "":"view more"}</a>
                      </p>
                      <p>Signature Type: {item.signatureType}</p>
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
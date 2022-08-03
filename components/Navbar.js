import { useEffect, useState } from 'react';
import SearchBar from './Searchbar';
import{ Row, Col, Image } from 'antd';
import Logo from '../public/logo.png';
import { Button } from 'antd/lib/radio';
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const loadAccountData = async () => {};
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  useEffect(() => {
    loadAccountData();
  }, []);
  return (
    <Row style={{height: "100px"}}>
        <Col span={6} style={{display: "flex", alignItems: "center", paddingLeft: "20px"}}>
            <img src="/logo.png" style={{height: "120px"}}></img>
        </Col>
        <Col span={12} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
            <SearchBar/>
        </Col>
        <Col span={6} style={{display: "flex", alignItems: "center", justifyContent: "end"}}>
            <Button style={{marginInline: "10px"}}>List Dao</Button>
            <Button style={{marginRight: "30px"}}>Premium</Button>
        </Col>
    </Row>
  );
}

export default Navbar;
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
    <Row style={{height: "100px", display: "flex", alignItems: "center"}}>
        <Col span={6} style={{paddingLeft: "20px"}}>
            <img src="/logo.png" style={{height: "80px"}} onClick={() => window.location = '/'}></img>
        </Col>
        <Col span={12} style={{display: "flex", justifyContent: "center"}}>
        {/*window.location.pathname === '/' ? null : <SearchBar />*/}
          <SearchBar />
        </Col>
        <Col span={6} style={{display: "flex", justifyContent: "end"}}>
            <Button style={{marginInline: "10px"}}>List Dao</Button>
            <Button style={{marginRight: "30px", backgroundColor: "#fa5036", color: "#fff"}}>Premium</Button>
        </Col>
    </Row>
  );
}

export default Navbar;
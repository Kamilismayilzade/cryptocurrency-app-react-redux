import { Card, Col, Row, Input } from 'antd'
import millify from 'millify'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGetCryptosQuery } from '../services/cryptoApi'
import Loader from './Loader'

const Cryptocurrencies = ({ simpleVersion }) => {

  const counter = simpleVersion ? 10 : 100;
  const {data: cryptoList, isFetching} = useGetCryptosQuery(counter);
  const [cryptos, setCryptos] = useState();  //cryptoList?.data?.coins
  const [searchTerm, setSearchTerm] = useState('');

  useEffect( ()=> {

    setCryptos(cryptoList?.data?.coins);

    const filteredCryptos = cryptoList?.data?.coins.filter((coin)=> coin.name.toLowerCase().includes(searchTerm.toLowerCase()));

    setCryptos(filteredCryptos);

  }, [cryptoList, searchTerm] );
  
  if (isFetching) return <Loader />;

  return (

    <>

   { !simpleVersion && (<div className='search-crypto'>
      <Input placeholder='Search for cryptocurrencies...' onChange={ (e)=> setSearchTerm(e.target.value) } />
    </div> 
    )}
    
      <Row gutter={[32, 32]} className='crypto-card-container' >
        {cryptos?.map((currency)=> (
            <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.id} >
              <Link to={`/crypto/${currency.id}`} >
                <Card title={`${currency.rank} ${currency.name} `} extra={ <img className='crypto-image' src={currency.iconUrl} /> } hoverable >
                  <p>Price: {millify(currency.price)} </p>
                  <p>Daily Change: {millify(currency.change)}% </p>
                  <p>Market Cap: {millify(currency.marketCap)} </p>
                </Card>
              </Link>
            </Col>
        ))}
      </Row>

    </>
    
  )
}

export default Cryptocurrencies
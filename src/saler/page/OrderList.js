import React,{useState, useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import Button from '@material-ui/core/Button';
import ApiService from '../ApiService';
import OrderInfo from '../component/OrderInfo';
import Appbar from '../component/Appbar';

export default function OrderList(props) {
  const [orderList, setOrderList] = useState([]);
 
  useEffect(()=>{
    if(window.localStorage.getItem("userID")===null){
      alert("로그인을 해주세요.");
      props.history.push('login');
    }else{
      loadSalerOrderList(window.localStorage.getItem("userID"));
    }
  },[]);
  const loadSalerOrderList=(su_id)=> {
    ApiService.loadSalerOrderList(su_id)
    .then(res=>{
      setOrderList(res.data);
      console.log(res.data);
    })
    .catch(err=>{
      console.log("loadSalerOrderList Error!",err);
    })
  }
  
  const stateRefresh =()=>{
    setOrderList([]);
    loadSalerOrderList(window.localStorage.getItem("userID"));
  }
  const returnOrderList=(data)=>{
    return data.map((c,index)=>{
      return <OrderInfo key={index,c.ord_id} ord={c.ord_id} su_id={c.su_id} pu_id={c.pu_id} num={index+1} addr1={c.addr1} addr2={c.addr2} dreqstart={c.dreqstart} dreqend={c.dreqend} ordDate={c.ordDate} stateRefresh={stateRefresh} />;
    })
  }
  const cellList = ["번호","배송지","요청시간(부터)","요청시간(까지)","메뉴","총 금액","주문일시","배달","취소"];
  return (
    <>
    <Appbar>
      <Container style={{marginTop:'20px', width:'1200px'}}>
      <Typography variant="h5" gutterBottom><b>주문 내역</b></Typography>
      <Table>
        <TableHead>
          <TableRow>
            {cellList.map((c,index)=>{
              return <TableCell key={index}>{c}</TableCell>
            })}
          </TableRow>
        </TableHead>
        <TableBody>
        {orderList.length>0?returnOrderList(orderList):"주문내역이 없습니다!"}
        </TableBody>
      </Table>
      </Container>
      </Appbar>
    </>
  );
}
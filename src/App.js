import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

  let post = '블로그임';
  let [title, setTitle] = useState(['<남자 코트 추천>', '<강남 우동맛집>', '<파이썬독학>']);
  let [date, setDate] = useState(['11월1일', '11월2일', '11월3일']);
  let [good, setGood] = useState([0, 0, 0]);

  let [modal, setModal] = useState(false); 
  let [selTitle, setSelTitle] = useState(title[0]);
  let [selDate, setSelDate] = useState(date[0]);

  let [newTitle, setNewTitle] = useState('');

  function test() {
    console.log(good);
    good++;
  }

  return (
    <div className="App">
      <div className="black-nav">
        <h4>ReactBlog</h4>
      </div>
      <button onClick={()=>{
        let copy = [...title];
        copy[0] = '여자 코트 추천!!!';
        console.log(copy==title);
        setTitle(copy);}}>글수정</button>
      
      <button onClick={()=>{
        let arrSort = [];
        arrSort = [...title.sort()];
        setTitle(arrSort);
      }}>
        가나다순정렬
      </button>

      {
        title.map(function(arrTitle, idx) {
          let copyGood = [...good];
          console.log(copyGood);
          return (
            <div className="list">
              <h4 onClick={()=>{ 
                setSelTitle(arrTitle);
                setSelDate(date[idx]);
                console.log(modal);
                setModal(!modal); 
                }}> { arrTitle } 
                <span onClick={(e) => {
                  e.stopPropagation();
                  copyGood[idx]++;
                  setGood(copyGood);
                  }}>
                  👍
                </span> 
                { copyGood[idx] }
                &nbsp;&nbsp;
                <button onClick={()=>{
                  let copyTitle = [...title];
                  copyTitle.splice(idx, 1);
                  let confirmYn = window.confirm('해당 게시글을 삭제하시겠습니까?');
                  (confirmYn)?setTitle(copyTitle):console.log(title);
                }}>삭제</button> 
              </h4>
              
              <p>{date[idx]} 발행</p>
            </div>
          )
        })
      }

      <input onChange={(e)=>{
        setNewTitle(e.target.value);
        
      }}></input>
      <button onClick={()=>{
        let copyTitle = [...title];
        let copyDate = [...date];
        let copyGood = [...good];
        copyTitle.push(newTitle);
        let now = new Date();
        let nowMonth = now.getMonth()+1;
        let nowDate = now.getDate();
        copyDate.push(nowMonth+'월'+nowDate+'일');
        copyGood.push(0);
        let confirmYn = window.confirm('새로운 게시글을 등록하시겠습니까?');
        (confirmYn)?setTitle(copyTitle):alert('등록을 취소했습니다.');
        (confirmYn)?(setDate(copyDate)):(console.log());
        (confirmYn)?(setGood(copyGood)):(console.log());}}>등록</button>
      
      {
        (modal == true)?<Modal title={selTitle} color="yellow" date={selDate} arrTitle={title} modTitle={setTitle}></Modal>:null
      }

    </div>
  );
}

function Modal(props) {
  return (
    <div className="modal" style={{background : props.color}}>
        <h4>제목 : {props.title}</h4>
        <p>날짜 : {props.date}</p>
        <p>상세내용</p>
        <button onClick={()=>{
          let copyTitle = [...props.arrTitle];
          copyTitle[0] = "여자추천코트";
          props.modTitle(copyTitle);
        }}>글수정</button>
      </div>
  )
}

export default App;

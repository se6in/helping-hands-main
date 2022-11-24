
import "../css/repair.css"
import { useNavigate } from "react-router-dom";
import leftarrow from '../img/leftarrow.png';
import React,{useState,useCallback,useEffect} from "react";
import axios from 'axios';
import { useDispatch } from "react-redux";
import {repairUpload} from "../_actions/userAction";
import {repairApplication} from "../_actions/userAction";
function Repair(){
  var now = new Date();
var year = now.getFullYear();
var month = now.getMonth();
var date = now.getDate();
var hours = now.getHours();	
var minutes = now.getMinutes();
var seconds = now.getSeconds();
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const [image, setImage] = useState({
        image_file: "",
        preview_URL:  '../img/default_image.png'
      });
      const [image1, setImage1] = useState({
        image_file: "",
        preview_URL: '../img/default_image.png'
      }); 
      let inputRef;
      let inputRef1;
      const saveImage = (e) => {
        e.preventDefault();
        if(e.target.files[0]){
          // 새로운 이미지를 올리면 createObjectURL()을 통해 생성한 기존 URL을 폐기
          URL.revokeObjectURL(image.preview_URL);
          const preview_URL = URL.createObjectURL(e.target.files[0]);
          setImage(() => (
            {
              image_file: e.target.files[0],
              preview_URL: preview_URL
            }
          ))
        }
      }
      const saveImage1 = (e) => {
        e.preventDefault();
        if(e.target.files[0]){
          // 새로운 이미지를 올리면 createObjectURL()을 통해 생성한 기존 URL을 폐기
          URL.revokeObjectURL(image1.preview_URL);
          const preview_URL = URL.createObjectURL(e.target.files[0]);
          setImage1(() => (
            {
              image_file: e.target.files[0],
              preview_URL: preview_URL
            }
          ))
        }
      }
      const sendImageToServer = (e) => {
        e.preventDefault();  
          const formData = new FormData();
          console.log(formData);
          formData.append('file', image.image_file);
          formData.append('file', image1.image_file);
          formData.append('Img1', id);
          formData.append('title', title);
          formData.append('address', address);
          formData.append('text',text);
          console.log(formData)
                  dispatch(repairUpload(formData))
                  .then(response=>{
                    if(response.payload.success){
                  alert("신청이 완료되었습니다.");
                  navigate("/Home");
                }
                else{
                  alert("실패");
                }
              })
          }
  useEffect(()=> {
    // 컴포넌트가 언마운트되면 createObjectURL()을 통해 생성한 기존 URL을 폐기
    return () => {
      URL.revokeObjectURL(image.preview_URL)
      URL.revokeObjectURL(image1.preview_URL)
    }
  }, [])

  const [session,setSession]= useState("");
  const [id,setid] = useState("");
  useEffect(()=>{
    axios.get(`/api/users/Session`)
    .then(response => {
     console.log(JSON.stringify(response.data.user));
     console.log(JSON.stringify(response.data.id));
        setSession(response.data.user);
        setid(response.data.id);
    })
  },[]);
    const [title, setTitle] = useState("");
    const [address, setAddress] = useState("");
    const [text,setText] = useState("");
    const onChangeTitle = useCallback(e => {
        setTitle(e.target.value);
        }, []);
    const onChangeText = useCallback(e => {
        setText(e.target.value);
        }, []);
    const onChangeAddress = useCallback(e => {
        setAddress(e.target.value);
        }, []);            
    return(
        <div id="repair_back">
            <div id = "package">
            <div id="repair_div1">
                <button id="repair_back_button" onClick={() => {navigate("/Home")}} >
                    <img src={leftarrow} style={{ width: 30, height: 20 }} alt='화살표' />
                </button>
                <div id="repair_text">복구 신청</div>
            </div>
            </div>


            <div id="repair_div2">
                <main className="container">
                    <h2> 이미지 </h2>
                        <input type="file" accept="image/*" id = "img1" 
                                onChange={saveImage}  onClick={(e) => e.target.value = null}
                                ref={refParam => inputRef = refParam}
                                style={{display: "none"}}
                         />
                        <input type="file" accept="image/*" id = "img2"  
                                  onChange={saveImage1}  onClick={(e) => e.target.value = null}
                                  ref={refParam1 => inputRef1 = refParam1}
                                  style={{display: "none"}}
                         />
            <div className="preview">
            <img src={  image.preview_URL} width="230px" height="250px" alt="preview-img" />
            <img src={  image1.preview_URL} width="230px" height="250px" alt="preview-img" />
            </div>
               <button type="primary" onClick={() => inputRef.click()}>
          사진선택</button>
          <button type="primary" onClick={() => inputRef1.click()}>
          사진선택</button>
            </main>

               

            </div>

            <div id = "repair_div3">
            <label>
              <input type="text" id="repair_title" placeholder="제목을 작성하십시오." 
              value={title} 
              onChange={onChangeTitle}>
              </input>
             </label>
            
            <div id = "repair_div4">
            <input type="text" id="repair_address" placeholder="주소를 입력하시오." 
            value={address} 
            onChange={onChangeAddress}>
              </input>
            </div>
            </div>
            <div id = "repair_div5">
            
            <textarea id="repair_story" placeholder="내용을 입력하세요." rows="20"  cols="58"
             value={text}
             onChange={onChangeText}
           >
            </textarea>
            </div>
            <button id="repair_button"  onClick={sendImageToServer}>작성 완료
            </button>
        </div>
    )
}
export default Repair;
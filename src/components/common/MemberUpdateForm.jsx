import React, { useState, useRef, } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import axios from 'axios';


const MemberUpdateForm = () => {

    const navigator = useNavigate()
    const nameRef = useRef('')
    const nickNameRef = useRef('')
    const emailRef = useRef('')
    const submitRef = useRef(null)

    //이미지 업로드 하기구현중
    const [selectedFile, setSelectedFile] = useState('https://i.ytimg.com/vi/yjdT05m8CqQ/maxresdefault.jpg')
    const fileInputRef = useRef(selectedFile);
    const ProfileImageUpload = () => {
        fileInputRef.current.click()
    }

    const handleFileChange = (event) => {
        setSelectedFile(URL.createObjectURL(event.target.files[0]));
    }
    //UI때문에 제출버튼을 숨겨놧음 이걸로 클릭함
    const submitClick = () => {
        submitRef.current.click()
    }
    // 폼 제출 처리 함수
    const handleFormSubmit = (event) => {
        event.preventDefault();
        const jwtToken = localStorage.getItem('access_token')
        const parseToken = JSON.parse(jwtToken)

        console.log(emailRef.current.value);
        console.log(nameRef.current.value);
        console.log(nickNameRef.current.value);
        axios.put('http://43.202.4.184:8080/members/',

            {
                "email": emailRef.current.value,
                "name": nameRef.current.value,
                "nickName": nickNameRef.current.value,
                "profileImageUrl": ""
            },

            {
                headers: {
                    'Authorization': `Bearer ${parseToken}`,
                    "Content-Type": "application/json",
                }
            })
            .then(response => {
                localStorage.removeItem("access_token")
                navigator('/login')
            })
            .catch(error => {
                console.log(error)
            })

    };


    //탈퇴하기
    const withdraw = () => {
        const jwtToken = localStorage.getItem('access_token')
        const parseToken = JSON.parse(jwtToken)

        axios.delete('http://43.202.4.184:8080/members/', {
            headers: {
                'Authorization': `Bearer ${parseToken}`
            }
        }).then((response) => {
            navigator('/login')
        }).catch((error) => {
        })

    }


    return (
        <>
            <MemberBox>

                <div>
                    <MemberImage src={selectedFile} />
                    <input type="file" name="image" id="image" style={{ display: "none" }} ref={fileInputRef} onChange={handleFileChange} />
                    <SettingIcon onClick={ProfileImageUpload} src='src/assets/setting.svg' />
                </div>
                <div>
                    <div className='members-info'>
                        <label htmlFor='name' className='members-info__title'>이름</label>
                        <input ref={nameRef} name='name' id='name' className='members-info__description' placeholder='이름을 입력해주세요'></input>
                    </div>


                    <div className='members-info'>
                        <label htmlFor='nickName' className='members-info__title'>닉네임</label>
                        <input ref={nickNameRef} name='nickName' id='nickName' className='members-info__description' placeholder='닉네임을 입력해주세요'></input>
                    </div>

                    <div className='members-info'>
                        <label htmlFor='email' className='members-info__title'>이메일</label>
                        <input ref={emailRef} name='email' id='email' className='members-info__description' placeholder='이메일을 입력해주세요'></input>
                    </div>

                </div>
                <input ref={submitRef} id='submit' type='submit' style={{ display: 'none' }} onClick={handleFormSubmit} />
            </MemberBox >

            <ButtonBox >
                <div className='member-Update__button' onClick={submitClick}>수정하기</div>
                <div className='member-Update__button' onClick={withdraw} >탈퇴하기</div>
            </ButtonBox>

        </>
    );
};

export default MemberUpdateForm;


const MemberBox = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 800px;
    margin: auto;
`

const MemberImage = styled.img`
    width: 250px;
    height: 250px;
    border-radius: 9999px;
    object-fit: cover;
`

const SettingIcon = styled.img`
    width: 40px;
    height: 40px;
    position: relative;
    right: 30px;
    cursor: pointer;
`

const ButtonBox = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 800px;
    margin: auto;
`
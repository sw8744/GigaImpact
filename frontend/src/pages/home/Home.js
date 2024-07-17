import './Home.css'
import Header from '../header/Header';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../footer/Footer';

function Home() {
    const [questions, setQuestions] = useState([]);
    const [user, setUser] = useState(null);
    const [allUser, setAllUser] = useState([]);

    const navigate = useNavigate();

    const fetchQuestions = async () => {
        const response = await fetch('http://localhost:2000/api/post');
        const data = await response.json();
        setQuestions(data);
        console.log(data)
    }

    const fetchUser = async () => {
        const response = await fetch('http://localhost:2000/api/userbyid/3');
        const data = await response.json();
        setUser(data);
        console.log(data)
    }

    const fetchAllUser = async () => {
        const response = await fetch('http://localhost:2000/api/user');
        const data = await response.json();
        setAllUser(data);
        console.log(data)
    };

    const goPost = (id) => {
        navigate('/post?id=' + id)
    }

    const howManyStudy = ['초등학교', '중학교', '고등학교', '대학교'];

    const goPosts = () => {
        navigate('/posts');
    };

    useEffect(() => {
        fetchQuestions();
        fetchUser();
        fetchAllUser();
    }, []);

    return (
        <div className='homeRoot'>
            <Header />
            <div className='doAnythingDiv'>
                <div className='userInfoDiv'>
                    <div className='doAnything'> 
                        <div className='mentor' onClick={() => goPosts()}>
                            <p className='mentorTxt'>멘토</p>
                            <p className='become'>되기</p>
                        </div>
                        <div className='mentee' onClick={() => goPosts()}>
                            <p className='menteeTxt'>멘티</p>
                            <p className='become'>되기</p>
                        </div>
                    </div>
                    <div className='userInfo'>
                        <div className='userInfoTxt'>회원정보</div>
                        <div className='userInfoBox'>
                            {
                                user && 
                                <div className='userBox'>
                                    <div className='userName'> {
                                        user.category && user.category.map((category, index) => {
                                            return (
                                                index === user.category.length - 1 ? category : category + ', '
                                            )
                                        })
                                    } 멘토 {user.name} {user.job} {'('}{user.nickname}{')'}</div>
                                    <div className='userDescription'>소개 : {user.description}</div>
                                    <div className='userPoint'>보유 POINT : {user.point} POINT</div>
                                    <div className='userLocation'>활동 지역 : {user.location}</div>
                                    <div className='userHowManyStudy'>{
                                        user.howmanystudy && user.howmanystudy.map((study, index) => {
                                            return (
                                                <div className='userHowManyStudys'>
                                                    {user.howmanystudy.length - 1 === index ? study : howManyStudy[index] + ' : ' + study}
                                                </div>
                                                
                                            )
                                        })
                                    }</div>
                                    <div className='userJob'></div>
                                    
                                </div>
                            }
                        </div>
                    </div>
                </div>

                <div className='postsDiv'>
                    <div className='question'>
                        <p className='questionTitle' onClick={() => {goPosts()}}>질문 게시판</p>
                            <div className='questionBox'>
                                {questions && questions.map((question, index) => {
                                        return (
                                            index < 3 &&
                                            <div key={index} className='questionDiv' onClick={() => {goPost(question.id)}}>
                                                <div className='questionDiv1'>
                                                    <p className='questionCategory'>{'['}{
                                                            question.category && question.category.map((category, index) => {
                                                                return (
                                                                    index === question.category.length - 1 ? category : category + ', '
                                                                )
                                                            })}{']'}
                                                        </p>
                                                    <p className='questionDivTitle'>{question.title}</p>
                                                </div>
                                                <div className='questionDiv2'>
                                                    <p className='questionAuthor'>{question.author}</p>
                                                    <p className='questionDate'>{question.write_date}</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                        </div>
                    </div>
                    <div className='mentorMenteeDiv'>
                        <div className='mentorDiv'>
                            <p className='mentorTitle'>추천 멘티</p>
                            <div className='mentorBox'>{
                                allUser && allUser.map((user, index) => {
                                    return (
                                        user &&
                                        <div key={index} className='mentorDiv1'>
                                            <div className='mentorDiv2'>
                                                <div className='mentorJob'>{
                                                    user.category && user.category.map((category, index) => {
                                                        return (
                                                            index === user.category.length - 1 ? category : category + ', '
                                                        )
                                                    })
                                                }  {user.nickname}
                                                </div>
                                            </div>
                                            <div className='mentorDiv3'>
                                                <div className='mentorDescription'>{user.description} / 평판 {user.reputation}</div>
                                            </div>
                                        </div>
                                    )
                                })
                                }</div>
                        </div>
                        <div className='menteeDiv'>
                        <p className='mentorTitle'>이달의 멘토</p>
                            <div className='mentorBox'>{
                                allUser && allUser.map((user, index) => {
                                    return (
                                        user &&
                                        <div key={index} className='mentorDiv1'>
                                            <div className='mentorDiv2'>
                                                <div className='mentorJob'>{
                                                    user.category && user.category.map((category, index) => {
                                                        return (
                                                            index === user.category.length - 1 ? category : category + ', '
                                                        )
                                                    })
                                                } 멘토 {user.job} {user.name} {'('}{user.point} POINT{')'}
                                                </div>
                                            </div>
                                            <div className='mentorDiv3'>
                                                <div className='mentorDescription'>{user.description} / 평판 {user.reputation}</div>
                                            </div>
                                        </div>
                                    )
                                })
                                }</div>
                        </div>
                    </div>
                </div>    
            </div>
            <Footer />
        </div>
    )
}

export default Home;
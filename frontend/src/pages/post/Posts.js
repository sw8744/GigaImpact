import React, { useState, useEffect } from "react";
import Header from "../header/Header";
import './Posts.css';
import { useNavigate } from 'react-router-dom';
import Footer from "../../footer/Footer";

function Posts() {
    const [questions, setQuestions] = useState([]);
    const navigate = useNavigate();

    const fetchQuestions = async () => {
        const response = await fetch('http://localhost:2000/api/post');
        const data = await response.json();
        setQuestions(data);
        console.log(data)
    }

    const goPost = (id) => {
        navigate('/post?id=' + id)
    }

    useEffect(() => {
        fetchQuestions();
    }, []);

    return (
        <div className="postsRoot">
            <Header />
            <div className="categoryDiv">
                <button className="categoryButton">전체</button>
                <button className="categoryButton">입시</button>
                <button className="categoryButton">학교생활</button>
                <button className="categoryButton">진로</button>
                <button className="categoryButton">사회생활</button>
                <button className="categoryButton">귀농</button>
                <button className="categoryButton">취업</button>
                <button className="categoryButton">창업</button>
                <button className="categoryButton">투자</button>
                <button className="categoryButton">주식</button>
                <button className="categoryButton">재테크</button>
                <button className="categoryButton">건강</button>
                <button className="categoryButton">운동</button>
                <button className="categoryButton">요리</button>
                <button className="categoryButton">취미</button>
                <button className="categoryButton">여행</button>
                <button className="categoryButton">문화</button>
            </div>
            <div className="postsDiv2">
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
            <Footer />
        </div>
    )
}

export default Posts;
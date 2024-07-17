import Footer from "../../footer/Footer";
import Header from "../header/Header";
import './Post.css';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function Post() {
    const [searchParams] = useSearchParams();
    const [question, setQuestion] = useState('');
    
    const id = searchParams.get('id');

    const fetchQuestion = async () => {
        const response = await fetch('http://localhost:2000/api/postbyid/' + id);
        const data = await response.json();
        setQuestion(data);
        console.log(data);
    };

    const goPrevious = () => {
        window.history.back();
    }

    useEffect(() => {
        fetchQuestion();
    }, []);

    return (
        <div className="postRoot3">
            <Header />
            <div className="postContainer">
                <div className="headerBackButton">
                    <button className="backButton" onClick={() => {goPrevious()}}>{'<'}</button>
                </div>
                <div className="postInfoDiv">
                    <div className="postTitle">{'['}{
                        question.category && question.category.map((category, index) => {
                            return (
                                    index === question.category.length - 1 
                                    ? category 
                                    : category + ', '
                            )
                    })}{']'} {question.title}</div>
                </div>
                <div className="postTimeDiv">
                        <div className="postAuthor">{question.author}</div>
                        <div className="postTime">{question.write_date}</div>
                </div>
                <hr className="bar"></hr>
                <div className="postContent">{question.content}</div>
            </div>
            <button className="helpButton">멘토링 하기</button>
            <Footer />
        </div>
    )
}

export default Post;
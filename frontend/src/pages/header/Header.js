import './Header.css'
import LogoWhiteTxt from '../../assets/logo_MenTs_txt.png';
import { useNavigate } from 'react-router-dom';
import searchIcon from '../../assets/search.svg';
import userIcon from '../../assets/user.svg';

function Header() {
    const navigate = useNavigate();

    const goToHome = () => {
        navigate('/');
    };

    const goToPosts = () => {
        navigate('/posts');
    };

    return (
        <>
            <div className="headerBanner">
                <img src={LogoWhiteTxt} alt="Logo" className='logoImgTxt' onClick={() => {goToHome()}} />
                <div className='searchBoxDiv'>
                    <input type='text' className='searchBox' />
                    <img src={searchIcon} alt='search' className='searchIcon' />
                    <img src={userIcon} alt='user' className='userIcon' />
                </div>
                <button className='questionButton' onClick={() => goToPosts()}>질문하기</button>
            </div>
        </>
    )
}

export default Header;
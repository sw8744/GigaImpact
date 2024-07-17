import './Footer.css';
import logoWhiteTxt from '../assets/logo_white_txt.png';

function Footer() {
    return (
        <div className='footerDiv'>
                <div className='footerTxt'>© 2024</div>
                <img src={logoWhiteTxt} alt='logo' className='logoWhiteTxt' />
        </div>
    )
}

export default Footer;
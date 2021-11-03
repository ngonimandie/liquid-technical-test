import React from 'react'
import { Link } from 'react-router-dom'
import { BiUpArrowCircle } from "react-icons/bi";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";


function Footer() {
    return (
        <div className= "row">
            <div className="footer p-4">
            <div className="social-icons">
                <Link to="https://www.facebook.com/ngonidzashe.manditsvanga" target="_blank">
                    <FaFacebook size={30} />
                </Link>
                <Link to="https://twitter.com/Ngonimandie" target="_blank">
                    <FaTwitter size={30} />
                </Link>
                <Link to="https://www.linkedin.com/in/ngonidzashe-manditsvanga-4198b0121/" target="_blank">
                    <FaLinkedin size={30} />
                </Link>
                <Link to="https://www.youtube.com/channel/UC_ckcrp0hfWpd1OD2VsEOSA" target="_blank">
                    <FaYoutube size={30}/>
                </Link>
            </div>
            <p>Copyright &copy; 2021. Ngonidzashe Manditsvanga </p>
            <Link to="#top">
                <BiUpArrowCircle className="upArrow" size={30} />
            </Link>
        </div>
        </div>
        
    )
}

export default Footer

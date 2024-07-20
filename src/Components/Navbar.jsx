import React from 'react'
import style from './Navbar.module.css'
import logo from '../assets/logo.png'
import {MdEditDocument} from "react-icons/md";
import {CgProfile} from "react-icons/cg";

const Navbar = () => {
  return (
    <div className={style.maindiv}>
        <nav>
            <div className={style.logo_name}>
                <div className={style.logo}>
                    <img src={logo} alt="" />
                </div>
                <div className={style.name}>
                    <h3 className={style.text}>Wanted Faculty</h3>
                </div>
            </div>
            <div className={style.stuff}>
                <div className={style.filter}>
                    <h3>Filter Branch</h3>
                    <select name="Filter Branch" id="" >
                        <option value="">All</option>
                        <option value="">CSE</option>
                        <option value="">ECE</option>
                        <option value="">MECH</option>
                        <option value="">EEE</option>
                        <option value="">IT</option>
                        <option value="">METALLURGY</option>
                        <option value="">AUTOMOBILE</option>
                    </select>
                </div>
                <li>My applications <span className={style.im}><MdEditDocument/></span></li>
                <li className={style.right}>My Profile <span className={style.im}><CgProfile/></span></li>
            </div>
        </nav>
    </div>
  )
}

export default Navbar

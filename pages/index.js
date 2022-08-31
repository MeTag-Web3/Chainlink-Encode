import Image from 'next/image'
import Navbar from '../components/Navbar'
import styles from '../styles/Home.module.css'
import Dashboard from './Dashboard'
import Head from 'next/head'
import Portfolio from './Portfolio'
import Footer from '../components/Footer'


export default function Home() {
  return (
    <>    
    <Navbar />
      <Dashboard />
      <Portfolio />
      <Footer/>
    </>
  )
}

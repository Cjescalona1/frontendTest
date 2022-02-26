import Head from 'next/head'
import { Container, Col, Row } from 'react-bootstrap'
import styles from '../styles/Home.module.css' 
import { useState, useEffect } from 'react';
import fillH from '../assets/fillH.svg';
import unfillH from '../assets/unfillH.svg'; 
import clock from '../assets/clock.svg'
import 'bootstrap/dist/css/bootstrap.min.css';  
import Link from 'next/link';   
import Paginator from '@components/paginator'; 
import TimeAgo from 'javascript-time-ago'
import ReactTimeAgo from 'react-time-ago'
import en from 'javascript-time-ago/locale/en.json' 

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(en)

export default function Home() { 
  const  [Sel, setSel]= useState("select your news");  
  const  [page, setPage]= useState(0);
  const  [listE, setListE]= useState([]); 
  const  [filter, setFilter]= useState(" ");
  const  [band,setBand]= useState(false);
  let path;
  if (typeof window !== 'undefined') {
   path = window.location.pathname;
  }
  else{
   path = '/';
  }
  function showH(i){
      let aux;
      let band=false;

      if (JSON.parse(localStorage.getItem("liked")) != undefined ){ 
        aux = JSON.parse(localStorage.getItem("liked"));
        aux.map((a)=>{
           if(a.objectID == i.objectID){band=true} 
         })     
         return(band);
      }else{
        return(false)
      }
  }
  
     
  function handleLike(i){ 
    let aux;
    let L = [];    
    let out=[];

    if(localStorage.getItem("liked") != undefined){
            aux = JSON.parse(localStorage.getItem("liked"));     
            let band=false;
            let auxIn;
            aux.includes(i)

            aux.map((el, index)=>{
                if (el.objectID == i.objectID){
                  band=true;
                  auxIn=index;
                }
            })

            if(band){
                aux.map((a, index)=>{if(index!=auxIn){out.push(a)}})
                L=out;
            }else{ 
              L= L.concat(aux)
              L.push((i)) 
              
            }  
          }
    else{
      L.push((i)) 
    }      
    localStorage.setItem("liked",JSON.stringify(L))
    setBand(true);
  }



  function onChangeSelect(e){
    setSel(e.target.value); 
    localStorage.setItem("filter",e.target.value);
  }

  async function callFetch(URL){
    await fetch(URL, {
      method:'get' }  )
    .then(res => res.json()) 
    .then(res => setListE(res.hits))    
  }

  useEffect(()=>{
    
    if(!band){
     let aux = localStorage.getItem("filter");
      if (aux != undefined){  
        setFilter(aux);
        setSel(aux)
      }else{
        setFilter("");
     }  
      let url=`https://hn.algolia.com/api/v1/search_by_date?query=${Sel}&page=${page}`;
      if(Sel!=""){
        callFetch(url)
       }
    }else{
      setBand(false)
    }

  },[Sel,page,band])

  return (
    <Container >
      <Head>
        <title>Hacker News</title>
        <meta name="description" content="Front-end Demostration" />
        <link rel="icon" href="/favicon.ico" passHref />
      </Head>
   
      <main className={styles.main}>

        <div  className={styles.header}>
          <p className={styles.title} >
          HACKER NEWS
          </p>
        </div> 

    
        <nav className={styles.Nav}>
        <Link href="/" passHref>
          <button  className={ (path == '/')? styles.buttonAct:styles.button} >
              All
          </button>
          </Link> 
          <Link href="faves" passHref>
          <button   className={ (path == '/faves')? styles.buttonAct:styles.button} > 
            Faves
          </button>
          </Link> 
        </nav>
        
        <div>
        <select className={styles.select} value={filter} onChange={(e)=>{onChangeSelect(e)}}>
          <option>
            Select your news
          </option >
          <option >
           Angular 
          </option>
          <option>
            Reactjs 
          </option>
          <option>
            Vuejs
          </option>
        </select>
        </div> 
  <Container className={styles.cont} >
    <Row className={styles.rowX}>
        {listE?<>
                {listE.map((i, index)=>(
                <Col md={5} sm={10}  className={styles.cols} key={index}>
                   <a href={i.story_url} target="_blank" rel="noreferrer" > 
                    <p className={styles.created}><img src={clock.src} alt="clock" ></img> <ReactTimeAgo date={i.created_at} locale="en-US"/></p>  
                     {i.story_title}
                    </a> 
                   <div className={styles.like}> 
                   
                      <a className={ !showH(i) ? styles.displayNo:null } onClick={()=>{handleLike(i)}} >
                        <img src={fillH.src} className={styles.heart} alt="like" ></img>
                      </a>

                      <a className={ showH(i) ? styles.displayNo:null }  onClick={()=>{handleLike(i)}}>
                        <img src={unfillH.src} className={styles.heart} alt="dislike" ></img>
                      </a>
                     
                   </div>
                </Col >
                ))}
                </> 
        :
        <> </> }
    </Row>
  </Container>

      <div className={styles.pagi}>
            <Paginator handle={setPage}></Paginator>      
      </div> 
      </main>
    </Container>
  )
}

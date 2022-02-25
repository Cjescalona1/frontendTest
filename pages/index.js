import Head from 'next/head'
import { Container, Col, Row } from 'react-bootstrap'
import styles from '../styles/Home.module.css' 
import { useState, useEffect } from 'react';
import fillH from '../assets/fillH.svg';
import unfillH from '../assets/unfillH.svg'; 
import 'bootstrap/dist/css/bootstrap.min.css';  



export default function Home() { 
    
  const  [isLiked, setIsLiked]= useState(false);  
  const  [Sel, setSel]= useState("");  
  const  [page, setPage]= useState(0);
  const  [listE, setListE]= useState([]); 
  const  [filter, setFilter]= useState(" ");

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
    let aux = localStorage.getItem("filter");
      if (aux != undefined){  
        setFilter(aux);
        setSel(aux)
      }else{
        setFilter("");
     }  

    
      let url=`https://hn.algolia.com/api/v1/search_by_date?query=${Sel}&page=${page}`;
    callFetch(url)
    console.log(listE);
  },[Sel,page])

  return (
    <Container >
      <Head>
        <title>Hacker News</title>
        <meta name="description" content="Front-end Demostration" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
   
      <main className={styles.main}>

        <div  className={styles.header}>
          <p className={styles.title} >
          HACKER NEWS
          </p>
        </div> 

        <nav className="nav">
          <button className={styles.button}> <a href='#' >All</a></button>
          <button className={styles.button}> <a href='#'> My Faves </a></button>
        </nav>
        
        <div>
        <select className={styles.select} value={filter} onChange={(e)=>{onChangeSelect(e)}}>
          <option>
            Select your news
          </option>
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
                {listE.map((i)=>(
                <Col md={5} sm={10}  className={styles.cols} >
                   <a href={i.story_url} target="_blank" > 
                    <p className={styles.created}>{i.created_at}</p>  
                     {i.story_title}
                    </a>
                   <div className={styles.like}> 
                   {isLiked?
                      <a href='#'>
                        <img src={fillH.src} className={styles.heart}></img>
                      </a>
                   :
                      <a href='#'>
                        <img src={unfillH.src} className={styles.heart}></img>
                      </a>
                   }
                     
                   </div>
                </Col >
                ))}
                </> 
        :
        <> </> }
    </Row>
  </Container>

      <div className={styles.pagi}>
        paginator
      </div> 
      </main>
    </Container>
  )
}

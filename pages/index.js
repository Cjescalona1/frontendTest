import Head from 'next/head'
import { Container, Col, Row } from 'react-bootstrap'
import styles from '../styles/Home.module.css' 
import { useState, useEffect } from 'react';
import fillH from '../assets/fillH.svg';
import unfillH from '../assets/unfillH.svg'; 
import 'bootstrap/dist/css/bootstrap.min.css';  



export default function Home() { 
     
  const  [Sel, setSel]= useState("");  
  const  [page, setPage]= useState(0);
  const  [listE, setListE]= useState([]); 
  const  [filter, setFilter]= useState(" ");
  const  [band,setBand]= useState(false);

  function showH(id){
    if (JSON.parse(localStorage.getItem("liked")) != undefined ){ 
    return(JSON.parse(localStorage.getItem("liked")).includes(id))
    }else{
      return(false)
    }
  }

  
     
  function handleLike(id){ 
    let aux;
    let L = [];   
    let ind;
    let out=[];

    if(localStorage.getItem("liked") != undefined){
            aux = JSON.parse(localStorage.getItem("liked"));     
            
            if(aux.includes(id)){
                ind = aux.findIndex(e=>{e==id});

                aux.map((e,index)=>{if(e==id){ind=index}})
                
                aux.map((a, index)=>{if(index!=ind){out.push(a)}})

                L=out;
            }else{ 

              L= L.concat(aux)
              L.push((id)) 
              
            }  
          }
    else{
      L.push((id)) 
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
                {listE.map((i, index)=>(
                <Col md={5} sm={10}  className={styles.cols} key={index}>
                   <a href={i.story_url} target="_blank" rel="noreferrer" > 
                    <p className={styles.created}>{i.created_at}</p>  
                     {i.story_title}
                    </a>
                   <div className={styles.like}> 
                   
                      <a href='#' className={ !showH(i.objectID) ? styles.displayNo:null } onClick={()=>{handleLike(i.objectID)}} >
                        <img src={fillH.src} className={styles.heart} alt="like" ></img>
                      </a>

                      <a href='#'  className={ showH(i.objectID) ? styles.displayNo:null }  onClick={()=>{handleLike(i.objectID)}}>
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
        paginator
      </div> 
      </main>
    </Container>
  )
}

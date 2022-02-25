import Head from 'next/head'
import { Container, Col, Row } from 'react-bootstrap'
import styles from '../styles/Home.module.css' 
import { useState, useEffect } from 'react';
import fillH from '../assets/fillH.svg';
import unfillH from '../assets/unfillH.svg'; 
import 'bootstrap/dist/css/bootstrap.min.css';   
import Link from 'next/link'; 



export default function Faves(){
    const [listE, setListE] = useState(""); 
    const [band, setBand] = useState(false);

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

    useEffect(()=>{
        let url;
        if(localStorage.getItem("liked") != undefined){
            let aux = JSON.parse(localStorage.getItem("liked") ); 
            setListE(aux)
        }
 
        setBand(false)
      },[band])


    return(  <Container > 
        
        <main className={styles.main}>
  
          <div  className={styles.header}>
            <p className={styles.title} >
            HACKER NEWS
            </p>
          </div> 
          <nav className={styles.faveNav}>
          <Link href="/">
            <button className={styles.button}>
                All
            </button>
          </Link> 

          <Link href="faves">
            <button className={styles.button}> 
                Faves
            </button>
          </Link>
        </nav>
          
          <div>
          
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
                     
                        <a href='#' className={ !showH(i) ? styles.displayNo:null } onClick={()=>{handleLike(i)}} >
                          <img src={fillH.src} className={styles.heart} alt="like" ></img>
                        </a>
  
                        <a href='#'  className={ showH(i) ? styles.displayNo:null }  onClick={()=>{handleLike(i)}}>
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
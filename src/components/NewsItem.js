import React from 'react'
//import { useEffect,useState } from 'react';

const NewsItem =(props)=> {
    

        let {title,description,newsUrl,imageUrl,publishedAt,author,source}=props

        return (
          <>
         
            <div className="card" >
              <span className="position-absolute top-0 translate-middle badge rounded-pill bg-info " style={{left:'90%', zIndex:'1'}}>
                {source}</span>
            <img src={!imageUrl?`https://www.esrb.europa.eu/news/shared/img/socialmedia/social-default.jpg`:imageUrl} className="card-img-top" alt="..." />
            <div className="card-body">
            
              <h5 className="card-title">{title} </h5>
              <p className="card-text"> {description}...</p>
              <p className="card-text"><small className="text-muted">Published on {new Date(publishedAt).toUTCString()} By {author ? author : "Unknown" }</small></p>
              <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">Read More</a>
            </div>
          </div>
          </>
        )
    
}

export default NewsItem

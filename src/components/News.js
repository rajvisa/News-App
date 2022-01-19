import React, { useEffect,useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News =(props)=> {
 const [articles, setArticles] = useState([]);
 const [loading, setLoading] = useState(false);
 const [page, setPage] = useState(1);
 const [totalResults, setTotalResults] = useState(0);
 


    if (props.category !== "general") {
      document.title = `News-Today - ${props.category}`;
    } else {
      document.title = `News-Today - Home`;
    }
  

  const updateNews= async () =>{
    props.setProgress(10);  
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30); 
    let parsedData = await data.json();
    props.setProgress(50); 
    props.setProgress(100);
    console.log(parsedData);
    setArticles(parsedData.articles);
    setLoading(false);
    setTotalResults(parsedData.totalResults);  

    
  }
  
  useEffect(() => {
    updateNews();
      
  }, []);

//   const handleNextClick = async () => {
    
//     setPage(page+1);
//     updateNews();
//   };
//   const handlePreviousClick = async () => {
    
//     setPage(page-1);
//     updateNews();
//   };
   const fetchMoreData = async () => {
    
    
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1);
    // setState({ loading: true });
    let data = await fetch(url);

    let parsedData = await data.json();
    console.log(parsedData);
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);

  };

  
    return (
      <>
        <h1 className="text-center" style={{ padding: "10px" , marginTop:"60px"}}>
          Headlines
        </h1>
        {loading && <Spinner />}
        
        <InfiniteScroll style={{overflow:""}}
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
          <div className="container" >
          <div className="row">
            {
              //!loading &&
              articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={
                        element.title
                          ? element.title.substring(
                              0,
                              element.title.indexOf("-")
                            )
                          : ""
                      }
                      description={
                        element.description
                          ? element.description.slice(0, 100)
                          : ""
                      }
                      newsUrl={element.url}
                      imageUrl={element.urlToImage}
                      author={element.author}
                      publishedAt={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                  
                );
              })
              
            }
            </div>
          </div>
        </InfiniteScroll>
        <div className="container d-flex justify-content-between">
          {/* <button
            disabled={page <= 1}
            type="button"
            className="btn btn-primary "
            onClick={handlePreviousClick}
          >
            &lArr; Previous
          </button> */}
          {/* <button
            disabled={
              page + 1 >
              Math.ceil(totalResults / props.pageSize)
            }
            type="button"
            className="btn btn-primary"
            onClick={handleNextClick}
          >
            Next &rArr;
          </button> */}
        </div>
      </>
    );
  
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  News.defaultProps = {
    country: "in",
    pageSize: 5,
    category: "general",
  };
export default News;

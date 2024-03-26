import "./Page404.css";

function Page404(): JSX.Element {
    return (
        <div className="Page404">
			<h1>OOPS! PAGE NOT FOUND 404</h1>
            <iframe 
               width="560" 
               height="315" 
               src="https://www.youtube.com/embed/s3BVvmXmd-g?si=A4a6Qc3GO7mtTlTR&amp;start=9" 
               title="YouTube video player" 
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
               >
               </iframe>
        </div>
    );
}

export default Page404;

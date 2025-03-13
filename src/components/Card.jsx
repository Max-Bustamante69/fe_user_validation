import '../styles/tailwind.css';


function Card({children, className, ...props}) {
    return ( 
    <div {...props} className={`rounded px-12 py-8 border border-neutral-100   ${className}`}>
        {children}
    </div> );
}

export default Card;
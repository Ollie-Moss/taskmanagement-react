const Confirm = (props) => {
    return (
        <>
        <div className="backdrop-blur-sm fixed z-20 top-0 left-0 w-full h-full"></div>
        <div className="w-[60%] left-[20%] md:w-[30%] md:left-[35%] lg:left-[37.5%] lg:w-[25%] top-1/4 z-30 rounded p-10 bg-white absolute">
            <h1 className="font-bold text-xl text-primary-600 text-center"> Are you sure? </h1>
            
            <div className="text-center" >
            <button onClick={props.confirm} className='px-4 py-1 bg-primary-600 rounded-md text-lg font-bold text-white hover:bg-primary-400 inline'> 
                <a > Yes </a>
            </button>
            <button onClick={props.cancel} className='mx-4 px-4 py-1 bg-red-600 rounded-md text-lg font-bold text-white hover:bg-red-400 inline'> 
                <a > No </a>
            </button>
            </div>
        </div>
        </>
    )
}

export default Confirm;

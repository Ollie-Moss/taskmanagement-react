const PercentageBar = (props) => {
    let colors = props.colors;
    if (!props.colors){
        colors = ["bg-primary-500", "bg-white", "text-white"] ;
    }
    let content = `after:content-['${props.percent}%']`
    return (
        <div className={`text-left relative rounded-full h-6 w-full bg-gray-200`}> 
            <div style={{width: "100%"}} className={`w-full absolute overflow-hidden text-accent-600 rounded-full bg-gray-200`}>
                <p className={`pl-3 font-bold`}>{props.percent}%</p>
            </div>
            <div style={{width: props.percent + "%"}} className={`-ml-[1px] absolute text-white overflow-hidden rounded-full bg-accent-600`}>
                <p className={`pl-3 font-bold`}>{props.percent}%</p>
            </div>
        </div>
    );
};

export default PercentageBar;

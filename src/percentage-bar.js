const PercentageBar = (props) => {
    let colors = props.colors;
    if (!props.colors){
        colors = ["bg-primary-500", "bg-white", "text-white"] ;
    }
    let content = `after:content-['${props.percent}%']`
    return (
        <div className={`text-left relative rounded-full h-6 w-full bg-white`}> 
            <div style={{width: "100%"}} className={`w-full absolute overflow-hidden text-primary-500 rounded-full bg-white`}>
                <p className={`pl-3 font-bold`}>{props.percent}%</p>
            </div>
            <div style={{width: props.percent + "%"}} className={`-ml-[1px] absolute text-white overflow-hidden rounded-full ${colors[0]}`}>
                <p className={`pl-3 font-bold`}>{props.percent}%</p>
            </div>
        </div>
    );
};

export default PercentageBar;

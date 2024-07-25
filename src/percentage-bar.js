const PercentageBar = (props) => {
    let colors = props.colors;
    if (!props.colors){
        colors = ["primary-500", "white", "white"] ;
    }
    return (
        <div className={`rounded-full w-full bg-${colors[1]}`}> 
            <div style={{width: props.percent + "%"}} className={`-m-[1px] rounded-full h-full bg-${colors[0]}`}>
                <p className={`pl-3 font-bold text-${colors[2]}`}>{props.percent}%</p>
            </div>
        </div>
    );
};

export default PercentageBar;

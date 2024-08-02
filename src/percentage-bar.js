import { useEffect, useRef } from 'react'

const PercentageBar = (props) => {
    const slider = useRef(null)
    let oldPercent = useRef(0)

    useEffect(() => {
        let direction = oldPercent.current < props.percent ? 'normal' : 'reverse';
        slider.current.style.animation = `percent-slide 0.5s ease-in normal both`

        slider.current.style.setProperty('--w', `${props.percent}%`)
        slider.current.style.setProperty('--o', `${oldPercent.current}%`)
        oldPercent.current = props.percent
    }, [props.percent])

    let colors = props.colors
    if (!props.colors) {
        colors = ['bg-primary-500', 'bg-white', 'text-white']
    }
    let content = `after:content-['${props.percent}%']`
    return (
        <div
            className={`text-left relative rounded-full h-6 w-full bg-gray-200`}
        >
            <div
                className={`w-full absolute overflow-hidden text-accent-600 rounded-full bg-gray-200`}
            >
                <p className={`pl-3 font-bold`}>{props.percent}%</p>
            </div>
            <div
                ref={slider}
                key={props.percent}
                style={{animation: `0.25s ease-in both percent-slide` }}
                className={`w-full -ml-[1px] absolute text-white overflow-hidden rounded-full bg-accent-600`}
            >
                <p className={`pl-3 font-bold`}>{props.percent}%</p>
            </div>
        </div>
    )
}

export default PercentageBar

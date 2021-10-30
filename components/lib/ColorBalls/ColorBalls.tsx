


interface ColorBallsI {
    bgColor?: string,
    left?: string,
    top?: string,
    className?: string
    width?: string
    height?: string
}


const ColorBalls = ({ bgColor, left, top, width, height, className }: ColorBallsI) => {
    return (
        <>
            <div
                className={`${className} main_ball`}
                style={{
                    backgroundColor: bgColor,
                    left: left,
                    top: top,
                    width: width,
                    height: height
                }}>

                <style jsx>
                    {`
                
                .main_ball {
                    opacity: 0.25;
                    filter: blur(70px);
                    position: absolute;
                    z-index: 100;
                    border-radius: 100px;
                    pointer-events:none;
                    
                    }
                `}
                </style>
            </div>
        </>
    )
}

export default ColorBalls
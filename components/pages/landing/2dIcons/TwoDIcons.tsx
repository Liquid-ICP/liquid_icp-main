import TwoDIconsJson from "components/pages/landing/2dIcons/json/TwoDIcons.json";
import ColorBalls from "components/lib/ColorBalls/ColorBalls";


const TwoDIcons = () => {



    return (
        <>
            <div className="twoDIcons-container">
                <ColorBalls
                    bgColor="var(--blue)"
                    left="-5%"
                    top="-17%"
                    width="18rem"
                    height="18rem"
                />
                <div className="twoDIcons-dark_container">
                    {TwoDIconsJson.map((icon, i) => (
                        <div className={`twoDIcon_container`} key={i}>

                            <div className="icon"
                                style={{ backgroundImage: `url(${icon.twoDIcons})` }}
                            />

                            <div className="twoDIcon_heading ">
                                <h1>{icon.heading}</h1>
                            </div>
                        </div>
                    ))}
                </div>


            </div>
        </>
    )
}

export default TwoDIcons
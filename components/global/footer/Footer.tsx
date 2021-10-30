
const Footer = () => {

    const socialsData = [
        {
            image: "/images/telegram.png",
            url: "https://t.me/Liquid_ICP"
        },
        {
            image: "/images/discord.png",
            url: "https://discord.com/invite/3F8CYyPpHq"
        },
        {
            image: "/images/twitter.png",
            url: "https://twitter.com/LiquidICP"
        }
    ]


    return (
        <>
            <div className="footer">
                <div className="footer_container">
                    <div className="contact_us">
                        <h1 className="f-size-h8 f-weight-l">Contact us <br />
                            <a href="mailto:contact@icp-20.com" target="#">
                                <strong className="f-weight-bl">
                                    contact@icp-20.com
                                </strong>
                            </a>
                        </h1>

                    </div>
                    <div className="socials">
                        {socialsData.map((el, i) => (
                            <a href={el.url} target="_blank" key={i}>
                                <div className="social"
                                    style={{ backgroundImage: `url(${el.image})` }}
                                >

                                </div>
                            </a>
                        ))}
                    </div>



                    <div className="documentation">
                        <h1 className="f-size-h8 f-weight-l">Documentation <br />
                            <a href="https://docs.icp-20.com/" target="_blank">
                                <strong className="f-weight-bl">
                                    GitBook
                                </strong>
                            </a>
                        </h1>
                    </div>




                </div>



                <div className="madebyOxeni">

                    <h1 className="f-size-p3 f-weight-l">
                        website made by:
                    </h1>
                    <a href="https://twitter.com/oxeni_studio" target="_blank">
                        <div className="oxeni_logo"/>
                    </a>
                </div>



                <div className="rights">
                    <h1 className="f-size-p3 f-weight-l">
                        © {new Date().getFullYear()} Liquid ICP. All Rights Reserved
                    </h1>
                </div>

            </div>
        </>
    )
}

export default Footer
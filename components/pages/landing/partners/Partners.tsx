




const Partners = () => {

    const partnersData = [
        {
            image: "/images/chain_link.png",
            url: "https://chain.link/"
        },
        {
            image: "/images/polygon.png",
            url: "https://www.polygon.com/"
        },
        {
            image: "/images/dfinity.png",
            url: "https://dfinity.org/"
        },
        {
            image: "/images/aragon.png",
            url: "https://aragon.org/"
        },
        {
            image: "/images/oxeni.png",
            url: "https://twitter.com/oxeni_studio"
        },
        {
            image: "/images/sushi.png",
            url: "https://sushi.com/"
        }
    ]



    return (
        <>
            <div className="partners">

                <div className="heading">
                    <h1 className="f-size-h1 f-weight-bo">
                        Partners
                    </h1>
                </div>


                <div className="partners_container">
                    {partnersData.map((el, i) => (
                        <div
                            className="partner"
                            key={i}>

                            <a href={el.url} target="_blank">

                                <div className="img"
                                    style={{ backgroundImage: `url(${el.image})` }}
                                />
                            </a>

                        </div>

                    ))}

                </div>
            </div>
        </>
    )
}

export default Partners
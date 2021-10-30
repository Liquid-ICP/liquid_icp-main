const RoadMap = () => {
    return (
        <>
            <div className="road-map" id="roadmap">
                <div className="heading">
                    <h1 className="f-size-h1 f-weight-bo">Roadmap</h1>
                </div>


                <div className="road-map_background" />



                <div className="road-map_plans">
                    <div className="container" >
                        <ul className="grid-el">


                            <div className="plan-heading">
                                <h1 className="f-size-h2 f-weight-bl">Q3 2021</h1>
                            </div>

                            <li className="f-size-h8">Website V1</li>
                            <li className="f-size-h8">Gitbook,<br />Lightpaper V1</li>
                            <li className="f-size-h8">Airdrop, seed <br /> NFT sales</li>

                        </ul>


                        <ul className="grid-el">
                            <div className="plan-heading">
                                <h1 className="f-size-h2 f-weight-bl">Q4 2021</h1>
                            </div>

                            <li className="f-size-h8 f-weight-r">Website V2</li>
                            <li className="f-size-h8 f-weight-r">App V1</li>
                            <li className="f-size-h8 f-weight-r">LICP DAO on <br /> Aragon</li>
                            <li className="f-size-h8 f-weight-r">IDO</li>
                        </ul>


                        <ul className="grid-el">
                            <div className="plan-heading">
                                <h1 className="f-size-h2 f-weight-bl">Q1 2022</h1>
                            </div>

                            <li className="f-size-h8 f-weight-r">Bridge to Polygon</li>
                            <li className="f-size-h8 f-weight-r">Chainlink<br /> integration</li>
                            <li className="f-size-h8 f-weight-r">Dex LP <br /> partnetships</li>
                            <li className="f-size-h8 f-weight-r">LP Staking, <br /> Liquid staking</li>
                        </ul>



                        <ul className="grid-el">
                            <div className="plan-heading">
                                <h1 className="f-size-h2 f-weight-bl">Q2 2022</h1>
                            </div>

                            <li className="f-size-h8 f-weight-r">s-Bridge marketing <br /> to Dfinity community</li>
                            <li className="f-size-h8 f-weight-r">Lending & Borrowing <br /> platform <br /> partneshtips</li>

                        </ul>
                    </div>

                </div>
            </div>
        </>
    )
}

export default RoadMap
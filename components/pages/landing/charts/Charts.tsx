




const Charts = () => {
    return (
        <>
            <div className="chart">
                <div className="chart_container">
                    <div className="heading">
                        <h1 className="f-size-h1 f-weight-bo">
                            Token Distribution
                        </h1>
                    </div>


                    <div className="fund_distribution">
                        <div className="item" >
                            <div className="circle purple" />
                            <h1 className="f-size-p3">
                                60% - IDO
                            </h1>
                        </div>

                        <div className="item" >
                            <div className="circle blue" />
                            <h1 className="f-size-p3">
                                25% - Delvelopment &
                                <br />Marketing Reserves
                            </h1>
                        </div>
                        <div className="item" >
                            <div className="circle red" />
                            <h1 className="f-size-p3">
                                15% - Team & <br />
                                Advisors
                            </h1>
                        </div>



                    </div>

                    <div className="chart_video">
                        <video
                            playsInline
                            autoPlay
                            loop
                            muted
                            src="/video/chart_funds.mp4" />
                    </div>
                </div>









                <div className="chart_container">
                    <div className="heading">
                        <h1 className="f-size-h1 f-weight-bo">
                            Use of Funds from IDO
                        </h1>
                    </div>


                    <div className="fund_distribution">
                        <div className="item" >
                            <div className="circle purple" />
                            <h1 className="f-size-p3">
                                50% - NNS Staking
                            </h1>
                        </div>

                        <div className="item" >
                            <div className="circle blue" />
                            <h1 className="f-size-p3">
                                20% - Marketing and<br />
                                Developers
                            </h1>
                        </div>
                        <div className="item" >
                            <div className="circle red" />
                            <h1 className="f-size-p3">
                                30% - Liquidity
                                <br />pool
                            </h1>
                        </div>
                    </div>
                    

                    <div className="chart_video">
                        <video
                            playsInline
                            autoPlay
                            loop
                            muted
                            src="/video/chart_dist.mp4" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Charts
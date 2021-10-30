import { FC, useEffect } from 'react';
import { addGLFModel } from './utils/mesh.controller';
import { createScene } from './utils/scene.contoller';



import ThreeDIconData from "components/pages/landing/icons/json/ThreeDIconData.json"
import IconGradients from './IconGradients';


const ThreeDIcon: FC = () => {
   
    useEffect(() => {
        init()
    }, [])




    const init = () => {
        for (let i = 0; i < ThreeDIconData.length; i++) {
            const { scene, renderer } = createScene(.5, `.three_d_icon_${i}`)
            addGLFModel(scene, renderer, ThreeDIconData[i].path, `.three_d_icon_${i}`)
        }
    }




    return (
        <>
            <div className="icons_main" id='tokenomics'>
              <IconGradients/>

                <div className="heading">
                    <h1 className="f-size-h1 f-weight-bo">Tokenomics</h1>
                </div>
                <div className="icons-container">


                    {ThreeDIconData.map((icon, i) => (
                        <div className={`icon_container`} key={i}>
                            <div className="content">
                                <h1>{icon.heading}</h1>
                                <p>{icon.paragraph}</p>
                            </div>
                            <canvas className={`three_d_icon_${i} icon`} />
                        </div>
                    ))}
                </div>


            </div>
        </>
    )
}

export default ThreeDIcon

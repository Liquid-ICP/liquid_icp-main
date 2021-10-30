import { CSSProperties, FC, MouseEventHandler } from 'react';


interface props {
    size?: number,
    textColor?: string;
    className?: string,
    id?: string,
    disabled?: boolean,
    ctaMode?: boolean,
    style?: CSSProperties
    onClick?: MouseEventHandler,
    onHover?: MouseEventHandler
    bgColor?: string
    border?: string
    boxShadow?: string
    href?: string
}



const Button: FC<props> = ({
    size = 1,
    textColor = 'var(--white_-1)',
    className,
    id,
    disabled = false,
    ctaMode = false,
    children,
    style,
    bgColor,
    border,
    boxShadow = 'var(--btn_shadow)',
    onClick,
    onHover,
    href }) => {



    const _onClick = (e) => {
        if (disabled) {
            return
        } else {
            // @ts-ignore
            href ? window.open(`${href}`, '_blank'): onClick(e)
        }
    }



    return (
        <>
            <button
                className={`button ${className}`}
                id={`${id}`}
                disabled={disabled}
                onClick={(e) => _onClick(e)}
                onMouseOver={onHover}
                style={style}>
                <div className={`button_container ${ctaMode && 'cta_mode'}`}>
                    {children}
                </div>
            </button>


            <style jsx>{`

                a{
                    color: var(--black)
                }
            
                .button{
                   color: ${textColor}; 
                    background: transparent;
                    border: none;
                    padding: 0;
                    user-select: none;
                    display: inline-block;
                    transition: all .3s ease;
                }
                


                .button_container{
                    pointer-events: ${disabled && 'none'};
                    cursor: ${disabled ? 'not-allowed' : 'pointer'};
                    padding: calc(${size} * .38vw) calc(${size} * 1.1vw);
                    border: 1px solid #ffffff00;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    justify-content: center;
                    background:${bgColor};
                    border: ${border};
                    box-sizing: border-box;
                    box-shadow: ${boxShadow};
                    /* backdrop-filter: blur(28px); */
                    transition: all .2s ease;
                    user-select: none;
                    border-radius: 14px;
                }



                .button:focus { outline: none; }
                .button:hover{
                    filter: saturate(3.5);
                    transform: translateY(-3%);
                    box-shadow: inset 0px 7px 11px 0px rgb(255 255 255 / 2%) !important;
                }

                .button:active{
                    transform: translateY(0%) !important;
                    box-shadow: inset 0px 5px 11px 0px rgb(255 255 255 / 2%) !important;
                }



                .button a{
                    color: var(--black);
                }



                @media screen and (max-width: 1000px) {
                    .button_container {
                        border-radius: calc(${size} * .28vw);
                        padding: calc(${size} * .8vw) calc(${size} * 2vw);
                    }
                }
                
            
            `}</style>
        </>
    )
}


export default Button

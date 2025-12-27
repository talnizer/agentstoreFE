import 'photoswipe/dist/photoswipe.css'
import { useEffect, useState } from 'react';

import { Gallery, Item } from 'react-photoswipe-gallery'

export default function ImageViewer(props) {
    const [pages, setPages] = useState([]);
    useEffect(() => {
        let prefix = window.location.protocol + "//" +
            window.location.hostname;
        var prefixedPages = props?.urls.map(el => prefix + el);
        setPages(prefixedPages);
    }, [props]);

    return (
        <Gallery>
            <div className="mx-0 row 1px-2 rounded justify-content-center">
                {pages && pages.length > 0 && pages.map((url, index = 0) => (
                    <Item
                        original={url + '?ver=' + (new Date().getTime())}
                        thumbnail={url + '?ver=' + (new Date().getTime())}
                        width="768"
                        height={props.showForMenuItems ? "768" : "1024"}
                        key={index}
                    >
                        {({ ref, open }) => (
                            <div className="col-auto p-0 m-1" style={{ cursor: 'pointer' }}>
                                {(!props.showCoverOnly || props.showCoverOnly && index === 0) && <img alt="image" ref={ref} onClick={open} width="100"
                                    height="100" src={url + '?ver=' + (new Date().getTime())}
                                    className="border border-dark mx-0 rounded" />
                                }
                                {props.showCoverOnly && index > 0 && <div ref={ref} onClick={open}
                                    className=""> </div>
                                }
                                {!props?.hidePageIndex && <div className='text-dark'>Page-{index + 1}</div>}
                            </div>

                        )}
                    </Item>
                )
                )}
            </div>
        </Gallery>
    );
}
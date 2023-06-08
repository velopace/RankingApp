import React, { useState, useEffect } from 'react';
import MovieImageArr from './MovieImages';
import RankingGrid from './RankingGrid';

const RankItems = () => {
    const [items, setItems] = useState([]);
    const dataType = 1;

    function drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
    }

    function allowDrop(ev) {
        ev.preventDefault();
    }

    function drop(ev) {
        ev.preventDefault();
        const targetElm = ev.target;
        if (targetElm.nodeName === "IMG") {
            return false;
        }
        if (targetElm.childNodes.length === 0) {
            var data = parseInt(ev.dataTransfer.getData("text").substring(5));
            const transformedCollection = items.map((item) => (item.id === parseInt(data)) ?
                { ...item, ranking: parseInt(targetElm.id.substring(5)) } : { ...item, ranking: item.ranking });
            setItems(transformedCollection);
        }

    }

    useEffect(() => {
        fetch(`item/${dataType}`)
            .then((results) => {
                return results.json();
            })
            .then(data => {
                setItems(data);
            })
    }, [])

    return (
        <main className="main">
            <RankingGrid items={items} imgArr={MovieImageArr} drag={drag} allowDrop={allowDrop} drop={drop} />
            <div className="items-not-ranked">
                {
                    (items.length > 0) ? items.map((item) =>
                        (item.ranking === 0) ?
                            <div className="unranked-cell" key={item.id}>
                                <img id={`item-${item.id}`} src={MovieImageArr.find(o => o.id === item.imageId)?.image}
                                    style={{ cursor: "pointer" }} draggable="true" onDragStart={drag}
                                />
                            </div> : null
                    ) : <div>Loading...</div>
                }
            </div>
        </main>
    )
}

export default RankItems;

﻿import React, { useState, useEffect } from 'react';
import MovieImageArr from './MovieImages';
import RankingGrid from './RankingGrid';

const RankItems = () => {
    const [items, setItems] = useState([]);
    const dataType = 1;

    useEffect(() => {
        fetch(`item/${dataType}`)
            .then((results) => {
                return results.json();
            })
            .then(data => {
                setItems(data);
            })
    })

    return (
        <main className="main">
            <RankingGrid items={items} imgArr={MovieImageArr} />
            <div className="items-not-ranked">
                {
                    (items.length > 0) ? items.map((item) =>
                        <div className="unranked-cell">
                            <img id={`item-${item.id}`} src={MovieImageArr.find(o => o.id === item.imageId)?.image} />
                        </div>
                    ) : <div>Loading...</div>
                }
            </div>
        </main>
    )
}

export default RankItems;

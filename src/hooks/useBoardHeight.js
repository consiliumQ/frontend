import React, { useState, useEffect } from 'react';

export default function useBoardHeight() {
    const [boardHeight, setBoardHeight] = useState(window.innerHeight - 85);
    const setBoardHeightOnListen = () => setBoardHeight(window.innerHeight - 85);

    useEffect(() => {
        window.addEventListener('resize', setBoardHeightOnListen);
        return () => {
            window.removeEventListener('resize', setBoardHeightOnListen);
        };
    });

    return boardHeight;
}

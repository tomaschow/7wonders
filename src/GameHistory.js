import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { getHistory } from './api/playersApi'
import { Player } from './Player';

export const GameHistory = () => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const getHistorySync = async () => {
            const resp = await getHistory();
            console.log('History get:', resp);
            setHistory(resp);
        }
        getHistorySync();
    }, [getHistory]);

    if (!history || history.length === 0) {
        return null;
    }

    return (
        <Container>
            {history.map((player, index) => (<Row key={index}>
                <Col>
                    <Player player={player} index={index} />
                </Col>
            </Row>))}
        </Container>
    );
}
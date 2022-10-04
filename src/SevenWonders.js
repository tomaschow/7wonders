/* eslint-disable react/jsx-filename-extension */
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Button, Card, Form, Container, Row, Col } from 'react-bootstrap';
import { postHistory } from './api/playersApi'
import { Player } from './Player'
import { PlayerForm } from './PlayerForm'
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * Main entry point
 */
export const SevenWonders = () => {
  const [players, setPlayers] = useState([]);
  const [bestPlayer, setBestPlayer] = useState('');

  const calculateBestPlayer = useCallback(() => {
    if (players.length !== 0) {
      const totalScoreList = players.map((p) => p.total);
      const maxTotalScore = Math.max(...totalScoreList);
      const winner = players.find((p) => p.total === maxTotalScore).name;
      if (winner) {
        setBestPlayer(winner);
      }
    }
  }, [players]);

  const printGameSummary = useCallback(async () => {
    // create a game history based on summary
    const history = {
      id: String(Math.random() * 28).slice(3, 9),
      date: new Date().toISOString(),
      players,
      bestPlayer
    }
    await postHistory(history);
  }, [players, bestPlayer]);

  const addPlayer = ({
    name,
    warGain,
    warLoss,
    yellow,
    board,
    money,
    green,
    blue,
    purple,
    brown,
    total,
  }) => {
    const newList = [
      ...players,
      { name, warGain, warLoss, yellow, board, money, green, blue, purple, brown, total },
    ];
    setPlayers(newList);
  };

  const removePlayer = (index) => {
    const newList = [...players];
    newList.splice(index, 1);
    setPlayers(newList);
  };

  const restart = () => {
    setPlayers([]);
    setBestPlayer('');
  };

  useEffect(() => {
    calculateBestPlayer();
  }, [players.length, calculateBestPlayer]);

  return (
    <div className="app">
      <Container fluid="md">
        <div className="container">
          <h1 className="text-center mb-4">七大奇迹计分板</h1>
          <PlayerForm addPlayer={addPlayer} />
          <Row className="align-items-center">
            {players.length > 0 && (
              <Col xs="auto">
                <Button
                  variant="secondary mb-2"
                  onClick={async () => {
                    await printGameSummary();
                    restart();
                  }}
                >
                  End Game
                </Button>
              </Col>
            )}
            {players.length > 0 && bestPlayer && (
              <Col xs="auto">
                <b>🎉 The best player is: {bestPlayer} 🎉</b>
              </Col>
            )}
          </Row>
          <br />
          <Row>
            {players.map((player, index) => (
              <Card key={index}>
                <Card.Body>
                  <Player
                    key={index}
                    index={index}
                    player={player}
                    removePlayer={removePlayer}
                  />
                </Card.Body>
              </Card>
            ))}
          </Row>
        </div>
      </Container>
    </div>
  );
};

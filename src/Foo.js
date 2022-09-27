/* eslint-disable react/jsx-filename-extension */
import React, { useEffect, useState, useCallback } from 'react';
import { Button, Card, Form, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Player = ({ player, index, removePlayer }) => (
  <div className="todo">
    <span>
      <b>Name: {player.name}</b>
    </span>
    <br />
    <span>Board Score: {player.board || 0}</span>
    <br />
    <span>Money Score: {player.money || 0}</span>
    <br />
    <span>Brown Score: {player.brown || 0}</span>
    <br />
    <span>Green Score: {player.green || 0}</span>
    <br />
    <span>Yellow Score: {player.yellow || 0}</span>
    <br />
    <span>Purple Score: {player.purple || 0}</span>
    <br />
    <span>Battle Score: {player.red || 0}</span>
    <br />
    <span>
      <b>Total Score: {player.total}</b>
    </span>
    <br />
    <div>
      <Button variant="outline-danger" onClick={() => removePlayer(index)}>
        ✕
      </Button>
    </div>
  </div>
);

export const FormPlayer = ({ addPlayer }) => {
  const [name, setName] = useState('');
  const [board, setBoard] = useState('');
  const [red, setRed] = useState('');
  const [yellow, setYellow] = useState('');
  const [blue, setBlue] = useState('');
  const [money, setMoney] = useState('');
  const [brown, setBrown] = useState('');
  const [purple, setPurple] = useState('');
  const [green, setGreen] = useState('');

  const resetInputs = () => {
    setName('');
    setBoard('');
    setRed('');
    setYellow('');
    setBlue('');
    setMoney('');
    setBrown('');
    setPurple('');
    setGreen('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      return;
    }
    addPlayer({
      name,
      red,
      yellow,
      board,
      money,
      green,
      blue,
      purple,
      brown,
      total:
        Number(board) ||
        0 + Number(money) ||
        0 + Number(red) ||
        0 + Number(yellow) ||
        0 + Number(green) ||
        0 + Number(purple) ||
        0 + Number(blue) ||
        0 + Number(brown) ||
        0,
    });
    resetInputs();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col>
          <Form.Group>
            <Form.Label>
              <b>Name</b>
            </Form.Label>
            <Form.Control
              type="text"
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Give me a name"
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>
              <b>Board Score</b>
            </Form.Label>
            <Form.Control
              type="text"
              className="input"
              value={board}
              onChange={(e) => setBoard(e.target.value)}
              placeholder="e.g. 10"
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>
              <b>Blue Score</b>
            </Form.Label>
            <Form.Control
              type="text"
              className="input"
              value={blue}
              onChange={(e) => setBlue(e.target.value)}
              placeholder="e.g. 10"
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>
              <b>Yellow Score</b>
            </Form.Label>
            <Form.Control
              type="text"
              className="input"
              value={yellow}
              onChange={(e) => setYellow(e.target.value)}
              placeholder="e.g. 10"
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group>
            <Form.Label>
              <b>Money Score</b>
            </Form.Label>
            <Form.Control
              type="text"
              className="input"
              value={money}
              onChange={(e) => setMoney(e.target.value)}
              placeholder="e.g. 10"
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>
              <b>Red Score</b>
            </Form.Label>
            <Form.Control
              type="text"
              className="input"
              value={red}
              onChange={(e) => setRed(e.target.value)}
              placeholder="e.g. 10"
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>
              <b>Green Score</b>
            </Form.Label>
            <Form.Control
              type="text"
              className="input"
              value={green}
              onChange={(e) => setGreen(e.target.value)}
              placeholder="e.g. 10"
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>
              <b>Purple Score</b>
            </Form.Label>
            <Form.Control
              type="text"
              className="input"
              value={purple}
              onChange={(e) => setPurple(e.target.value)}
              placeholder="e.g. 10"
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>
              <b>Brown Score</b>
            </Form.Label>
            <Form.Control
              type="text"
              className="input"
              value={brown}
              onChange={(e) => setBrown(e.target.value)}
              placeholder="e.g. 10"
            />
          </Form.Group>
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          <Button variant="primary mb-3" type="submit">
            Add New Player ✔
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

/**
 * Main entry point
 */
export const Foo = () => {
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

  const addPlayer = ({
    name,
    red,
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
      { name, red, yellow, board, money, green, blue, purple, brown, total },
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
          <h1 className="text-center mb-4">七大奇迹</h1>
          <FormPlayer addPlayer={addPlayer} />
          <Row>
            <Col>
              <Button
                variant="secondary mb-3"
                onClick={() => {
                  restart();
                }}
              >
                Restart Game
              </Button>
            </Col>
            {bestPlayer && (
              <Col>
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

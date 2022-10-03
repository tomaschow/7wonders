/* eslint-disable react/jsx-filename-extension */
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Button, Card, Form, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Player = ({ player, index, removePlayer }) => (
  <div>
    <span>
      <b>{player.name}</b>
    </span>
    <br />
    <span>
      <b>总分: {player.total}</b>
    </span>
    <br />
    <span>版面🏁: {player.board || 0}</span>
    <br />
    <span>金钱💰: {player.money || 0}</span>
    <br />
    <span>棕牌🟫: {player.brown || 0}</span>
    <br />
    <span>绿牌🟩: {player.green || 0}</span>
    <br />
    <span>黄牌🟨: {player.yellow || 0}</span>
    <br />
    <span>紫牌🟪: {player.purple || 0}</span>
    <br />
    <span>战斗⚔: {player.red || 0}</span>
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

  const fieldToSetStateMap = useMemo(() => ({
    name: { value: name, callback: setName, displayValue: "姓名", placeholder: "Give me a name", type: "text" },
    board: { value: board, callback: setBoard, displayValue: "版面🏁", placeholder: "e.g. 5", type: "number" },
    red: { value: red, callback: setRed, displayValue: "战斗⚔", placeholder: "e.g. 5", type: "number" },
    yellow: { value: yellow, callback: setYellow, displayValue: "黄牌🟨", placeholder: "e.g. 5", type: "number" },
    blue: { value: blue, callback: setBlue, displayValue: "蓝牌🟦", placeholder: "e.g. 5", type: "number" },
    money: { value: money, callback: setMoney, displayValue: "金钱💰", placeholder: "e.g. 5", type: "number" },
    brown: { value: brown, callback: setBrown, displayValue: "棕牌🟫", placeholder: "e.g. 5", type: "number" },
    purple: { value: purple, callback: setPurple, displayValue: "紫牌🟪", placeholder: "e.g. 5", type: "number" },
    green: { value: green, callback: setGreen, displayValue: "绿牌🟩", placeholder: "e.g. 5", type: "number" },
  }), [name, board, red, yellow, blue, money, brown, purple, green]);

  const fields = Object.keys(fieldToSetStateMap);

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
      <Row className="align-items-center">
        {fields.map(field => (<Col xs="auto" key={field}>
          <Form.Group>
            <Form.Label>
              <b>{fieldToSetStateMap[field].displayValue}</b>
            </Form.Label>
            <Form.Control
              required={fieldToSetStateMap[field].displayValue === "姓名"}
              type={fieldToSetStateMap[field].type}
              pattern={fieldToSetStateMap[field].type === "number" ? "\\d*" : undefined}
              className="input"
              value={fieldToSetStateMap[field].value}
              onChange={(e) => fieldToSetStateMap[field].callback(e.target.value)}
              placeholder={fieldToSetStateMap[field].placeholder}
            />
          </Form.Group>
        </Col>))}
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
          <h1 className="text-center mb-4">七大奇迹计分板</h1>
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

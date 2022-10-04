import React, { useState, useMemo } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';

export const PlayerForm = ({ addPlayer }) => {
    const [name, setName] = useState('');
    const [board, setBoard] = useState('');
    const [warGain, setWarGain] = useState('');
    const [warLoss, setWarLoss] = useState('');
    const [yellow, setYellow] = useState('');
    const [blue, setBlue] = useState('');
    const [money, setMoney] = useState('');
    const [brown, setBrown] = useState('');
    const [purple, setPurple] = useState('');
    const [green, setGreen] = useState('');

    const fieldToSetStateMap = useMemo(() => ({
        name: { value: name, callback: setName, displayValue: "姓名", placeholder: "Give me a name", type: "text" },
        board: { value: board, callback: setBoard, displayValue: "版面🏁", placeholder: "e.g. 5", type: "number" },
        warGain: { value: warGain, callback: setWarGain, displayValue: "胜利⚔", placeholder: "e.g. 5", type: "number" },
        warLoss: { value: warLoss, callback: setWarLoss, displayValue: "失败☠", placeholder: "e.g. 5", type: "number" },
        yellow: { value: yellow, callback: setYellow, displayValue: "黄牌🟨", placeholder: "e.g. 5", type: "number" },
        blue: { value: blue, callback: setBlue, displayValue: "蓝牌🟦", placeholder: "e.g. 5", type: "number" },
        money: { value: money, callback: setMoney, displayValue: "金钱💰", placeholder: "e.g. 5", type: "number" },
        brown: { value: brown, callback: setBrown, displayValue: "棕牌🟫", placeholder: "e.g. 5", type: "number" },
        purple: { value: purple, callback: setPurple, displayValue: "紫牌🟪", placeholder: "e.g. 5", type: "number" },
        green: { value: green, callback: setGreen, displayValue: "绿牌🟩", placeholder: "e.g. 5", type: "number" },
    }), [name, board, warGain, warLoss, yellow, blue, money, brown, purple, green]);

    const fields = Object.keys(fieldToSetStateMap);

    const resetInputs = () => {
        setName('');
        setBoard('');
        setWarGain('');
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
            warGain,
            warLoss,
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
                0 + Number(warGain) ||
                0 + Number(yellow) ||
                0 + Number(green) ||
                0 + Number(purple) ||
                0 + Number(blue) ||
                0 + Number(brown) ||
                0 - Number(warLoss) || 0,
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
                            pattern={fieldToSetStateMap[field].type === "number" ? "//d*" : undefined}
                            inputMode={fieldToSetStateMap[field].type === "number" ? "numeric" : undefined}
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
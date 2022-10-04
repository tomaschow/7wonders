import React from 'react';
import { Button } from 'react-bootstrap';

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
        <span>战斗⚔: {player.warGain - player.warLoss || 0}</span>
        <br />
        <div>
            <Button variant="outline-danger" onClick={() => removePlayer(index)}>
                ✕
            </Button>
        </div>
    </div>
);
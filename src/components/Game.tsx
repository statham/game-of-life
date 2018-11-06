import * as React from 'react';
import styled from 'styled-components';
import Canvas from './Canvas';
import Loop from './Loop';

const Game = () => (
    <Loop>
      <Canvas height={400} width={400} />
    </Loop>
);

export default Game;

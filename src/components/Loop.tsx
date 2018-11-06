import * as React from 'react';
import GameLoop from '../utils/gameLoop';
import { object } from 'prop-types';


interface LoopProps {
  children?: any;
}

interface ProviderContext {
  loop: object;
}

class Loop extends React.PureComponent<LoopProps> {
  loop: GameLoop;
  static childContextTypes = {
    loop: object
  }

  constructor(props: LoopProps) {
    super(props);
    this.loop = new GameLoop();
  }

  componentDidMount() {
    this.loop.start();
  }

  getChildContext(): ProviderContext {
    return { loop: this.loop };
  }


  componentWillUnmount() {
    this.loop.stop();
  }

  render() {
    return (
      <div>{this.props.children}</div>
    );
  }
}

export default Loop;

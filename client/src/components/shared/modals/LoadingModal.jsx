import React, { PureComponent } from 'react';
import RootModal from './RootModal';
import LoadingSpinnerInfinity from '../loadingSpinners/LoadingSpinnerInfinity';
import LoadingSpinnerDualRing from '../loadingSpinners/LoadingSpinnerDualRIng';

class LoadingModal extends PureComponent {
  render() {
    const {type} = this.props;
    const spinner = {
      DualRing: <LoadingSpinnerDualRing show/>,
      Inifinity: <LoadingSpinnerInfinity show/>
    }

    return (
      <RootModal>
        <div className='text-xl'>
           {spinner[type] || spinner.DualRing}
        </div>
      </RootModal>
    );
  }
}

export default LoadingModal;

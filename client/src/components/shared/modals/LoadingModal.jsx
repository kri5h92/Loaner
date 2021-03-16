import React,{PureComponent} from 'react';
import RootModal from './RootModal';

class LoadingModal extends PureComponent {
  render() {
    return (
		<RootModal>
			<div className="text-3xl">Loading...</div>
		</RootModal>
    )
  }
}

export default LoadingModal;

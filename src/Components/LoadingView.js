import React from 'react';
import LoadingTransactions from '../Assets/Fetching_Transactions.jpg';
import './LoadingView.scss';

const LoadingView = () => {
    return (
        <div className='loadingView'>
            <h1>Getting Transactions...</h1>
            <img className='loadingView__money' src={LoadingTransactions} alt='Money with wings' />
        </div>
    )
}

export default LoadingView;
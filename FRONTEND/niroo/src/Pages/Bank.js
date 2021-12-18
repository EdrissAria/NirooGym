import React from 'react'
import * as api from '../components/Api'
import {useQuery } from 'react-query'
import Title from '../components/Title'

function Bank() {
    const bank = useQuery('bank', api.getBank);
    if (bank.isSuccess) {
        console.log('bank: ',bank.data)
        return (
            <div className="graph_area">
                <div className="container">
                    <Title linkTo="/" title="Welcome To" subTitle="Bank" buttonValue="back to dashboard" />
                    <div className="value_cards_sec">
                        <div className="row">
                            <div className="col col-lg-4">
                                <div className="value_card card_1">
                                    <p>Total Earning</p>
                                    <h4>{bank.data.earn == null?0:bank.data.earn} <span className="currency">AFN</span></h4>
                                </div>
                            </div>
                            <div className="col col-lg-4">
                                <div className="value_card card_2">
                                    <p>Total Expense</p>
                                    <h4>{bank.data.expense == null?0:bank.data.expense} <span className="currency">AFN</span></h4>
                                </div>
                            </div>
                            <div className="col col-lg-4">
                                <div className="value_card card_3">
                                    <p>Total Loss</p>
                                    <h4>{bank.data.loss == null?0:bank.data.loss} <span className="currency">AFN</span></h4>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5 row">
                            <div className="col col-lg-4">
                                <div className="value_card card_4">
                                    <p>Total Gain</p>
                                    <h4>{bank.data.gain == null?0:bank.data.gain} <span className="currency">AFN</span></h4>
                                </div>
                            </div>
                            <div className="col col-lg-4">
                                <div className="value_card card_5">
                                    <p>Total Picks</p>
                                    <h4>{bank.data.pick} <span className="currency">AFN</span></h4>
                                </div>
                            </div>
                            <div className="col col-lg-4">
                                <div className="value_card card_6">
                                    <p>Total Loans</p>
                                    <h4>{bank.data.loan} <span className="currency">AFN</span></h4>
                                </div>
                            </div>
                            <div className="mt-5 col col-lg-12">
                                <div className="value_card card_7">
                                    <p>Total Money In Bank</p>
                                    <h4>{bank.data.total == null?0:bank.data.total} <span className="currency">AFN</span></h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text_copy">
                        <p>copy right M.Edriss Aria. all rights reserved</p>
                    </div>
                </div>
            </div>
        )
    } else {
        return bank.isLoading ? 'loading...' : null;
    }
}

export default Bank

import React from "react";
import i18next from "i18next";
import Button from "@material-ui/core/Button";

export default class CountdownBeforeTask extends React.Component {
    constructor() {
        super();
        this.state = {
            countdownTimer: 3,
            showStartButton: true,
        }
    }

    render() {
        return (
            <div style={{
                position: 'relative',
                height: '80vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: 'fadeIn 0.4s ease-in-out'
            }}>
                { this.state.showStartButton
                    ? <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Button
                            variant="contained"
                            size="large"
                            className="speechTask-countdown-button"
                            onClick={() => {
                                this.setState({
                                    showStartButton: false,
                                })
                                let countdown = setInterval(
                                    () => {
                                        this.setState({
                                            countdownTimer: this.state.countdownTimer - 1,
                                        })
                                    }, 1000)
                                setTimeout(() => {
                                    clearInterval(countdown)
                                    this.props.startTask();
                                }, 3000)
                            }}>
                            {i18next.t('button.start')}
                        </Button>
                    </div>
                    : <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '80px',
                        fontWeight: 'bold'
                    }}>
                        <div className="text-center countdown">
                            {this.state.countdownTimer}
                        </div>
                    </div>
                }
            </div>
        );
    }
}
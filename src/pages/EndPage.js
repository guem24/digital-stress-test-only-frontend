import Slide from "@material-ui/core/Slide";
import React from "react";
import {CircularProgress} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import i18next from "i18next";
import sosci_logo from "../img/sosci_logo.jpeg";
import switch_tab_video from "../img/switch_tab.mp4";


export default class EndPage extends React.Component{
    constructor() {
        super();
        this.state = {
            showCircularProgress: false,
        }
    }

    componentDidMount() {
        // Upload data when component mounts
        let config = new Blob([`save_all_data\n${Date.now()}\n${this.props.studyMetaTracker.studyTitle}\n${this.props.studyMetaTracker.studyUuid}`], {type: 'text/plain'})
        this.props.uploadFinalData(config, true);
        this.setState({ showCircularProgress: true });
        setTimeout(() => {
            this.setState({ showCircularProgress: false });
        }, 2000);
    }

    render() {
        return<>
            {this.props.activeSlide === 'questionnaire' && (
                <Slide direction="right" in={this.props.activeSlide === 'questionnaire'} mountOnEnter unmountOnExit timeout={300}>
                    <div className="container-fluid">
                        <Card className="my-4">
                            <CardContent>
                                <div className="row justify-content-center py-4">
                                    <div className="col-12 text-center">
                                        {this.state.showCircularProgress ? (
                                            <>
                                                <CircularProgress />
                                                <p className="mt-3">{i18next.t('endPage.saving')}</p>
                                            </>
                                        ) : (
                                            <>
                                                <h2 className="font-weight-bold mb-4">
                                                    {i18next.t('endPage.saved')}
                                                </h2>
                                                <p className="lead mb-4">
                                                    {i18next.t('endPage.switchTab')}
                                                </p>
                                                <div className="row justify-content-center mb-4">
                                                    <div className="col-12 col-md-8 col-lg-6">
                                                        <video
                                                            autoPlay
                                                            loop
                                                            muted
                                                            playsInline
                                                            style={{width: '100%', maxWidth: '400px', borderRadius: '8px'}}
                                                        >
                                                            <source src={switch_tab_video} type="video/mp4" />
                                                            Your browser does not support the video tag.
                                                        </video>
                                                    </div>
                                                </div>
                                                <div className="row justify-content-center">
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </Slide>
            )}
        </>

    }
}

import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import i18next from "i18next";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import Slide from "@material-ui/core/Slide";
import Calibration from "../components/Calibration";
import AbortDialog from "../components/AbortDialog";


const styles = theme => ({});

class Introduction extends React.Component {
    constructor() {
        super();
        this.state = {
            abortDialogIsOpen: false,
            infoCounter: 0,
        }
        this.contentList = [
            {header: <u> {i18next.t('study_introduction_1.header') } </u>,
                listItem: [i18next.t('study_introduction_1.text0_1'), i18next.t('study_introduction_1.text0_2'), i18next.t('study_introduction_1.text0_3'),i18next.t('study_introduction_1.text0_5'),]
            },
            {header: <u> {i18next.t('study_introduction_2.header') } </u>,
                listItem: [i18next.t('study_introduction_2.text0_1'), i18next.t('study_introduction_2.text0_2'),  i18next.t('study_introduction_2.text0_3'),i18next.t('study_introduction_2.text0_4')]
            }
        ]
        this.handleAbortDialog = this.handleAbortDialog.bind(this);
    }

    manipulateInfoCounter(action) {
        if (action === 'back') {
            this.setState({infoCounter: this.state.infoCounter - 1})
        }
        if (action === 'continue') {
            if (this.state.infoCounter === 1) {
                // Reset infoCounter before transitioning to prevent flash
                this.setState({infoCounter: 0}, () => {
                    this.props.handleNext();
                });
            } else {
                this.setState({
                    infoCounter: this.state.infoCounter + 1
                })
            }
        }
    }

    handleAbortDialog(){
        this.setState({
            abortDialogIsOpen: !this.state.abortDialogIsOpen,
        });
    }

    render () {
        // Only build list elements when we're on the intro slide to prevent flash during transitions
        let arrayOfListElements = [];
        if (this.props.activeSlide === 'intro') {
            for (let i=0; i< this.contentList[this.state.infoCounter].listItem.length; ++i) {
                arrayOfListElements.push(
                    <li className="pb-1" key={i}>{this.contentList[this.state.infoCounter].listItem[i]}</li>
                )
            }
        }
        return <>
            {this.props.activeSlide === 'intro' && (
                <Slide direction="right" in={this.props.activeSlide === 'intro'} mountOnEnter unmountOnExit timeout={300}>
                    <div>
                        <Card>
                            <div className="row">
                                <div className="col-12 p-0">
                                    <h3 className="index-body-header px-3 py-2">
                                        {this.contentList[this.state.infoCounter].header}
                                    </h3>
                                </div>
                            </div>
                            <CardContent className="py-0">
                                <ul className="list-styled ul stepper-bullet-point ">
                                    {arrayOfListElements}
                                </ul>
                            </CardContent>
                        </Card>
                        <div className="row justify-content-center">
                            {
                                this.state.infoCounter === 0
                                    ? <div/>
                                    : <div className="p-2">
                                        <Button
                                            variant="contained"
                                            size="medium"
                                            className="alert-buttons"
                                            onClick={ ()=> {
                                                this.manipulateInfoCounter('back')
                                            }}>
                                            {i18next.t('button.back')}
                                        </Button>
                                    </div>
                            }
                            <div className="p-2">
                                <Button
                                    variant="contained"
                                    size="medium"
                                    className="alert-buttons"
                                    onClick={() => {
                                        this.manipulateInfoCounter('continue')
                                    }}>
                                    {i18next.t('button.continue')}
                                </Button>
                            </div>
                        </div>
                    </div>
                </Slide>
            )}
            {this.props.activeSlide === 'calibration' && (
                <Slide direction="right" in={this.props.activeSlide === 'calibration'} mountOnEnter unmountOnExit timeout={300}>
                    <div>
                        <Calibration
                            handleNext={this.props.handleNext}
                            markVideoAsUploading={this.props.markVideoAsUploading}
                            markVideoAsUploaded={this.props.markVideoAsUploaded}
                            studyResultId={this.props.studyResultId}
                            handleAbortDialog={this.handleAbortDialog}
                        />
                    </div>
                </Slide>
            )}
            <AbortDialog
                handleAbortDialog={this.handleAbortDialog}
                abortDialogIsOpen={this.state.abortDialogIsOpen}
            />
        </>
    }
}

export default withStyles(styles, { withTheme: true })(Introduction);

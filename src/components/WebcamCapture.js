import React from 'react';
import Webcam from "react-webcam";

// Optimized video constraints for better performance
const constraints = window.constraints = {
    audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44100
    },
    video: {
        facingMode: "user",
        width: { ideal: 640, max: 1280 },
        height: { ideal: 480, max: 720 },
        frameRate: { ideal: 24, max: 30 }
    }
};

class WebcamCapture extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timeoutID: null,
            mimeType: null,
        };
        this.recordedChunks = [];
        this.mediaStreamRecorder = null;
        this.webcamRef = React.createRef();

        this.startRecording = this.startRecording.bind(this);
        this.stopRecording = this.stopRecording.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        // Prevent unnecessary re-renders for better performance
        return this.props.videoCounter !== nextProps.videoCounter ||
               this.props.videoFeedbackState !== nextProps.videoFeedbackState ||
               this.state.mimeType !== nextState.mimeType;
    }

    /**
     * For mathTask and speechTask the recording should only stop on unmounting.
     */
    componentWillUnmount() {
        if(this.props.studyPage === 'mathTask' || this.props.studyPage === 'speechTask' ) {
            this.stopRecording();
        }
    }

    /**
     * When this component is used in mathTask or speechTask then the this.startRecording() method is invoked on the event of
     * the webcam component getting userMedia. But for the Introduction component the recording should only start, when
     * the this.props.videoFeedbackState-variable changes to startRecord. Similar it should stop when this.props.videoFeedbackState
     * changes to stopRecord
     * @param prevProps
     * @param prevState
     * @param snapshot
     */
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.studyPage === "introduction") {
            if ((prevProps.videoFeedbackState === "waitRecord" || prevProps.videoFeedbackState === "stopRecord") && this.props.videoFeedbackState === "startRecord") {
                this.startRecording();
            }
            if (prevProps.videoFeedbackState === "startRecord" && this.props.videoFeedbackState === "stopRecord") {
                this.stopRecording();
            }
        }
    }

    /**
     * Function that wraps the createMediaRecorderWithOptions function for different options.
     * @param stream a MediaStream object
     * @returns {Promise<void>}
     */
    async createMediaRecorder(stream) {
        // Reduced bitrates for better performance on mobile devices
        let options = {
            mimeType: 'video/mp4',
            audioBitsPerSecond: 128000,
            videoBitsPerSecond: 300000  // Reduced from 500000 for better performance
        };
        try {
            await this.createMediaRecorderWithOptions(stream, options)
        } catch (e0) {
            try {
                let options = {
                    mimeType: 'video/webm',
                    audioBitsPerSecond: 128000,
                    videoBitsPerSecond: 300000  // Reduced from 500000 for better performance
                };
                await this.createMediaRecorderWithOptions(stream, options)
            } catch (e1) {
                throw e1;
            }
        }
    }

    /**
     * Function to initialise a MediaRecorder object with particular options for configuration and pass
     * event handler functions to it.
     * @param stream a MediaStream object
     * @param options object that configures mimeType, audioBitsPerSecond and videoBitsPerSecond
     * @returns {Promise<void>}
     */
    async createMediaRecorderWithOptions(stream, options) {
        this.mediaStreamRecorder = await new MediaRecorder(stream, options);
        this.mediaStreamRecorder.ondataavailable = event => {
            if (event.data && event.data.size > 0) {
                this.recordedChunks.push(event.data);
            }
        }
        this.mediaStreamRecorder.onstop = event => {
            this.uploadVideo();
        }
        this.mediaStreamRecorder.onerror = event => {
            console.error("MediaRecorder error:", event);
        };
        this.setState({
            mimeType: this.mediaStreamRecorder.mimeType
        })
    }

    /**
     * Creates a MediaRecorder object and starts the recording.
     * @returns {Promise<void>}
     */
    async startRecording() {
        try {
            await this.createMediaRecorder(this.webcamRef.current.stream);
            // Start recording with timeslice for better memory management
            await this.mediaStreamRecorder.start(1000); // Record in 1-second chunks
            if (this.props.studyPage === 'introduction') {
                this.setState({
                    timeoutID: setTimeout(() => this.stopRecording(), 30000)
                })
            }
        } catch (err) {
            console.error("Recording start error:", err);
            window.alert("Unable to start recording. Please check camera permissions.")
        }
    }

    /**
     * Uploads a video to the JATOS backend. If this component is used in the Introduction component then a URL representing
     * the recorded video is passed back to the Introduction component for displaying it in a video-tag.
     */
    uploadVideo() {
        let blob = new Blob(this.recordedChunks, {type:this.state.mimeType});
        if (this.props.studyPage === 'introduction') {
            clearTimeout(this.state.timeoutID);
            this.props.setVideoURL(blob);
        }
        //Persisting
        if (process.env.NODE_ENV !== 'development' && process.env.REACT_APP_VIDEO_RECORDING === 'true' && process.env.REACT_APP_LOGGING === 'true') {
            let index = this.props.markVideoAsUploading();
            let fileExtension = this.state.mimeType === 'video/mp4' ? '.mp4' : '.webm';
            jatos.uploadResultFile(blob, this.props.studyResultId + '_' + this.props.studyPage + '_' + this.props.videoCounter + fileExtension)//eslint-disable-line no-undef
                .then(() => this.props.markVideoAsUploaded(index))
                .catch((response) => console.log(response))
                .then(() => this.props.markVideoAsUploaded(index));
        }
    }

    async stopRecording() {
        await this.mediaStreamRecorder.stop();
    }

    render() {
        let borderVariable;
        switch (this.props.studyPage) {
            case 'mathTask':
                borderVariable = "border border-danger border-frame-red";
                break;
            default:
                borderVariable = '';
                break;
        }

        const getWebcamStyle = () => {
            if (this.props.studyPage === 'mathTask') {
                return {
                    maxWidth: '100%',
                    maxHeight: '25vh',
                    width: 'auto',
                    height: 'auto',
                    objectFit: 'contain'
                };
            }
            if (this.props.studyPage === 'introduction') {
                return {
                    width: '100%',
                    height: 'auto',
                    maxHeight: '33vh',
                    objectFit: 'contain'
                };
            }
            return {};
        };

        const getWebcamDimensions = () => {
            if (this.props.studyPage === 'mathTask') {
                return { height: undefined, width: undefined };
            }
            return { height: this.props.webcamSize, width: undefined };
        };

        const dimensions = getWebcamDimensions();

        return (
            <Webcam
                audio={true}
                height={dimensions.height}
                width={dimensions.width}
                videoConstraints={constraints}
                className={borderVariable}
                ref={this.webcamRef}
                style={getWebcamStyle()}
                onUserMedia={() => {
                    if (this.props.studyPage === "introduction" || this.props.studyPage === 'speechTask') {
                        this.props.webcamCallback(this.webcamRef.current.stream);
                    }
                    if (this.props.studyPage === "mathTask" || this.props.studyPage === "speechTask") {
                        this.startRecording();
                    }
                }}
                onUserMediaError={(error) => {
                    console.error("Camera permission error:", error);
                    if (this.props.onUserMediaError) {
                        this.props.onUserMediaError(error);
                    } else {
                        // Default error handling
                        window.alert("Camera access denied. Please allow camera and microphone access in your browser settings and reload the page.");
                    }
                }}
            />
        )
    }
}
export default WebcamCapture;

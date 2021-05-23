import { useEffect } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import tw from "twin.macro";
import { FaMicrophone, FaStop } from "react-icons/fa";
import toast from "react-hot-toast";

import { TEvent } from "../utils/event";
import {
  getLanguageCode,
  getLanguageName,
  TCountryCode,
} from "../utils/language";
import { useDidMount } from "../hooks/useDidMount";

/**
 * There is issue in mobile where looks like it's not read interimResult accurately
 * https://stackoverflow.com/a/11381730/6891352
 * */
const isOnMobileOrTablet = () => {
  let check = false;
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
    // @ts-ignore
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
};

interface IProps {
  language: TCountryCode;
  updateText: (text: string) => void;
  setIsHold: (isHold: { status: boolean; event?: TEvent }) => void;
}

function Recorder(props: IProps) {
  const { updateText, language, setIsHold } = props;

  const {
    error,
    isRecording,
    results,
    interimResult,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    timeout: 10000,
    speechRecognitionProperties: {
      lang: getLanguageCode(language),
      interimResults: true,
    },
    crossBrowser: true,
    googleApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    googleCloudRecognitionConfig: {
      languageCode: getLanguageCode(language),
    },
  });

  if (error) toast.error(`${error}`);

  useEffect(() => {
    const result = results[results.length - 1];

    if (result) updateText(result);
  }, [results]);

  const actionButtonClick = async () => {
    if (isRecording) {
      if (!isOnMobileOrTablet() && !interimResult) {
        toast.error(
          `We can't hear you. Have you spoken in ${getLanguageName(language)}?`
        );
      }
      stopSpeechToText();
    } else startSpeechToText();
  };

  useDidMount(() => {
    if (isRecording) {
      setIsHold({ status: true, event: "record-speech" });
    } else {
      setIsHold({ status: false });
    }
  }, [isRecording]);

  return (
    <button
      aria-label={isRecording ? "Stop record" : "Record speech"}
      onClick={actionButtonClick}
      tw="relative tracking-wider shadow-md text-sm lg:text-base border text-white rounded-lg w-26 lg:w-32 px-4 lg:px-6 py-2 focus:(border-transparent ring-2 outline-none) transition-colors duration-300"
      css={[
        isRecording
          ? tw`bg-red-600 focus:ring-red-300 hover:bg-red-700 z-10`
          : tw`bg-green-700 focus:ring-green-300 hover:bg-green-800`,
      ]}
    >
      {isRecording ? (
        <div tw="flex items-center">
          <FaStop size="14" />
          <span tw="ml-2 tracking-widest">Finish</span>
        </div>
      ) : (
        <div tw="flex items-center">
          <FaMicrophone />
          <span tw="ml-2">Speech</span>
        </div>
      )}
    </button>
  );
}

export default Recorder;

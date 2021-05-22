import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/router";
import { FaGithub, FaGlobe, FaTwitter, FaGooglePlay } from "react-icons/fa";
import toast, { Toaster, useToasterStore } from "react-hot-toast";
import { ErrorBoundary } from "react-error-boundary";
import tw from "twin.macro";

import { TEvent } from "../utils/event";
import { TCountryCode } from "../utils/language";
import {
  getInvalidChar,
  getInvalidMorse,
  textToMorse,
  morseToText,
} from "../utils/translation";

import { useLocalStorage } from "../hooks/useLocalStorage";

// this component use browser-based library so we should using dynamic import with ssr disabled
const SpeechRecorder = dynamic(() => import("../components/SpeechRecorder"), {
  ssr: false,
});
import MorsePlayer from "../components/MorsePlayer";
import TextPlayer from "../components/TextPlayer";
import TextField from "../components/TextField";
import InvalidNotice from "../components/InvalidNotice";
import FieldLabel from "../components/FieldLabel";
import SelectLanguage from "../components/SelectLanguage";
import ErrorFallback from "../components/ErrorFallback";

function App() {
  const [language, setLanguage] = useLocalStorage<TCountryCode>(
    "morsible-language",
    "us"
  );
  const [isHold, setIsHold] = useState<{ status: boolean; event?: TEvent }>({
    status: false,
  });
  const [text, setText] = useState("");
  const [morse, setMorse] = useState("");
  const { toasts } = useToasterStore({ ariaLive: "assertive" });
  const { query } = useRouter() || { query: { text: "" } };

  useEffect(() => {
    const parsedText = query["text"] as string;

    if (parsedText) {
      setText(parsedText);
      setMorse(textToMorse(parsedText));
    }
  }, [query["text"]]);

  // limit toast number, https://github.com/timolins/react-hot-toast/issues/31
  useEffect(() => {
    toasts
      .filter((item) => item.visible)
      .filter((_, index) => index >= 2)
      .forEach((item) => toast.dismiss(item.id));
  }, [toasts]);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div>
        <div tw="relative min-h-screen flex flex-col font-sans">
          <header tw="bg-gray-50">
            <div tw="container mx-auto py-8 px-8 flex flex-col lg:flex-row justify-between lg:items-end">
              <div tw="flex items-center">
                <div tw="hidden lg:flex mr-8 items-center">
                  <Image
                    src="/icons/icon-72x72.png"
                    alt=""
                    width="72"
                    height="72"
                    loading="eager"
                    priority
                  />
                </div>
                <div tw="text-gray-900">
                  <h1 tw="text-4xl lg:text-5xl tracking-wide">Morsible</h1>
                  <p tw="lg:text-lg mt-2 tracking-wide">
                    fast and reliable morse translator
                  </p>
                </div>
              </div>
              <div tw="w-44 mt-6 lg:mt-0">
                <SelectLanguage language={language} setLanguage={setLanguage} />
              </div>
            </div>
          </header>
          <main tw="bg-gray-50 flex-1 flex flex-col justify-center">
            <div tw="container mx-auto lg:mt-4 mb-4 lg:mb-6 py-8 lg:py-10 px-8 flex flex-col lg:flex-row lg:items-start justify-between">
              <div tw="flex flex-col lg:w-5/12">
                <div tw="flex items-end mb-4 lg:mb-6">
                  <FieldLabel targetId="text" text="Text" />
                  <SpeechRecorder
                    language={language}
                    updateText={(transcript) => {
                      setText(transcript);
                      setMorse(textToMorse(transcript));
                    }}
                    setIsHold={setIsHold}
                  />
                  <div tw="ml-4">
                    <TextPlayer
                      text={text}
                      language={language}
                      setIsHold={setIsHold}
                    />
                  </div>
                </div>
                <div tw="relative">
                  <TextField
                    id="text"
                    placeholder="Any Text"
                    value={text}
                    isInvalid={getInvalidChar(text).length > 0}
                    isHold={isHold}
                    updateValue={(value) => {
                      setText(value);
                      setMorse(textToMorse(value));
                    }}
                  />
                </div>
                <InvalidNotice
                  pre="The following character did not have morse code: "
                  invalidItems={getInvalidChar(text)}
                />
              </div>
              <div tw="flex flex-col lg:w-5/12 mt-8 lg:mt-0">
                <div tw="flex items-end mb-4 lg:mb-6">
                  <FieldLabel targetId="morse" text="Morse" />
                  <MorsePlayer morse={morse} setIsHold={setIsHold} />
                </div>
                <div tw="relative">
                  <TextField
                    id="morse"
                    placeholder="Morse code"
                    value={morse}
                    isInvalid={getInvalidMorse(morse).length > 0}
                    isHold={isHold}
                    updateValue={(value) => {
                      if (!/^[\.\- /]*$/g.test(value))
                        return toast.error(
                          "Please input valid morse character"
                        );

                      setText(morseToText(value));
                      setMorse(value);
                    }}
                  />
                </div>
                <InvalidNotice
                  pre="The following morse did not have alphabetic characters: "
                  invalidItems={getInvalidMorse(morse)}
                />
              </div>
            </div>
            <div tw="container mx-auto pb-8 lg:pb-10 px-8">
              <p tw="mx-auto w-max">
                Morsible use{" "}
                <a
                  href="https://www.itu.int/dms_pubrec/itu-r/rec/m/R-REC-M.1677-1-200910-I!!PDF-E.pdf"
                  target="_blank"
                  rel="noopener"
                  tw="pb-1 border-b-2 border-gray-800"
                >
                  <span>ITU convention standard</span>
                </a>
              </p>
            </div>
          </main>
          <footer tw="text-center text-white py-16 lg:py-12 mt-auto bg-gray-800">
            <div tw="flex flex-col lg:flex-row justify-around container mx-auto px-8">
              <div tw="order-2 mt-12 lg:mt-0">
                <p tw="tracking-wide">
                  &copy; Ilham Wahabi 2021. MIT Licensed.
                </p>
                <div tw="mt-6 flex justify-center">
                  <a
                    href="https://iwgx.io"
                    target="_blank"
                    rel="noopener"
                    tw="hover:(opacity-60) transition-opacity"
                    aria-label="Website"
                  >
                    <FaGlobe size="24" />
                  </a>
                  <a
                    href="https://twitter.com/ilhamwahabigx"
                    target="_blank"
                    rel="noopener"
                    tw="ml-8 hover:(opacity-60) transition-opacity"
                    aria-label="Twitter"
                  >
                    <FaTwitter size="24" />
                  </a>
                  <a
                    href="https://github.com/iwgx/morsible"
                    target="_blank"
                    rel="noopener"
                    tw="ml-8 hover:(opacity-60) transition-opacity"
                    aria-label="Github"
                  >
                    <FaGithub size="24" />
                  </a>
                  <a
                    href="https://play.google.com/store/apps/details?id=io.iwgx.morsible.twa"
                    target="_blank"
                    rel="noopener"
                    tw="ml-8 hover:(opacity-60) transition-opacity"
                    aria-label="Google Play"
                  >
                    <FaGooglePlay size="22" />
                  </a>
                </div>
              </div>
              <div tw="order-1 lg:order-2">
                <p tw="border-white border-b-1 pb-1 w-max mx-auto">
                  <a
                    href={
                      language === "us"
                        ? "https://ko-fi.com/ilhamwahabi"
                        : "https://trakteer.id/ilhamwahabi"
                    }
                    target="_blank"
                    rel="noopener"
                  >
                    Buy me a coffee
                  </a>
                </p>
                <p tw="mt-6 tracking-wide">
                  Your donation help this project sustainable
                </p>
              </div>
            </div>
          </footer>
          <Toaster position="top-center" />
          <div
            tw="w-screen h-screen fixed bg-gray-900 top-0 left-0 transition"
            css={[
              isHold.status ? tw`opacity-40 z-0` : tw`opacity-0 z-index[-1]`,
            ]}
          />
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;

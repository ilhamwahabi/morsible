import tw from 'twin.macro'

interface IProps {
  id: string;
  placeholder: string;
  value: string;
  isInvalid: boolean;
  isHold: { status: boolean, event?: string };
  updateValue: (value: string) => void;
}

function TextField(props: IProps) {
  const { id, placeholder, value, isInvalid, isHold, updateValue } = props;

  const isFocused = () => {
    if (!isHold.status) return false
    if (
      !(
        (isHold.event === "play-morse" && id === "morse") ||
        (isHold.event === "play-text" && id === "text")
      )
    ) return false

    return true
  }

  return (
    <textarea
      id={id}
      placeholder={placeholder}
      value={value}
      spellCheck={false}
      tw="relative shadow-md h-4row lg:h-6row w-full border border-gray-400 rounded-2xl resize-none p-4 tracking-wider uppercase focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:(bg-gray-50)"
      css={[isInvalid && tw`border-red-600 focus:ring-red-500`, isFocused() && tw`z-10`]}
      disabled={isFocused()}
      onChange={event => updateValue(event.target.value)}
    />
  )
}

export default TextField

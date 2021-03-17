import tw from 'twin.macro'

interface IProps {
  id: string;
  placeholder: string;
  value: string;
  isInvalid: boolean;
  updateValue: (value: string) => void;
}

function TextField(props: IProps) {
  const { id, placeholder, value, isInvalid, updateValue } = props;

  return (
    <textarea
      id={id}
      placeholder={placeholder}
      value={value}
      tw="shadow-md h-4row lg:h-6row w-full border border-gray-400 rounded-2xl resize-none p-4 tracking-wider uppercase focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
      css={[isInvalid && tw`border-red-600 focus:ring-red-500`]}
      onChange={event => updateValue(event.target.value)}
    />
  )
}

export default TextField

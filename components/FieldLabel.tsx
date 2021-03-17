import 'twin.macro'
interface IProps {
  targetId: string;
  text: string;
}

function FieldLabel(props: IProps) {
  const { targetId, text } = props;

  return (
    <label htmlFor={targetId} tw="text-2xl lg:text-3xl text-gray-800 mr-auto pb-1 border-b-2 border-gray-800">
      { text }
    </label>
  )
}

export default FieldLabel

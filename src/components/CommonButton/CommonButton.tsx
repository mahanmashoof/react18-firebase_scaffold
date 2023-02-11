interface IButton {
  handleStuff: () => void;
  name: string;
  color: string;
}

const CommonButton = (props: IButton) => {
  return (
    <button
      onClick={() => props.handleStuff()}
      style={{ backgroundColor: props.color, color: "white" }}
    >
      {props.name}
    </button>
  );
};

export default CommonButton;

import "./Tab.scss";

const Tab: React.FC<{
  title: string;
  className: string;
  onClick: () => void;
}> = (props) => {
  return (
    <>
      <button className={props.className} onClick={props.onClick}>
        {props.title}
      </button>
    </>
  );
};

export default Tab;

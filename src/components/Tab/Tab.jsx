import "./Tab.scss";
export default function Tab({ title, className, onClick }) {
  return (
    <>
      <button className={className} onClick={onClick}>
        {title}
      </button>
    </>
  );
}

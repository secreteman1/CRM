import Tab from "../Tab/Tab.jsx";
export default function Tabs({
  category,
  quantityInformation,
  handleCategoryButtonClick,
}) {
  return (
    <div className="button-group">
      <Tab
        className={
          category === "all" ? "no-background-picked" : "no-background"
        }
        title={`Все (${quantityInformation.all})`}
        onClick={() => handleCategoryButtonClick("all")}
      />
      <Tab
        className={
          category === "inWork" ? "no-background-picked" : "no-background"
        }
        title={`В работе (${quantityInformation.inWork})`}
        onClick={() => handleCategoryButtonClick("inWork")}
      />
      <Tab
        className={
          category === "completed" ? "no-background-picked" : "no-background"
        }
        title={`Сделано (${quantityInformation.completed})`}
        onClick={() => handleCategoryButtonClick("completed")}
      />
    </div>
  );
}

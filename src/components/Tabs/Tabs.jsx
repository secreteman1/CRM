import Button from "../Button/Button.jsx";
export default function Tabs({
  category,
  quantityInformation,
  handleCategoryButtonClick,
}) {
  return (
    <div className="button-group">
      <Button
        className={
          category === "all" ? "no-background-picked" : "no-background"
        }
        title={`Все (${quantityInformation.all})`}
        onClick={() => handleCategoryButtonClick("all")}
      />
      <Button
        className={
          category === "inWork" ? "no-background-picked" : "no-background"
        }
        title={`В работе (${quantityInformation.inWork})`}
        onClick={() => handleCategoryButtonClick("inWork")}
      />
      <Button
        className={
          category === "completed" ? "no-background-picked" : "no-background"
        }
        title={`Сделано (${quantityInformation.completed})`}
        onClick={() => handleCategoryButtonClick("completed")}
      />
    </div>
  );
}

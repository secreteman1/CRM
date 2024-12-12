import Tab from "../Tab/Tab.tsx";

type QuantityInformation = {
  all: number;
  completed: number;
  inWork: number;
};

const Tabs: React.FC<{
  category: string;
  quantityInformation: QuantityInformation;
  handleCategoryButtonClick: (text: string) => void;
}> = (props) => {
  return (
    <div className="button-group">
      <Tab
        className={
          props.category === "all" ? "no-background-picked" : "no-background"
        }
        title={`Все (${props.quantityInformation.all})`}
        onClick={() => props.handleCategoryButtonClick("all")}
      />
      <Tab
        className={
          props.category === "inWork" ? "no-background-picked" : "no-background"
        }
        title={`В работе (${props.quantityInformation.inWork})`}
        onClick={() => props.handleCategoryButtonClick("inWork")}
      />
      <Tab
        className={
          props.category === "completed"
            ? "no-background-picked"
            : "no-background"
        }
        title={`Сделано (${props.quantityInformation.completed})`}
        onClick={() => props.handleCategoryButtonClick("completed")}
      />
    </div>
  );
};

export default Tabs;

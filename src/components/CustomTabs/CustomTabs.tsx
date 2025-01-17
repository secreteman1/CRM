import { Tabs } from "antd";
import { QuantityInformation, Category } from "../../types/types";

const CustomTabs: React.FC<{
  category: string;
  quantityInformation: QuantityInformation;
  changeFilter: (text: Category) => void;
}> = (props) => {
  const data = [
    {
      id: "all",
      label: `Все (${props.quantityInformation.all})`,
    },
    {
      id: "inWork",
      label: `В работе (${props.quantityInformation.inWork})`,
    },
    {
      id: "completed",
      label: `Сделано (${props.quantityInformation.completed})`,
    },
  ];

  const handleTabChange = (key: string) => {
    props.changeFilter(key as Category);
  };

  return (
    <Tabs
      defaultActiveKey="1"
      centered
      size="large"
      onChange={handleTabChange}
      items={data.map((tab) => ({
        label: tab.label,
        key: tab.id,
      }))}
    ></Tabs>
  );
};

export default CustomTabs;

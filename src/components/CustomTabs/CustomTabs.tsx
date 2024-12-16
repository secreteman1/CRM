import { Tabs } from "antd";

type QuantityInformation = {
  all: number;
  completed: number;
  inWork: number;
};

const CustomTabs: React.FC<{
  category: string;
  quantityInformation: QuantityInformation;
  handleCategoryButtonClick: (text: string) => void;
}> = (props) => {
  const data = [
    {
      id: "all",
      label: `Все (${props.quantityInformation.all})`,
      content: null,
    },
    {
      id: "inWork",
      label: `В работе (${props.quantityInformation.inWork})`,
      content: null,
    },
    {
      id: "completed",
      label: `Сделано (${props.quantityInformation.completed})`,
      content: null,
    },
  ];

  const handleTabChange = (key: string) => {
    props.handleCategoryButtonClick(key);
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
        children: tab.content,
      }))}
    ></Tabs>
  );
};

export default CustomTabs;

import React from "react";

import { Legend, PieChart, Pie, Cell, LabelList } from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#a05195",
  "#d45087",
  "#f95d6a",
  "#ff7c43",
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

// label={renderCustomizedLabel}
const ChartForm = (props) => {
  const { submissionsStatusList } = props;

  const pieData = submissionsStatusList;
  if (pieData.length === 0) {
    return <div>Loading status ..</div>;
  }
  return (
    <div className="row">
      <div className="col-12">
        <div className="card-counter">
          <div className="white-box status-container d-flex">
            <div className="col-lg-6  col-xs-12">
              <h4>Submission Status</h4>
              <div className="chart text-center">
                <PieChart width={600} height={400}>
                  <Pie
                    data={pieData}
                    cx={200}
                    cy={200}
                    labelLine={false}
                    outerRadius={90}
                    fill="#8884d8"
                    dataKey="count"
                    nameKey="statusName"
                    label="statusName"
                  >
                    <Legend />
                    <LabelList
                      dataKey="statusName"
                      nameKey="statusName"
                      position="insideTop"
                      angle="45"
                    />
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
                {/* </div>
        </div> */}
              </div>
            </div>
            <div className="col-lg-6  col-xs-12 legent-container">
              {pieData.map((entry, index) => (
                <div className="legent">
                  <span
                    className="legent-color"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></span>
                  <div className="legent-text">{entry.statusName}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartForm;

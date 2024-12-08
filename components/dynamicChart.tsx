import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { TrendingUp } from "lucide-react";

type Props = {
  data: any;
};

const DynamicChart = ({ data }: Props) => {
  const chartConfig = {} satisfies ChartConfig;
  return (
    <Card className="col-span-12 md:col-span-6">
      <CardHeader>
        <CardTitle>{data.title}</CardTitle>
        <CardDescription>{data.descriptionOfLabel}</CardDescription>
      </CardHeader>
      <CardContent className="">
        <ChartContainer config={{
          label: {
            label: data.xAxisLabel
          },
          value: {
            label: data.yAxisLabel
          }
        }}>
          <BarChart
            accessibilityLayer
            data={data.chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="label"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
            />
            <Bar dataKey="value" fill="black" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm items-start">
        <div className="flex gap-2 font-medium leading-none">
          {data.yAxisLabel}
          {/* <TrendingUp className="h-4 w-4" /> */}
        </div>
        <div className="leading-none text-muted-foreground">
          {data.chartFootNote}
        </div>
      </CardFooter>
    </Card>
  );
};

export default DynamicChart;

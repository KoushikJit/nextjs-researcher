"use client";

import DynamicChart from "@/components/dynamicChart";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import React, { FormEvent, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import ResearchPage from "./research/page";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

type Props = {};

const Home = (props: Props) => {
  const chartConfig = {} satisfies ChartConfig;
  const chartData = [
    { label: "January", value: 80 },
    { label: "February", value: 200 },
    { label: "March", value: 120 },
    { label: "April", value: 190 },
    { label: "May", value: 130 },
    { label: "June", value: 140 },
  ];

  return (
    <div className="p-8 h-screen w-screen bg-red-200 flex flex-col gap-4">
      <Link className={buttonVariants({ variant: "secondary" })} href="/research">
        Go to Research Page
      </Link>
      {/* <DynamicChart data={null} /> */}
    </div>
  );
};

export default Home;

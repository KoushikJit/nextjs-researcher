"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import DynamicChart from "@/components/dynamicChart";
import { toPng } from "html-to-image";
import { Download, Loader2, Target } from "lucide-react";

type Props = {};
let intervalId: any;

const ResearchPage = (props: Props) => {
  const [inputQuery, setInputQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});
  const [chartsArray, setChartsArray] = useState([]);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (isLoading) {
      setTimer(0);
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000); // Update timer every second
    }
    return () => clearInterval(intervalId);
  }, [isLoading]);

  const handleDownloadImage = async () => {
    const element = document.getElementById("capture");
    if (!element) return;

    try {
      const dataUrl = await toPng(element);
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "page-screenshot.png";
      link.click();
    } catch (error) {
      console.error("Failed to capture screenshot", error);
    }
  };

  // Function to handle the search logic here
  const onSubmitHandler = async () => {
    // Handle the search logic here
    console.log("Searching for:", inputQuery);
    setIsLoading(true);
    try {
      const response = await fetch("/api/research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: inputQuery }),
      });
      const { data } = await response.json();
      setData(data);
      setChartsArray(data.chartsArray);
      console.log(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="z-10 fixed bottom-4 right-4 flex flex-row-reverse items-end gap-4 bg-background/95 rounded-md p-1 pl-2">
        <Button className="" size={"icon"} onClick={handleDownloadImage}>
          <Download />
        </Button>
        {true ? (
          <div className="flex items-center gap-2 mb-2 text-muted-foreground text-sm">
            {isLoading && <Target className="animate-ping"/>}
            <p>Research{isLoading&&"ing"}: "{inputQuery}"</p>
            <p>
              ({Math.floor(timer / (60 * 1))} min {(timer / 1) % 60} sec)
            </p>
          </div>
        ) : null}
      </div>
      <div id="capture" className="bg-background p-8 flex flex-col gap-4">
        <div className="flex gap-2 transition-all">
          <Input
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Search for research"
          />
          <Button disabled={isLoading} onClick={onSubmitHandler}>
            {isLoading ? "Loading..." : "Search"}
          </Button>
        </div>
        <div className="gap-4 grid grid-cols-12">
          {chartsArray.map((chart, idx) => {
            return <DynamicChart key={idx} data={chart} />;
          })}
        </div>
        {data && (
          <p className="leading-none text-muted-foreground text-sm">
            {(data as any).otherResearchFindings}
            <br />
            <br />
            Disclaimer: Please fact-check the information before using it or
            sharing it widely.
          </p>
        )}
      </div>
    </div>
  );
};

export default ResearchPage;

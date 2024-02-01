import { useCallback, useState } from "react";
import "./App.css";
import { Button } from "@/components/ui/button";
import Clock from "@/components/Clock";
import useLocalStorage from "./hooks/useLocalStorage";

const addClock = (setClocks) => {
  setClocks((prev) => [
    ...prev,
    {
      key: Math.random().toString(36).substring(7),
      title: "Add Title",
      desc: "Add Description",
      seconds: 0,
      minutes: 0,
      hours: 0,
      startTime: -1,
      isClockTicking: false,
      createdAt: -1,
    },
  ]);
};

function App() {
  const [clocks, setClocks] = useLocalStorage("clocks2", [
    {
      key: Math.random(),
      title: "Add Title",
      desc: "Add Description",
      seconds: 0,
      minutes: 0,
      hours: 0,
      startTime: -1,
      isClockTicking: false,
      createdAt: -1,
    },
  ]);
  const updateClock = useCallback((index, newClockData) => {
    setClocks((prevClocks) =>
      prevClocks.map((clock, i) =>
        i === index ? { ...clock, ...newClockData } : clock
      )
    );
  }, []);

  return (
    <div className="">
      <div className={`flex items-center flex-col mt-24 mb-24 clock  `}>
        {clocks?.map((val, i) => (
          <Clock
            {...val}
            key={val.key}
            index={i}
            updateClock={updateClock}
            setClocks={setClocks}
          />
        ))}

        <Button
          className="mt-7"
          variant="outline"
          key={"klasdfjlljlkkjasdlsadfasdsfkfhasodnkaljkff"}
          onClick={() => {
            addClock(setClocks);
          }}
        >
          ADD +
        </Button>
      </div>
    </div>
  );
}

export default App;

import React, { useEffect, useLayoutEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { closeIcon, pauseIcon, playIcon, resetIcon } from "@/assets";

const Clock = ({
  title,
  desc,
  minutes,
  seconds,
  hours,
  index,
  updateClock,
  isClockTicking,
  startTime,
  setClocks,
  createdAt,
}) => {
  const [isTitleEditing, setIsTitleEditing] = useState(false);
  const [isDescEditing, setIsDescEditing] = useState(false);
  const [removeClock, setRemoveClock] = useState(false);
  const [addClock, setAddClock] = useState(true);
  const startStopTimer = () => {
    if (!isClockTicking) {
      updateClock(index, { startTime: Date.now(), isClockTicking: true });
      if (createdAt === -1)
        updateClock(index, { createdAt: new Date().toString() });
    } else updateClock(index, { isClockTicking: false });
  };

  const resetTimer = () => {
    updateClock(index, { seconds: 0, minutes: 0, hours: 0 });
  };

  useEffect(() => {
    let interval = null;

    if (isClockTicking) {
      interval = setInterval(() => {
        if (seconds < 59) {
          updateClock(index, { seconds: seconds + 1, startTime: Date.now() });
        } else if (seconds === 59 && minutes < 59) {
          updateClock(index, {
            seconds: 0,
            minutes: minutes + 1,
            startTime: Date.now(),
          });
        } else if (minutes === 59 && hours < 23) {
          updateClock(index, {
            seconds: 0,
            minutes: 0,
            hours: hours + 1,
            startTime: Date.now(),
          });
        } else if (hours === 23 && minutes === 59 && seconds === 59) {
          updateClock(index, {
            seconds: 0,
            minutes: 0,
            hours: 0,
            startTime: Date.now(),
          });
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isClockTicking, seconds, minutes, hours]);
  useLayoutEffect(() => {
    if (isClockTicking) {
      const difference = Date.now() - startTime;
      const totalSeconds = Math.floor(difference / 1000) + seconds;
      const diffSeconds = totalSeconds % 60;
      // Convert difference from milliseconds to minutes
      const totalMinutes = Math.floor(totalSeconds / 60) + minutes;
      const diffMinutes = totalMinutes % 60;
      // Convert difference from milliseconds to hours
      const diffHours = Math.floor(totalMinutes / 60) + hours;
      updateClock(index, {
        minutes: diffMinutes,
        seconds: diffSeconds,
        hours: diffHours,
      });
    }
  }, []);
  useEffect(() => {
    setAddClock(false);
  }, []);
  return (
    <div
      className={`w-[80%] relative sm:w-[90%] mb-5 max-w-[1400px] transition duration-1000 ${
        removeClock && "opacity-0 scale-0"
      }  ${addClock && "opacity-0 scale-0"}`}
    >
      <div
        style={{
          boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.26)",
          borderRadius: "10px",
        }}
      >
        <div
          className="border-gray-800  flex flex-row justify-center p-10 gap-2 md:flex-col"
          style={{ boxShadow: "0 0 5px #aaa inset", borderRadius: "10px" }}
        >
          {createdAt != -1 && (
            <Badge className={"absolute top-2 left-2"}>
              {createdAt.toString().slice(4, 15) +
                " : " +
                createdAt.toString().slice(15, 21)}
            </Badge>
          )}
          <div className="grow">
            <h1 className="text-9xl md:text-8xl sm:text-7xl xs:text-5xl text-center ">
              {hours < 10 ? "0" + hours : hours}:
              {minutes < 10 ? "0" + minutes : minutes}:
              {seconds < 10 ? "0" + seconds : seconds}
            </h1>
            <div className="flex justify-center gap-7 pt-5">
              <Button onClick={startStopTimer} variant="outline">
                <img
                  src={isClockTicking ? pauseIcon : playIcon}
                  alt="play pause button"
                  width={24}
                />
              </Button>
              <Button
                disabled={isClockTicking}
                onClick={resetTimer}
                variant="outline"
              >
                <img src={resetIcon} width={24} alt="reset button " />
              </Button>
            </div>
          </div>
          <div className="w-[40%] flex flex-col md:w-[100%] md:mt-5">
            <Button
              variant="ghost"
              className="absolute right-1 top-1"
              onClick={() => {
                setRemoveClock(true);
                setTimeout(
                  () => setClocks((prev) => prev.filter((_, i) => i !== index)),
                  500
                );
              }}
            >
              <img src={closeIcon} alt="" width={20} />
            </Button>
            {isTitleEditing ? (
              <Input
                autofocus={true}
                type="text"
                className="text-3xl font-semibold"
                value={title}
                onChange={(e) => {
                  updateClock(index, { title: e.target.value });
                }}
                onBlur={() => {
                  setIsTitleEditing(false);
                }}
              />
            ) : (
              <h1
                className="text-3xl font-semibold"
                onClick={() => {
                  setIsTitleEditing(true);
                }}
              >
                {title || "Add Title"}
              </h1>
            )}

            {isDescEditing ? (
              <Textarea
                autofocus={true}
                type="text"
                className="text-xl font-thin h-max"
                value={desc}
                rows="5"
                onChange={(e) => {
                  updateClock(index, { desc: e.target.value });
                }}
                onBlur={() => {
                  setIsDescEditing(false);
                }}
              />
            ) : (
              <p
                className="text-xl font-thin"
                onClick={() => {
                  setIsDescEditing(true);
                }}
              >
                {desc || "Add Description"}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Clock);

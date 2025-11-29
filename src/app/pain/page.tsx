"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";

interface Exercise {
  name: string;
  reps: string;
}

// Each day's log is a record of exercise name -> completion boolean
type DayLog = Record<string, boolean>;

// All logs: date string -> DayLog
type Logs = Record<string, DayLog>;

// 30-day plan (simplified example)
const exercises: Exercise[] = [
  { name: "Push-ups", reps: "15-25" },
  { name: "Squats", reps: "20-30" },
  { name: "Plank", reps: "40-60 sec" },
  { name: "Glute bridges", reps: "15-25" },
  { name: "Lunges", reps: "10 per leg" },
];

export default function PainAndGains() {
  const today = format(new Date(), "yyyy-MM-dd");
  const [dayLogs, setDayLogs] = useState<Logs>({});

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("painAndGainsLogs");
    if (stored) {
      try {
        const parsed: Logs = JSON.parse(stored);
        setDayLogs(parsed);
      } catch {
        console.error("Failed to parse saved logs");
      }
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("painAndGainsLogs", JSON.stringify(dayLogs));
  }, [dayLogs]);

  const toggleExercise = (exerciseName: string) => {
    setDayLogs(prev => ({
      ...prev,
      [today]: {
        ...prev[today],
        [exerciseName]: !prev[today]?.[exerciseName],
      },
    }));
  };

  const renderTodayChecklist = () => (
    <Card className="p-4 mb-6 font-mono">
      <h2 className="text-xl font-bold mb-2">📅 {format(new Date(), "MMM dd, yyyy")}</h2>
      {exercises.map(ex => (
        <div key={ex.name} className="flex items-center mb-2">
          <Checkbox
            checked={dayLogs[today]?.[ex.name] ?? false}
            onCheckedChange={() => toggleExercise(ex.name)}
          />
          <span className="ml-2">
            {ex.name}: {ex.reps}{" "}
            <span className="text-sm text-gray-500 truncate">
              {dayLogs[today]?.[ex.name] ? "💪 You beast" : "😬 Weakling detected"}
            </span>
          </span>
        </div>
      ))}
    </Card>
  );

  const renderPastDays = () => {
    const pastDays = Object.keys(dayLogs)
      .filter(date => date !== today)
      .sort((a, b) => (a > b ? -1 : 1));

    if (!pastDays.length) return <p>No days recorded yet. Time to start suffering!</p>;

    return pastDays.map(date => {
      const completedCount = Object.values(dayLogs[date]).filter(Boolean).length;
      const totalCount = exercises.length;
      const status =
        completedCount === totalCount
          ? "🔥 Total beast mode"
          : completedCount > 0
          ? "😏 Partial warrior"
          : "💀 Epic fail";

      return (
        <Card key={date} className="p-3 mb-2">
          <strong>{format(new Date(date), "MMM dd, yyyy")}</strong>: {status} ({completedCount}/{totalCount})
        </Card>
      );
    });
  };

  return (
    <div className="max-w-md mx-auto p-4 font-mono">
      <h1 className="text-2xl font-extrabold mb-4">Pain & Gains 💀💪</h1>
      {renderTodayChecklist()}
      <h3 className="text-lg font-semibold mb-2">Past Days</h3>
      {renderPastDays()}
    </div>
  );
}

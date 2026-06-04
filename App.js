import { useState } from "react";

import AlertsScreen from "./src/screens/AlertsScreen";
import DashboardScreen from "./src/screens/DashboardScreen";
import HistoryScreen from "./src/screens/HistoryScreen";
import LoginScreen from "./src/screens/LoginScreen";
import ManualMeasurementScreen from "./src/screens/ManualMeasurementScreen";
import SOSScreen from "./src/screens/SOSScreen";
import TasksScreen from "./src/screens/TasksScreen";

export default function App() {
  const [screen, setScreen] = useState("Login");

  const [manualValues, setManualValues] = useState([
    {
      id: 1,
      type: "Puls",
      value: "72",
      unit: "BPM",
      time: "08:00",
    },
    {
      id: 2,
      type: "Temperatură",
      value: "36.7",
      unit: "°C",
      time: "09:00",
    },
  ]);

  const [tasks, setTasks] = useState([
    { id: 1, text: "Administrare medicație dimineață", done: false },
    { id: 2, text: "Plimbare 10 minute", done: false },
    { id: 3, text: "Verificare glicemie", done: false },
    { id: 4, text: "Măsurare tensiune arterială", done: false },
  ]);

  const navigation = {
    navigate: (screenName) => {
      setScreen(screenName);
    },
  };

  const addManualValue = (newValue) => {
    setManualValues((prevValues) => [
      {
        id: Date.now(),
        ...newValue,
      },
      ...prevValues,
    ]);
  };

  const toggleTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, done: !task.done } : task,
      ),
    );
  };

  if (screen === "Login") {
    return <LoginScreen navigation={navigation} />;
  }

  if (screen === "Dashboard") {
    return (
      <DashboardScreen
        navigation={navigation}
        tasks={tasks}
        manualValues={manualValues}
      />
    );
  }

  if (screen === "ManualMeasurement") {
    return (
      <ManualMeasurementScreen
        navigation={navigation}
        addManualValue={addManualValue}
      />
    );
  }

  if (screen === "Alerts") {
    return <AlertsScreen navigation={navigation} />;
  }

  if (screen === "Tasks") {
    return (
      <TasksScreen
        navigation={navigation}
        tasks={tasks}
        toggleTask={toggleTask}
      />
    );
  }

  if (screen === "History") {
    return (
      <HistoryScreen navigation={navigation} manualValues={manualValues} />
    );
  }

  if (screen === "SOS") {
    return <SOSScreen navigation={navigation} />;
  }

  return <LoginScreen navigation={navigation} />;
}

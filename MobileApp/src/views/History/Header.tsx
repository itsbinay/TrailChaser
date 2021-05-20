import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated";
import { ReText, Vector, round, parse } from "react-native-redash";

// import { graphs, SIZE, GraphIndex } from "./Model";

import * as shape from "d3-shape";
import { scaleLinear } from "d3-scale";

import data from "./data.json";


export const SIZE = Dimensions.get("window").width;

type DistanceList = [string, number][];

interface DataPoints {
  percent_change: number;
  distances: DistanceList;
}

interface Distances {
  hour: DataPoints;
  day: DataPoints;
  week: DataPoints;
  month: DataPoints;
  year: DataPoints;
  all: DataPoints;
}

const values = data.data.distances as Distances;
const POINTS = 60;

const buildGraph = (datapoints: DataPoints, label: string) => {
  const distanceList = datapoints.distances.slice(0, POINTS);
  const formattedValues = distanceList.map(
    (distance) => [parseFloat(distance[0]), distance[1]] as [number, number]
  );
  const distances = formattedValues.map((value) => value[0]);
  const dates = formattedValues.map((value) => value[1]);
  const scaleX = scaleLinear()
    .domain([Math.min(...dates), Math.max(...dates)])
    .range([0, SIZE]);
  const minDistance = Math.min(...distances);
  const maxDistance = Math.max(...distances);
  const scaleY = scaleLinear().domain([minDistance, maxDistance]).range([SIZE, 0]);
  return {
    label,
    minDistance,
    maxDistance,
    percentChange: datapoints.percent_change,
    path: parse(
      shape
        .line()
        .x(([, x]) => scaleX(x) as number)
        .y(([y]) => scaleY(y) as number)
        .curve(shape.curveBasis)(formattedValues) as string
    ),
  };
};

export const graphs = [
  {
    label: "1H",
    value: 0,
    data: buildGraph(values.hour, "Last Hour"),
  },
  {
    label: "1D",
    value: 1,
    data: buildGraph(values.day, "Today"),
  },
  {
    label: "1M",
    value: 2,
    data: buildGraph(values.month, "Last Month"),
  },
  {
    label: "1Y",
    value: 3,
    data: buildGraph(values.year, "This Year"),
  },
  {
    label: "all",
    value: 4,
    data: buildGraph(values.all, "All time"),
  },
] as const;

export type GraphIndex = 0 | 1 | 2 | 3 | 4;


const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  values: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  value: {
    fontWeight: "100",
    fontSize: 34,
    textAlign: 'left'
  },
  label: {
    fontSize: 18,
  },
  label2: {
    fontSize: 18,
    textAlign: 'right'
  },
});

interface HeaderProps {
  translation: Vector<Animated.SharedValue<number>>;
  index: Animated.SharedValue<GraphIndex>;
}

const Header = ({ translation, index }: HeaderProps) => {
  const data = useDerivedValue(() => graphs[index.value].data);
  console.log(data)
  console.log(data.value)
  const distance = useDerivedValue(() => {
    const p = interpolate(
      translation.y.value,
      [0, SIZE],
      [data.value.maxDistance, data.value.minDistance]
    );
    return `${round(p, 2)} m`;
  });
  const percentChange = useDerivedValue(
    () => `${round(data.value.percentChange, 3)}%`
  );
  const label = useDerivedValue(() => data.value.label);
  const styled = useAnimatedStyle(() => ({
    fontWeight: "500",
    fontSize: 34,
    textAlign: 'right',
    color: data.value.percentChange > 0 ? "green" : "black",
    marginBottom: "-10%"
  }));
  return (
    <View style={styles.container}>
      {/* <ETH /> */}
      <View style={styles.values}>
        <View>
          <ReText style={styles.value} text={distance} />
          <Text style={styles.label}>Travelled Distance:</Text>
        </View>
        <View>
          <ReText style={styled} text={percentChange} />
          <ReText style={styles.label2} text={label} />
        </View>
      </View>
    </View>
  );
};

export default Header;
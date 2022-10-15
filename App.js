import { useState } from "react";
import { Button, FlatList, StyleSheet, TextInput, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
	const [courseGoals, setCourseGoals] = useState([]);
	const [modalIsVisible, setModalIsVisible] = useState(false);

	function startAddGoalHandler() {
		setModalIsVisible(true);
	}

	function endAddGoalHandler() {
		setModalIsVisible(false);
	}

	function addGoalHandler(enteredGoalText) {
		setCourseGoals((currentCourseGoals) => [
			...currentCourseGoals,
			{ text: enteredGoalText, id: Math.random().toString() },
		]);
	}

	function deleteGoalHandler(id) {
		setCourseGoals((currentCourseGoals) => {
			return courseGoals.filter((goal) => goal.id !== id);
			//filter keeps goal if returned true
		});
		endAddGoalHandler();
	}

	return (
		<>
			<StatusBar style="light" />
			<View style={styles.appContainer}>
				<Button
					title="Add New Goal"
					onPress={startAddGoalHandler}
					color="#5e0acc"
				/>
				{modalIsVisible && (
					<GoalInput
						onAddGoal={addGoalHandler}
						visible={modalIsVisible}
						onCancel={endAddGoalHandler}
					/>
				)}
				<View style={styles.goalsContainer}>
					{/* because of FlatList we don't need to map the array */}
					<FlatList
						data={courseGoals}
						renderItem={(itemData) => {
							return (
								<GoalItem
									text={itemData.item.text}
									id={itemData.item.id}
									onDeleteItem={deleteGoalHandler}
								/>
							);
						}}
					/>
				</View>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	appContainer: {
		flex: 1,
		paddingTop: 50,
		paddingHorizontal: 16,
		backgroundColor: "#1e085a",
	},

	goalsContainer: {
		flex: 5,
	},
});

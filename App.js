import { useState, useEffect } from "react";
import { StyleSheet, View, Text, Dimensions, Button } from "react-native";
import { Camera } from "expo-camera";

export default function App() {
	const [permissions, setpermissions] = useState(null);
	const [typeCamera, settypeCamera] = useState(Camera.Constants.Type.back);

	const getPermissions = async () => {
		const { status } = await Camera.requestCameraPermissionsAsync();
		setpermissions(status === "granted");
		console.log(status);
	};

	useEffect(() => {
		getPermissions();
	}, []);

	if (permissions === null)
		return (
			<View>
				<Text>Waiting for permissions...</Text>
			</View>
		);

	if (permissions === false)
		return (
			<View>
				<Text>You dont have access to camera</Text>
			</View>
		);

	return (
		<View style={styles.container}>
			<Camera style={styles.camera} type={typeCamera}></Camera>
			<Button
				title='Change'
				onPress={() =>
					settypeCamera(
						typeCamera === Camera.Constants.Type.back
							? Camera.Constants.Type.front
							: Camera.Constants.Type.back
					)
				}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	camera: {
		height: Dimensions.get("window").height - 200 ,
		width: Dimensions.get("window").width,
	},
});

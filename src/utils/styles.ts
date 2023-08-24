import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  containerEven: {
    // flex: 1,
    flexDirection: 'row',
    // justifyContent: 'center',
    justifyContent: 'space-evenly'
  },
  container: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
    // justifyContent: 'flex-start'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
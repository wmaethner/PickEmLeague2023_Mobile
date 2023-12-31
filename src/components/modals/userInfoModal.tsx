import { Text } from "react-native";
import { UserSchema } from "../../apis";
import { styles } from "../../utils/styles";
import ModalWrapper from "./modalWrapper";

export interface UserInfoModalProps {
  open: boolean;
  close: () => void;
  user: UserSchema;
}

export default function UserInfoModal(props: UserInfoModalProps) {
  return (
    <ModalWrapper
      open={props.open}
      close={props.close}
      title={props.user.username}
    >
      {
        props.user &&
        <>
          <Text style={styles.text}>Name: {props.user.firstName} {props.user.lastName}</Text>
        </>
      }
    </ModalWrapper>
  )
}
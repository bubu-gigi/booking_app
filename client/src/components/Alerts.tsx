import "bootstrap/dist/css/bootstrap.min.css";
import { Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { setRedirectTrue } from "../redux/slices/redirectSlice";
import { setShowEmailFalse, setShowPasswordFalse, setShowTopFalse, setShowUsernameFalse } from "../redux/slices/alertSlice";

//@ts-ignore
export default function Alerts({state, payload}) {

  const dispatch = useDispatch<AppDispatch>();
  const alertTopState = useSelector((state: RootState) => state.alert.showTop);
  const alertUsernameState = useSelector((state: RootState) => state.alert.showUsername);
  const alertEmailState = useSelector((state: RootState) => state.alert.showEmail);
  const alertPasswordState = useSelector((state: RootState) => state.alert.showPassword);


  if(alertTopState && state == "success") {
    setTimeout(() => {
      dispatch(setRedirectTrue());
      dispatch(setShowTopFalse());
    }, 1500);
  }

  if(alertTopState && state == "danger") {
    setTimeout(() => {
      dispatch(setShowTopFalse());
    }, 1500);
  }

  if(alertUsernameState) {
    setTimeout(() => {
      dispatch(setShowUsernameFalse());
    }, 1500);
  }

  if(alertEmailState) {
    setTimeout(() => {
      dispatch(setShowEmailFalse());
    }, 1500);
  }

  if(alertPasswordState) {
    setTimeout(() => {
      dispatch(setShowPasswordFalse());
    }, 1500);
  }

  if(state == "success") {
    return(
      <>
        <Alert show={alertTopState} className="position-fixed mt-[5px] w-[96%]" variant="success">
          <p className="justify-center text-lg font-sans font-thin tracking-tighter text-center text-">{payload}</p>
        </Alert>
      </>
    );
  }

  if(state == "danger") {
    return(
      <>
        <Alert show={alertTopState} className="position-fixed mt-[5px] w-[96%] text-center" variant="danger" >
          <p className="pb-1">
            {payload}
          </p>
        </Alert>
      </>
    );
  }

  if(state == "form") {
    return (
      <Alert show={alertEmailState || alertPasswordState || alertUsernameState} className="border max-w-[500px] my-1 py-2 px-3 rounded-2xl" variant="warning">
        <h1>{payload}</h1>
      </Alert>
    );
  }

}

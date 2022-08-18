import React, {useState} from "react";
// import { Redirect} from "react-router-dom";
import MemberLayout from '../layouts/member/MemberLayout';
import Loading from '../shared/loading/Loading';
import Alert from "../shared/alert/Alert";

export default (props) => {

    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState(false)

    // TODO: پس از اتمام storage =>
    // اگر لوگین بود به فحه ی لوگین و ثبت نام دسترسی نداشته باشد
    // redirect to home

    return (
        <div>
            {loading && <Loading/>}
            <MemberLayout {...props}>
                {!!alert && <Alert {...alert} removeAlert={() => setAlert(false)}/>}
                <props.Component loading = {state => setLoading(!!state)} alert={props => setAlert(props)}/>
            </MemberLayout>
        </div>
    )
}
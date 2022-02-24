import { useState } from "react";
import { useHistory } from "react-router-dom";
import { GET, POST, UPDATE } from "../../../providers/useAxiosQuery";

export default function PageUserForm(props) {
    const { location } = props;

    const user_id = location.state ? location.state.id : "";

    const history = useHistory();
    const [selectedData, setSelectedData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [errMessage, setErrMessage] = useState({
        type: "",
        message: "",
    });

    console.log("user_id", user_id);
    if (user_id) {
        GET(`api/user/${user_id}`, "users_info", (res) => {
            console.log("res", res);
            setSelectedData({ ...res.data, password: "" });
        });
    }

    /** for create */
    const { mutate: mutateCreateUser, isLoading: isLoadingCreateUser } = POST(
        "api/user",
        "users_create"
    );

    /** for update */
    const { mutate: mutateUpdateUser, isLoading: isLoadingUpdateUser } = UPDATE(
        "api/user",
        "users_update"
    );

    const handleFormSubmit = (e) => {
        e.preventDefault();
        let data = { ...selectedData, id: user_id };
        if (!user_id) {
            mutateCreateUser(data, {
                onSuccess: (res) => {
                    if (res.success) {
                        setSelectedData({
                            name: "",
                            email: "",
                            password: "",
                        });
                    }

                    setErrMessage({
                        type: res.success ? "success" : "danger",
                        message: res.message,
                    });
                },
                onError: (err) => {
                    let errors = err.response.data.errors;
                    console.log("errors", errors);
                    if (errors) {
                        let fieldnames = Object.keys(errors);
                        Object.values(errors).map((messages, index) => {
                            let fieldname = fieldnames[index].split("_");
                            fieldname.map((string, key) => {
                                fieldname[key] = capitalize(string);
                                return "";
                            });
                            fieldname = fieldname.join(" ");
                            setErrMessage({
                                type: "danger",
                                message:
                                    fieldname + " - " + messages.join("\n\r"),
                            });
                            return "";
                        });
                    }
                },
            });
        } else {
            mutateUpdateUser(data, {
                onSuccess: (res) => {
                    if (res.success) {
                        setSelectedData({
                            name: "",
                            email: "",
                            password: "",
                        });
                    }

                    setErrMessage({
                        type: res.success ? "success" : "danger",
                        message: res.message,
                    });
                },
                onError: (err) => {
                    let errors = err.response.data.errors;
                    console.log("errors", errors);
                    if (errors) {
                        let fieldnames = Object.keys(errors);
                        Object.values(errors).map((messages, index) => {
                            let fieldname = fieldnames[index].split("_");
                            fieldname.map((string, key) => {
                                fieldname[key] = capitalize(string);
                                return "";
                            });
                            fieldname = fieldname.join(" ");
                            setErrMessage({
                                type: "danger",
                                message:
                                    fieldname + " - " + messages.join("\n\r"),
                            });
                            return "";
                        });
                    }
                },
            });
        }

        console.log("errMessage", errMessage);
    };

    return (
        <div className="ibox ">
            <div className="ibox-title">
                <h5>User Form</h5>
                <div className="ibox-tools">
                    <button
                        className="btn btn-sm btn-primary"
                        onClick={() => history.push("/user")}
                    >
                        <strong>Back to list</strong>
                    </button>
                </div>
            </div>
            <div className="ibox-content">
                <form role="form" onSubmit={handleFormSubmit}>
                    {errMessage.message !== "" && (
                        <div className={`alert alert-${errMessage.type}`}>
                            {errMessage.message}
                        </div>
                    )}

                    <div className="form-group row">
                        <label className="col-lg-2 col-form-label">Name</label>{" "}
                        <div className="col-lg-10">
                            <input
                                type="text"
                                placeholder="Enter name"
                                className="form-control"
                                value={selectedData.name}
                                onChange={(e) =>
                                    setSelectedData({
                                        ...selectedData,
                                        name: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-lg-2 col-form-label">Email</label>{" "}
                        <div className="col-lg-10">
                            <input
                                type="email"
                                placeholder="Enter email"
                                className="form-control"
                                value={selectedData.email}
                                onChange={(e) =>
                                    setSelectedData({
                                        ...selectedData,
                                        email: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-lg-2 col-form-label">
                            Password
                        </label>{" "}
                        <div className="col-lg-10">
                            <input
                                type="password"
                                placeholder="Password"
                                className="form-control"
                                value={selectedData.password}
                                required={user_id ? false : true}
                                onChange={(e) =>
                                    setSelectedData({
                                        ...selectedData,
                                        password: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-lg-offset-2 col-lg-10">
                            <button
                                className="btn btn-sm btn-primary m-t-n-xs"
                                type="submit"
                                disabled={isLoadingCreateUser}
                            >
                                <strong>SUBMIT</strong>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

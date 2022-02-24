import { useState } from "react";
import { useHistory } from "react-router-dom";
import { DELETE, GET } from "../../../providers/useAxiosQuery";

export default function PageUser() {
    const history = useHistory();

    const [errMessage, setErrMessage] = useState({
        type: "",
        message: "",
    });

    /** for table */
    const { data: dataUsers, refetch: refetchUsers } = GET(
        `api/user`,
        "users_table"
    );

    /** for delete */
    const { mutate: mutateDeleteUser, isLoading: isLoadingDeleteUser } = DELETE(
        "api/user",
        "users_delete"
    );

    const handleDelete = (record) => {
        console.log("handleDelete", record);
        mutateDeleteUser(record, {
            onSuccess: (res) => {
                if (res.success) {
                    refetchUsers();
                }

                setErrMessage({
                    type: res.success ? "success" : "danger",
                    message: res.message,
                });
            },
            onError: (err) => {
                notificationErrors(err);
            },
        });
    };

    return (
        <div className="ibox ">
            <div className="ibox-title">
                <h5>User List</h5>
                <div className="ibox-tools">
                    <button
                        className="btn btn-sm btn-primary"
                        onClick={() => history.push("/user/form")}
                    >
                        <strong>Add User</strong>
                    </button>
                </div>
            </div>
            <div className="ibox-content">
                {errMessage.message !== "" && (
                    <div
                        className={`alert alert-dismissable alert-${errMessage.type}`}
                    >
                        <button
                            aria-hidden="true"
                            data-dismiss="alert"
                            className="close"
                            type="button"
                        >
                            ×
                        </button>
                        {errMessage.message}
                    </div>
                )}

                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataUsers ? (
                            dataUsers.data.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td className="text-center">
                                            <button
                                                className="btn btn-sm btn-primary m-r-sm"
                                                onClick={() =>
                                                    history.push({
                                                        pathname: "/user/form",
                                                        state: { id: item.id },
                                                    })
                                                }
                                            >
                                                <strong>Edit</strong>
                                            </button>

                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() =>
                                                    handleDelete(item)
                                                }
                                            >
                                                <strong>Delete</strong>
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td className="text-center" colSpan={3}>
                                    No Data
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

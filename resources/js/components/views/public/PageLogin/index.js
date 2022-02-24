import { useEffect, useState } from "react";
import { POST } from "../../../providers/useAxiosQuery";
import companyInfo from "../../../providers/companyInfo";

const encryptor = companyInfo().encryptor;
const appName = companyInfo().appName;
const appDescription = companyInfo().appDescription;
const date = companyInfo().date;

export default function PageLogin() {
    const [errorMessage, setErrorMessage] = useState("");
    const [loginData, setLoginData] = useState({ email: "", password: "" });

    const { mutate: mutateLogin, isLoading: isLoadingLogin } =
        POST("api/login");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("handleSubmit");

        if (loginData.email !== "" && loginData.password !== "") {
            mutateLogin(loginData, {
                onSuccess: (res) => {
                    if (res.token) {
                        const userdata = { token: res.token, data: res.data };

                        localStorage.userdata = encryptor.encrypt(userdata);
                        window.location.reload();
                    }
                },
            });
        } else {
            setErrorMessage("Username or Password could not be empty!");
        }
    };

    useEffect(() => {
        document.body.className = "gray-bg";
    }, []);

    return (
        <div className="loginColumns animated fadeInDown">
            <div className="row">
                <div className="col-md-6">
                    <h2 className="font-bold">Welcome to {appName}</h2>

                    <p>{appDescription}</p>
                </div>
                <div className="col-md-6">
                    <div className="ibox-content">
                        <form
                            className="m-t"
                            role="form"
                            onSubmit={handleSubmit}
                        >
                            {errorMessage && (
                                <div className="alert alert-success">
                                    {errorMessage}
                                </div>
                            )}

                            <div className="form-group">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Username"
                                    required
                                    onChange={(e) =>
                                        setLoginData({
                                            ...loginData,
                                            email: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Password"
                                    required
                                    onChange={(e) =>
                                        setLoginData({
                                            ...loginData,
                                            password: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary block full-width m-b"
                                disabled={isLoadingLogin}
                            >
                                Login
                            </button>

                            <a href="#">
                                <small>Forgot password?</small>
                            </a>
                        </form>
                        <p className="m-t">
                            <small>
                                {appName}
                                &copy; {date.getFullYear()}
                            </small>
                        </p>
                    </div>
                </div>
            </div>
            <hr />
            <div className="row">
                <div className="col-md-6">Copyright {appName}</div>
                <div className="col-md-6 text-right">
                    <small>© {date.getFullYear()}</small>
                </div>
            </div>
        </div>
    );
}

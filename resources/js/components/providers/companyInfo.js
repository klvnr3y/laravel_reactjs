import logo from "../assets/img/logo.jpg";

const date = new Date();
const key = `Laravel-ReactJs-${date.getFullYear()}`;
const encryptor = require("simple-encryptor")(key);
const apiUrl = `${window.location.origin}/`;
const apiKey = false;

const token = () => {
    if (encryptor.decrypt(localStorage.userdata) === null) {
        localStorage.userdata = "";
        return apiKey;
    }
    return "Bearer " + encryptor.decrypt(localStorage.userdata).token;
};

const userData = () => {
    if (encryptor.decrypt(localStorage.userdata) === null) {
        localStorage.userdata = "";
        return false;
    }
    return encryptor.decrypt(localStorage.userdata).data;
};

export default function companyInfo() {
    return {
        date,
        key,
        apiUrl,
        apiKey,
        appName: "Laravel ReactJs",
        appDescription: "Laravel ReactJs Tutorial",
        appLogo: logo,
        encryptor,
        token: token(),
        userData: userData(),
    };
}

import Footer from "./Footer";
import Header from "./Header";
import Sidemenu from "./Sidemenu";

export default function Private(props) {
    return (
        <div id="wrapper">
            <Sidemenu />

            <div id="page-wrapper" className="gray-bg">
                <Header />

                <div className="wrapper wrapper-content animated fadeInRight">
                    {props.children}
                </div>

                <Footer />
            </div>
        </div>
    );
}

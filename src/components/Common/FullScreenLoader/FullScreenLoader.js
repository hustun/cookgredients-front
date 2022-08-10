import Loader from "../Loader/Loader";

function FullScreenLoader() {
    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            <Loader />
            <div>Coming Soon!..</div>
        </div>
    );
}

export default FullScreenLoader;
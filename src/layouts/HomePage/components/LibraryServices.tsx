import { useOktaAuth } from "@okta/okta-react";
import { Link } from "react-router-dom";

export const LibraryServices = () => {

    const { authState } = useOktaAuth();

    return (
        <div className='container my-5'>
            <div className='row p-4 align-items-center border shadow-lg'>
                <div className='col-lg-7 p-3'>
                    <h1 className='display-4 fw-bold'>
                        探してる本がないですか？
                    </h1>
                    <p className='lead'>
                        探す本がなければ私たちにメールを送ってください。
                        最善を尽くしてお手伝いいたします!
                    </p>
                    <div className='d-grid gap-2 justify-content-md-start mb-4 mb-lg-3'>
                        {authState?.isAuthenticated ?
                            <Link type='button' className='btn main-color btn-log text-white' to='search'>図書館サービスへ</Link>
                            :
                            <Link className='btn main-color btn-lg text-white' to='/login'>ログイン</Link>
                        }
                    </div>
                </div>
                <div className='col-lg-4 offset-lg-1 shadow-lg lost-image'></div>
            </div>
        </div>
    )
}
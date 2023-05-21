import { useOktaAuth } from "@okta/okta-react";
import { Link } from "react-router-dom";


export const Heroes = () => {

    const { authState } = useOktaAuth();

    return (
        <div>
            <div className='d-none d-lg-block'>
                <div className='row g-0 mt-5'>
                    <div className='col-sm-6 col-md-6'>
                        <div className='col-image-left'></div>
                    </div>
                    <div className='col-4 col-md-4 container d-flex justify-content-center align-items-center'>
                        <div className='ml-2'>
                            <h1>今までどんな本を？</h1>
                            <p className='lead'>
                                ピッソンにあなたが今までどんな本を読んでいたか教えてください。
                                あなたのどこをもっと極めたいですか？
                                最も効率が良い内容を提供致します。
                            </p>
                            {authState?.isAuthenticated ?
                                <Link type='button' className='btn main-color btn-log text-white' 
                                        to='/topbooks'>一番人気の本へ</Link>
                                :
                                <Link className='btn main-color btn-lg text-white' to='/login'>ログイン</Link>
                            }
                        </div>
                    </div>
                </div>
                <div className='row g-0'>
                    <div className='col-4 col-md-4 container d-flex justify-content-center align-items-center'>
                        <div className='ml-2'>
                            <h1>毎月新しい本が！</h1>
                            <p className='lead'>
                                毎週新しい本が登録されます！
                                あなたにいつも一番効率良い情報だけ提供するために毎日頑張ってます。
                                私たちと一緒にもっと体を極めましょう。
                            </p>
                        </div>
                    </div>
                    <div className='col-sm-6 col-md-6'>
                        <div className='col-image-right'>

                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Heroes */}
            <div className='d-lg-none'>
                <div className='container'>
                    <div className='m-2'>
                        <div className='col-image-left'></div>
                        <div className='mt-2'>
                            <h1>今までどんな本を読んでいますか？</h1>
                            <p className='lead'>
                                ピッソンにあなたが今までどんな本を読んでいたか教えてください。
                                あなたのどこをもっと極めたいですか？
                                最も効率が良い内容を提供致します。
                            </p>
                            {authState?.isAuthenticated ?
                                <Link type='button' className='btn main-color btn-log text-white' to='search'>一番人気の本へ</Link>
                                :
                                <Link className='btn main-color btn-lg text-white' to='/login'>ログイン</Link>
                            }
                        </div>
                    </div>
                    <div className='m-2'>
                        <div className='col-image-right'></div>
                        <div className='mt-2'>
                            <h1>毎月新しい本が！</h1>
                            <p className='lead'>
                                毎週新しい本が登録されます！
                                あなたにいつも一番効率良い情報だけ提供するために毎日頑張ってます。
                                私たちと一緒にもっと体を極めましょう。
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
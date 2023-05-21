import { Link, NavLink } from "react-router-dom"

export const ExploreTopBooks = () => {
    return (
        <div className='p-5 mb-4 bg-dark header'>
            <div className='container-fluid py-5 text-white d-flex justify-content-center align-items-center'>
                <div>
                    <h1 className='display-5 fw-bold'>次はどんなトレーニングの本を?</h1>
                    <p className='col-md-8 fs-4'>より機能的な体のために勉強しましょう。</p>
                    <Link type='button' className='btn main-color btn-lg text-white' to='/search'>
                        一番人気の本を探す
                    </Link>
                </div>
            </div>
        </div>
    )
}
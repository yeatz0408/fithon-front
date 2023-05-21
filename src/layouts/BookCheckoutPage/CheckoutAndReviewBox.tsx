import { Link } from "react-router-dom";
import BookModel from "../../models/BookModel";
import { LeaveAReview } from "../utils/LeaveAReview";

export const CheckoutAndReviewBox: React.FC<{
    book: BookModel | undefined,
    mobile: boolean, currentLoansCount: number, isAuthenticated: any, isCheckedOut: boolean,
    checkoutBook: any, isReviewLeft: boolean, submitReview: any
}> = (props) => {

    function buttonRender() {
        if (props.isAuthenticated) {
            if (!props.isCheckedOut && props.currentLoansCount < 5) {
                return (<button onClick={() => props.checkoutBook()} className='btn btn-success btn-lg'>貸与</button>)
            } else if (props.isCheckedOut) {
                return (<p><b>すでに貸与中です。</b></p>)
            } else if (!props.isCheckedOut) {
                return (<p className='text-danger'>貸与限度額を超えました。</p>)
            }
        }
        return (<Link to={`/login`} className='btn btn-success btn-lg'>ログイン</Link>)
    }

    function reviewRender() {
        if (props.isAuthenticated && !props.isReviewLeft) {
            return (
                <p>
                    <LeaveAReview submitReview={props.submitReview}/>
                </p>
            )
        } else if (props.isAuthenticated && props.isReviewLeft) {
            return (<p><b>書かれたレビュー、有難うございます！</b></p>)
        }
        return (<div>
            <hr /><p>ログインしてレビューを書いてください.</p>
        </div>)
    }

    return (
        <div className={props.mobile ? 'card d-flex mt-5' : 'card col-3 container d-flex mb-5'}>
            <div>
                {props.isAuthenticated}
            </div>
            <div className='card-body container'>
                <div className='mt-3'>
                    <p>
                        <b>{props.currentLoansCount}/5</b>
                        貸与中
                    </p>
                    <hr />
                    {props.book && props.book.copiesAvailable && props.book.copiesAvailable > 0 ?
                        <h4 className='text-success'>
                            貸与可能
                        </h4>
                        :
                        <h4 className='text-danger'>
                            控えリスト
                        </h4>
                    }
                    <div className='row'>
                        <p className='col-6 lead'>
                            <b>{props.book?.copies}</b>
                            冊
                        </p>
                        <p className='col-6 lead'>
                            <b>{props.book?.copiesAvailable}</b>
                            貸与可能
                        </p>
                    </div>
                </div>
                {buttonRender()}
                <hr />
                <p className='mt-3'>
                    貸与確定まで利用可能な冊数が変わる場合があります。
                </p>
                {reviewRender()}
            </div>
        </div>
    );
}
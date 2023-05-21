import ShelfCurrentLoans from "../../../models/ShelfCurrentLoans"
import { ReturnBook } from "../../HomePage/components/ReturnBook";

export const LoansModal: React.FC<{ shelfCurrentLoan: ShelfCurrentLoans, mobile: boolean, returnBook: any, renewLoan: any }> = (props) => {
    return (
        <div className='modal fade' id={props.mobile ? `mobilemodal${props.shelfCurrentLoan.book.id}` :
            `modal${props.shelfCurrentLoan.book.id}`} data-bs-backdrop='static' data-bs-keyboard='false'
            aria-labelledby='staticBackdropLabel' aria-hidden='true' key={props.shelfCurrentLoan.book.id}>
            <div className='modal-dialog'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h5 className='modal-title' id='staticBackdropLabel'>
                            貸与詳細
                        </h5>
                        <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'>

                        </button>
                    </div>
                    <div className='modal-body'>
                        <div className='container'>
                            <div className='mt-3'>
                                <div className='row'>
                                    <div className='col-2'>
                                        {props.shelfCurrentLoan.book?.img ?
                                            <img src={props.shelfCurrentLoan.book?.img}
                                                width='56' height='87' alt='Book' />
                                            :
                                            <img src={require('./../../../Images/BooksImages/FitnessForDummies.jpg')}
                                                width='56' height='87' alt='Book' />
                                        }
                                    </div>
                                    <div className='col-10'>
                                        <h6>{props.shelfCurrentLoan.book.author}</h6>
                                        <h4>{props.shelfCurrentLoan.book.title}</h4>
                                    </div>
                                </div>
                                <hr />
                                {props.shelfCurrentLoan.daysLeft > 0 &&
                                    <p className='text-secondary'>
                                        {props.shelfCurrentLoan.daysLeft}後返納
                                    </p>
                                }
                                {props.shelfCurrentLoan.daysLeft === 0 &&
                                    <p className='text-success'>
                                        本日まで返納
                                    </p>
                                }
                                {props.shelfCurrentLoan.daysLeft < 0 &&
                                    <p className='text-danger'>
                                        {props.shelfCurrentLoan.daysLeft}延滞中
                                    </p>
                                }
                                <div className='list-group mt-3'>
                                    <button onClick={() => props.returnBook(props.shelfCurrentLoan.book.id)} data-bs-dismiss='modal' className='list-group-item list-group-item-action'
                                        aria-current='true'>
                                        返納する
                                    </button>
                                    <button onClick={props.shelfCurrentLoan.daysLeft < 0 ? (e) => e.preventDefault() 
                                                    :
                                                    () => props.renewLoan(props.shelfCurrentLoan.book.id)} 
                                        data-bs-dismiss='modal'
                                        className={
                                            props.shelfCurrentLoan.daysLeft < 0 ?
                                                'list-group-item list-group-item-action inactiveLink' :
                                                'list-group-item list-group-item-action'}>
                                        {props.shelfCurrentLoan.daysLeft < 0 ? '延滞中の本は延長できません' : '延長する'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='modal-footer'>
                        <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>
                            閉じる
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}
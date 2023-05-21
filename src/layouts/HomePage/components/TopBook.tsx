import { Link } from "react-router-dom";
import BookModel from "../../../models/BookModel";

export const TopBook: React.FC<{ book: BookModel, ranking: number }> = (props) => {
    return (
        <div className='card mt-3 shadow p-3 mb-3 bg-body rounded'>
            <div className='row g-0'>
                <div className='col-1'>
                    <h1>{props.ranking}位:</h1>
                </div>
                <div className='col-md-2'>
                    <div className='d-none d-lg-block'>
                        {props.book.img ?
                            <img src={props.book.img}
                                width='147' height='235' alt='Book' />
                            :
                            <img src={require('../../../Images/BooksImages/FitnessForDummies.jpg')}
                                width='123' height='196' alt='Book' />
                        }
                    </div>
                    <div className='d-lg-none d-flex justify-content-center align-items-center'>
                        {props.book.img ?
                            <img src={props.book.img}
                                width='123' height='196' alt='Book' />
                            :
                            <img src={require('../../../Images/BooksImages/FitnessForDummies.jpg')}
                                width='123' height='196' alt='Book' />
                        }
                    </div>
                </div>
                <div className='col-md-3'>
                    <div className='card-body'>
                        <h5 className='card-title'>
                            {props.book.author}
                        </h5>
                        <h3>
                            {props.book.title}
                        </h3>
                        <br />
                        <br />
                        <br />
                        <br />
                        <Link className='btn btn-md main-color text-white' to={`/checkout/${props.book.id}`}>
                            詳しく見る
                        </Link>
                    </div>
                </div>
                <div className='col-5'>
                    <p className='card-text'>
                        {props.book.description}
                    </p>
                </div>
            </div>
        </div >
    );
}
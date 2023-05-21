import { useOktaAuth } from "@okta/okta-react";
import { useEffect, useState } from "react";
import ShelfCurrentLoans from "../../../models/ShelfCurrentLoans";
import { SpinnerLoading } from "../../utils/SpinnerLoading";
import { Link } from "react-router-dom";
import { LoansModal } from "./LoansModal";

export const Loans = () => {

    const { authState } = useOktaAuth();
    const [httpError, setHttpError] = useState(null);

    // Current Loans
    const [shelfCurrentLoans, setShelfCurrentLoans] = useState<ShelfCurrentLoans[]>([]);
    const [isLoadingUserLoans, setIsLoadingUserLoans] = useState(true);
    const [checkout, setCheckout] = useState(false);

    useEffect(() => {
        const fetchUserCurrentLoans = async () => {
            if (authState && authState.isAuthenticated) {
                const url = `https://fithon.herokuapp.com/api/books/secure/currentloans`;
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                };
                const shelfCurrentLoansResponse = await fetch(url, requestOptions);
                if (!shelfCurrentLoansResponse.ok) {
                    throw new Error('Something went wrong!');
                }
                const shelfCurrentLoansResponseJson = await shelfCurrentLoansResponse.json();
                setShelfCurrentLoans(shelfCurrentLoansResponseJson);
            }
            setIsLoadingUserLoans(false);
        }
        fetchUserCurrentLoans().catch((error: any) => {
            setIsLoadingUserLoans(false);
            setHttpError(error.message);
        })
        window.scrollTo(0, 0);
    }, [authState, checkout]);

    if (isLoadingUserLoans) {
        return (
            <SpinnerLoading />
        )
    }

    if (httpError) {
        return (
            <div className='container m-5'>
                <p>
                    {httpError}
                </p>
            </div>
        )
    }

    async function returnBook(bookId: number) {
        const url = `https://fithon.herokuapp.com/api/books/secure/return/?bookId=${bookId}`;
        const requestOptions = {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json'
            }
        };
        const returnResponse = await fetch(url, requestOptions);
        if (!returnResponse.ok) {
            console.log(returnResponse);
            throw new Error('Something went wrong!');
        }
        setCheckout(!checkout);
    }

    async function renewLoan(bookId: number) {
        const url = `https://fithon.herokuapp.com/api/books/secure/renew/loan/?bookId=${bookId}`;
        const requestOptions = {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': "application/json"
            }
        };

        const returnResponse = await fetch(url, requestOptions);
        if (!returnResponse.ok) {
            throw new Error('Something went wrong!');
        }
        setCheckout(!checkout);
    }

    return (
        <div>
            {/*Desktop*/}
            <div className='d-none d-lg-block mt-2'>
                {shelfCurrentLoans.length > 0 ?
                    <>
                        <h5>現在貸与中:</h5>

                        {shelfCurrentLoans.map(shelfCurrentLoan => (
                            <div key={shelfCurrentLoan.book.id}>
                                <div className='row mt-3 mb-3'>
                                    
                                    <div className='col-2 col-md-2 container'>
                                        {shelfCurrentLoan.book?.img ?
                                            <img src={shelfCurrentLoan.book?.img} width='226' height='349' alt='Book' />
                                            :
                                            <img src={require('./../../../Images/BooksImages/FitnessForDummies.jpg')}
                                                width='226' height='349' alt='Book' />

                                        }
                                    </div>
                                    <div className='col-4 container'>
                                        <h5>{shelfCurrentLoan.book.title}</h5>
                                        <hr/>
                                        <p>{shelfCurrentLoan.book.description}</p>
                                    </div>
                                    <div className='card col-3 col-md-3 container d-flex'>
                                        <div className='card-body'>
                                            <div className='mt-3'>
                                                <h4>貸与詳細</h4>
                                                {shelfCurrentLoan.daysLeft > 0 &&
                                                    <p className='text-secondary'>
                                                        {shelfCurrentLoan.daysLeft}後返納
                                                    </p>
                                                }
                                                {shelfCurrentLoan.daysLeft === 0 &&
                                                    <p className='text-success'>
                                                        本日まで返納
                                                    </p>
                                                }
                                                {shelfCurrentLoan.daysLeft < 0 &&
                                                    <p className='text-danger'>
                                                        {shelfCurrentLoan.daysLeft}延滞中
                                                    </p>
                                                }
                                                <div className='list-group mt-3'>
                                                    <button className='list-group-item list-group-item-action'
                                                        aria-current='true' data-bs-toggle='modal'
                                                        data-bs-target={`#modal${shelfCurrentLoan.book.id}`}>
                                                        貸与管理
                                                    </button>
                                                    <Link to={'search'} className='list-group-item list-group-item-action'>
                                                        他の本を探す
                                                    </Link>
                                                </div>
                                            </div>
                                            <hr />
                                            <p className='mt-3'>
                                                この本のレビューを書いてください！
                                            </p>
                                            <Link className='btn btn-primary mb-3' to={`/checkout/${shelfCurrentLoan.book.id}`}>
                                                レビューを書く
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <hr/>
                                <LoansModal shelfCurrentLoan={shelfCurrentLoan} mobile={false} 
                                            returnBook={returnBook} renewLoan={renewLoan} />
                            </div>
                        ))}
                    </> :
                    <>
                        <h3 className='mt-3'>
                            貸与中の本がございません。
                        </h3>
                        <Link className='btn btn-primary' to={`search`}>
                            新しい本を探す
                        </Link>
                    </>
                }
            </div>

            {/* Mobile*/}
            <div className='container d-lg-none mt-2'>
                {shelfCurrentLoans.length > 0 ?
                    <>
                        <h5 className='mb-3'>現在貸与中:</h5>

                        {shelfCurrentLoans.map(shelfCurrentLoan => (
                            <div key={shelfCurrentLoan.book.id}>
                                
                                    <div className='d-flex justify-content-center align-items-center'>
                                        {shelfCurrentLoan.book?.img ?
                                            <img src={shelfCurrentLoan.book?.img} width='226' height='349' alt='Book' />
                                            :
                                            <img src={require('./../../../Images/BooksImages/FitnessForDummies.jpg')}
                                                width='226' height='349' alt='Book' />

                                        }
                                    </div>
                                    <div>
                                        <h5>{shelfCurrentLoan.book.title}</h5>
                                    </div>
                                    <div className='card d-flex mt-5 mb-3'>
                                        <div className='card-body container'>
                                            <div className='mt-3'>
                                                <h4>貸与詳細</h4>
                                                {shelfCurrentLoan.daysLeft > 0 &&
                                                    <p className='text-secondary'>
                                                        {shelfCurrentLoan.daysLeft}後返納
                                                    </p>
                                                }
                                                {shelfCurrentLoan.daysLeft === 0 &&
                                                    <p className='text-success'>
                                                        本日まで返納
                                                    </p>
                                                }
                                                {shelfCurrentLoan.daysLeft < 0 &&
                                                    <p className='text-danger'>
                                                        {shelfCurrentLoan.daysLeft}延滞中
                                                    </p>
                                                }
                                                <div className='list-group mt-3'>
                                                    <button className='list-group-item list-group-item-action'
                                                        aria-current='true' data-bs-toggle='modal'
                                                        data-bs-target={`#mobilemodal${shelfCurrentLoan.book.id}`}>
                                                        貸与管理
                                                    </button>
                                                    <Link to={'search'} className='list-group-item list-group-item-action'>
                                                        他の本を探す
                                                    </Link>
                                                </div>
                                            </div>
                                            <hr />
                                            <p className='mt-3'>
                                                この本のレビューを書いてください！
                                            </p>
                                            <Link className='btn btn-primary mb-3' to={`/checkout/${shelfCurrentLoan.book.id}`}>
                                                レビューを書く
                                            </Link>
                                        </div>
                                    </div>
                                
                                <hr/>
                                <LoansModal shelfCurrentLoan={shelfCurrentLoan} mobile={true} 
                                        returnBook={returnBook} renewLoan={renewLoan}/>

                            </div>
                        ))}
                    </> :
                    <>
                        <h3 className='mt-3'>
                            貸与中の本がございません。
                        </h3>
                        <Link className='btn btn-primary' to={`search`}>
                            新しい本を探す
                        </Link>
                    </>
                }
            </div>
        </div>
    );
}
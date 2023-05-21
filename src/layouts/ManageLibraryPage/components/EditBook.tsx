import React, { useEffect, useState } from "react";
import BookModel from "../../../models/BookModel";
import { useOktaAuth } from "@okta/okta-react";

export const EditBook: React.FC<{ book: BookModel, deleteBook: any }> = (props, key) => {

    const { authState } = useOktaAuth();
    const [quantity, setQuantity] = useState<number>(0);
    const [remaining, setRemaining] = useState<number>(0);

    useEffect(() => {
        const fetchBookInState = () => {
            props.book.copies ? setQuantity(props.book.copies) : setQuantity(0);
            props.book.copiesAvailable ? setRemaining(props.book.copiesAvailable) : setRemaining(0);
        };
        fetchBookInState();
    }, [])

    async function increaseQuantity() {
        const url = `https://fithon.herokuapp.com/api/admin/secure/increase/book/quantity/?bookId=${props.book?.id}`;
        const requestOptions = {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json'
            }
        };

        const quantityUpdateResponse = await fetch(url, requestOptions);
        if (!quantityUpdateResponse.ok) {
            throw new Error('Something went wrong!');
        }
        setQuantity(quantity + 1);
        setRemaining(remaining + 1);
    }

    async function decreaseQuantity() {
        const url = `https://fithon.herokuapp.com/api/admin/secure/decrease/book/quantity/?bookId=${props.book?.id}`;
        const requestOptions = {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json'
            }
        };

        const quantityUpdateResponse = await fetch(url, requestOptions);
        if (!quantityUpdateResponse.ok) {
            throw new Error('Something went wrong!');
        }
        setQuantity(quantity - 1);
        setRemaining(remaining - 1);
    }

    async function deleteBook() {
        const url = `https://fithon.herokuapp.com/api/admin/secure/delete/book/?bookId=${props.book?.id}`;
        const requestOptions = {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json'
            }
        };

        const updateResponse = await fetch(url, requestOptions);
        if (!updateResponse.ok) {
            throw new Error('Something went wrong!');
        }
        props.deleteBook();
    }

    return (
        <div className='card mt-3 shadow p-3 mb-3 bg-body rounded'>
            <div className='row g-0'>
                <div className='col-md-2'>
                    <div className='d-none d-lg-block'>
                        {props.book.img ?
                            <img src={props.book.img} width='123' height='196' alt='Book' />
                            :
                            <img src="*" width='123' height='196' alt='Book' />
                        }
                    </div>
                    <div className='d-lg-none d-flex justify-content-center align-items-center'>
                        {props.book.img ?
                            <img src={props.book.img} width='123' height='196' alt='Book' />
                            :
                            <img src="*" width='123' height='196' alt='Book' />
                        }
                    </div>
                </div>
                <div className='col-md-6'>
                    <div className='card-body'>
                        <h5 className='card-title'>
                            {props.book.author}
                        </h5>
                        <h4>{props.book.title}</h4>
                        <p className='card-text'>{props.book.description}</p>
                    </div>
                </div>
                <div className='mt-3 col-md-4'>
                    <div className='d-flex justify-content-center align-items-center'>
                        <p>総冊数: <b>{quantity}</b></p>
                    </div>
                    <div className='d-flex justify-content-center align-items-center'>
                        <p>残り冊数: <b>{remaining}</b></p>
                    </div>
                </div>
                <div className='mt-3 col-md-1'>
                    <div className='d-flex justify-content-start'>
                        <button onClick={deleteBook} className='m-1 btn btn-md btn-danger'>削除</button>
                    </div>
                </div>
                <button onClick={increaseQuantity} className='m1 btn btn-md main-color text-white'>冊数追加</button>
                <button onClick={decreaseQuantity} className='m1 btn btn-md btn-warning'>冊数を減らす</button>
            </div>
        </div>
    );
}
import { useOktaAuth } from "@okta/okta-react";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import { AddNewBook } from "./components/AddNewBook";
import { EditBooks } from "./components/EditBooks";

export const ManageLibraryPage = () => {

    const { authState } = useOktaAuth();

    const [changeQuantityOfBooksClick, setChangeQuantityOfBooksClick] = useState(false);

    function addBookClickFunction() {
        setChangeQuantityOfBooksClick(false);
    }

    function changeQuantityOfBooksClickFunction() {
        setChangeQuantityOfBooksClick(true);
    }

    if (authState?.accessToken?.claims.userType === undefined) {
        return <Redirect to='/home'/>
    }

    return (
        <div className='container'>
            <div className='mt-5'>
                <h3>サイト管理</h3>
                <nav>
                    <div className='nav nav-tabs' id='nav-tab' role='tablist'>
                        <button onClick={addBookClickFunction} className='nav-link active' id='nav-add-book-tab' data-bs-toggle='tab'
                            data-bs-target='#nav-add-book' type='button' role='tab' aria-controls='nav-add-book'>
                            新しい本の登録
                        </button>
                        <button onClick={changeQuantityOfBooksClickFunction} className='nav-link' id='nav-quantity-tab' data-bs-toggle='tab'
                            data-bs-target='#nav-quantity' type='button' role='tab' aria-controls='nav-quantity'>
                            本の変更
                        </button>
                    </div>
                </nav>
                <div className='tab-content' id='nav-tabContent'>
                    <div className='tab-pane fade show active' id='nav-add-book' 
                            role='tabpanel' aria-labelledby='nav-add-book-tab'>
                            <AddNewBook/>
                    </div>
                    <div className='tab-pane fade' id='nav-quantity' 
                            role='tabpanel' aria-labelledby='nav-quantity-tab'>
                            {changeQuantityOfBooksClick ? <EditBooks/> : <></>}
                    </div>
                </div>
            </div>
        </div>

    );
}
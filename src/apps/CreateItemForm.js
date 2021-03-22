import React from 'react';
import {useForm} from "react-hook-form";
import { createItemRq } from '../services/httpService'

const CreateItemForm = () => {

    const { register, control, handleSubmit, errors } = useForm();

    const handleCreateItem = async (data) => {

        const created = await createItemRq(data)

    }


    return (
        <div className="create-item-form">

            <form style={{display: 'grid', width:'auto', padding: '.3em'}} onSubmit={handleSubmit(handleCreateItem)}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        name="title"
                        placeholder="Item title"
                        size=''
                        style={{width: '100%'}}
                        type="title"
                        ref={register({required: true})}

                    />
                    {errors.title && errors.title.type === 'required' && (
                        <p className="alert alert-danger">Title is required!</p>
                    )}
                </div>
                <div>
                    <label htmlFor="comment">Comment</label>
                    <textarea
                        name="comment"
                        rows="5"
                        cols="auto"
                        style={{width: '100%'}}
                        placeholder="comment"
                        defaultValue="Example comment!!"
                        ref={register({ required: true })}
                    />
                    {errors.comment && errors.comment.type === 'required' && (
                        <p className="alert alert-danger">Comment is required!</p>
                    )}
                </div>

                <div className="form-actions">
                    <input
                        type="submit"
                        value="Save Item"
                    />
                </div>


            </form>
            
        </div>
    );
};

export default CreateItemForm;
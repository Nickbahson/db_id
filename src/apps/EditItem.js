import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';

const EditItem = ({item, view, handleUpdated}) => {
    const { register, control, handleSubmit, errors } = useForm();

    if (!view) return null

    const handleUpdate = (data) => {

        return handleUpdated(data)


    };

    return (
        <div>
            <h3>Editing : {item.title} !</h3>
            <h1> THE EDIT FORM BELOW!!!</h1>

            <form style={{display: 'grid', width:'auto', padding: '.3em'}} onSubmit={handleSubmit(handleUpdate)}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        name="title"
                        placeholder="Item title"
                        size=''
                        style={{width: '100%'}}
                        type="title"
                        defaultValue={item.title}
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
                        defaultValue={item.comment}
                        ref={register({ required: true })}
                    />
                    {errors.comment && errors.comment.type === 'required' && (
                        <p className="alert alert-danger">Comment is required!</p>
                    )}
                </div>

                <div className="form-actions">
                    <input
                        type="submit"
                        value="Save update"
                    />

                    <button type="button" onClick={() => handleUpdate('cancel_update')} >
                        Cancel Update
                    </button>
                </div>


            </form>

        </div>
    );
};

export default EditItem;